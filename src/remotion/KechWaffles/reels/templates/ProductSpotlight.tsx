import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ProductSpotlightProps } from "../config/types";
import { BRAND, FONT_FAMILY, SPRINGS } from "../config/brand";
import { BG_MUSIC } from "../config/assets";
import { CatchyText } from "../components/CatchyText";
import { FlashTransition } from "../components/FlashTransition";
import { LogoBadge } from "../components/LogoBadge";
import { LogoWatermark } from "../components/LogoWatermark";
import { GoogleLink } from "../components/GoogleLink";
import { GoldAccent } from "../components/GoldAccent";
import { LogoOutro } from "../components/LogoOutro";

// 495 frames / 16.5s @ 30fps (15s content + 1.5s logo outro)
export const SPOTLIGHT_DURATION = 495;

export const ProductSpotlight: React.FC<ProductSpotlightProps> = ({
  clips,
  catchyText,
  audioClip,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Timeline (frames @ 30fps) ──
  const FLASH_1 = Math.round(1.5 * fps); // 45 — first flash
  const CUT_2 = Math.round(5 * fps); // 150 — second cut
  const CUT_3 = Math.round(9 * fps); // 270 — third cut
  const CTA_START = Math.round(11 * fps); // 330
  const FADE_START = Math.round(13.5 * fps); // 405
  const LOGO_START = Math.round(15 * fps); // 450

  // Determine which clip to show based on timeline
  const getClipIndex = () => {
    if (frame < FLASH_1) return 0;
    if (frame < CUT_2) return Math.min(1, clips.length - 1);
    if (frame < CUT_3) return Math.min(2, clips.length - 1);
    return Math.min(0, clips.length - 1); // loop back
  };
  const clipIndex = getClipIndex();

  // ── Catchy text (0-1.5s) ──
  const textFadeOut = interpolate(
    frame,
    [FLASH_1 - 8, FLASH_1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Ken Burns zoom per segment ──
  const segmentStarts = [0, FLASH_1, CUT_2, CUT_3];
  const segmentEnds = [FLASH_1, CUT_2, CUT_3, durationInFrames];
  const segIdx = frame < FLASH_1 ? 0 : frame < CUT_2 ? 1 : frame < CUT_3 ? 2 : 3;
  const localProgress = interpolate(
    frame,
    [segmentStarts[segIdx], segmentEnds[segIdx]],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const zoomIn = segIdx % 2 === 0;
  const scale = zoomIn
    ? interpolate(localProgress, [0, 1], [1.0, 1.15])
    : interpolate(localProgress, [0, 1], [1.15, 1.0]);

  // ── CTA text entrance ──
  const ctaSpring = spring({
    frame: frame - CTA_START,
    fps,
    config: SPRINGS.snappy,
    durationInFrames: Math.round(0.8 * fps),
  });

  // ── Global fade out ──
  const fadeOut = interpolate(frame, [FADE_START, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark, opacity: fadeOut }}>
      {/* Video clip — full screen */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <OffthreadVideo
          src={staticFile(`videokech/${clips[clipIndex]}`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          muted
        />
      </AbsoluteFill>

      {/* Dark overlay for text readability */}
      <AbsoluteFill style={{ backgroundColor: BRAND.dark, opacity: 0.35 }} />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <LogoWatermark />

      {/* Phase 1: Catchy text slams in (0-1.5s) */}
      {frame < FLASH_1 + 5 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: textFadeOut,
          }}
        >
          <CatchyText text={catchyText} style="impact" fontSize={72} />
        </AbsoluteFill>
      )}

      {/* Flashes between cuts */}
      <FlashTransition startFrame={FLASH_1} color="white" />
      <FlashTransition startFrame={CUT_2} color="gold" />
      <FlashTransition startFrame={CUT_3} color="white" />

      {/* Phase 4: CTA + Google link (11-13.5s) */}
      {frame >= CTA_START && (
        <div style={{ opacity: ctaSpring }}>
          <div
            style={{
              position: "absolute",
              bottom: 220,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 44,
                fontWeight: 700,
                color: BRAND.gold,
                textShadow: `0 0 20px ${BRAND.gold}60, 0 4px 15px rgba(0,0,0,0.6)`,
              }}
            >
              Viens goûter!
            </span>
          </div>
          <GoogleLink delay={CTA_START + 10} />
        </div>
      )}

      <GoldAccent delay={5} />
      <LogoBadge position="top-right" delay={10} />

      {/* Logo outro */}
      <LogoOutro startFrame={LOGO_START} />

      {/* Audio: movie quote + background music */}
      {audioClip && <Audio src={staticFile(`audio/${audioClip}`)} />}
      <Audio src={staticFile(`audio/${BG_MUSIC}`)} volume={0.3} />
    </AbsoluteFill>
  );
};
