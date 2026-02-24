import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { DailySpecialProps } from "../config/types";
import { BRAND } from "../config/brand";
import { BG_MUSIC } from "../config/assets";
import { CatchyText } from "../components/CatchyText";
import { FlashTransition } from "../components/FlashTransition";
import { LogoBadge } from "../components/LogoBadge";
import { LogoWatermark } from "../components/LogoWatermark";
import { GoogleLink } from "../components/GoogleLink";
import { GoldAccent } from "../components/GoldAccent";
import { LogoOutro } from "../components/LogoOutro";

// 495 frames / 16.5s @ 30fps (15s content + 1.5s logo outro)
export const DAILY_SPECIAL_DURATION = 495;

export const DailySpecial: React.FC<DailySpecialProps> = ({
  clips,
  specialText,
  ctaText,
  audioClip,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Timeline ──
  const FLASH_FRAME = Math.round(2 * fps); // 60
  const CUT_2 = Math.round(6 * fps); // 180
  const CUT_3 = Math.round(10 * fps); // 300
  const CTA_START = Math.round(11.3 * fps); // 339
  const SCALE_START = Math.round(14 * fps); // 420
  const LOGO_START = Math.round(15 * fps); // 450

  // ── Current clip ──
  const getClipIndex = () => {
    if (frame < FLASH_FRAME) return 0;
    if (frame < CUT_2) return Math.min(1, clips.length - 1);
    if (frame < CUT_3) return Math.min(2, clips.length - 1);
    return 0;
  };
  const clipIndex = getClipIndex();

  // ── Ken Burns ──
  const segStarts = [0, FLASH_FRAME, CUT_2, CUT_3];
  const segEnds = [FLASH_FRAME, CUT_2, CUT_3, durationInFrames];
  const segIdx = frame < FLASH_FRAME ? 0 : frame < CUT_2 ? 1 : frame < CUT_3 ? 2 : 3;
  const segProgress = interpolate(frame, [segStarts[segIdx], segEnds[segIdx]], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = segIdx % 2 === 0
    ? interpolate(segProgress, [0, 1], [1.0, 1.12])
    : interpolate(segProgress, [0, 1], [1.12, 1.0]);

  // ── Neon pulsing ring (0-2s) ──
  const ringPulse = 0.8 + Math.sin(frame * 0.3) * 0.2;
  const ringOpacity = interpolate(frame, [0, 10, FLASH_FRAME - 5, FLASH_FRAME], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Exit ──
  const exitScale = interpolate(frame, [SCALE_START, durationInFrames], [1, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [SCALE_START, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.dark,
        transform: `scale(${exitScale})`,
        opacity: exitOpacity,
      }}
    >
      {/* Video clip full-screen */}
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

      <AbsoluteFill style={{ backgroundColor: BRAND.dark, opacity: 0.4 }} />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      <LogoWatermark />

      {/* Phase 1: Neon title + ring (0-2s) */}
      {frame < FLASH_FRAME + 10 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              border: `4px solid ${BRAND.gold}`,
              opacity: ringOpacity,
              transform: `scale(${ringPulse})`,
              boxShadow: `0 0 40px ${BRAND.gold}40, inset 0 0 40px ${BRAND.gold}20`,
            }}
          />
          <CatchyText text={specialText} style="neon" fontSize={80} />
        </AbsoluteFill>
      )}

      {/* Flashes */}
      <FlashTransition startFrame={FLASH_FRAME} color="gold" />
      <FlashTransition startFrame={CUT_2} color="white" />
      <FlashTransition startFrame={CUT_3} color="gold" />

      {/* Phase 4: CTA + Google link (11.3-14s) */}
      {frame >= CTA_START && (
        <>
          <div
            style={{
              position: "absolute",
              bottom: 220,
              left: 0,
              right: 0,
              textAlign: "center",
            }}
          >
            <CatchyText text={ctaText} style="neon" fontSize={48} delay={CTA_START} />
          </div>
          <GoogleLink delay={CTA_START + 10} />
        </>
      )}

      <GoldAccent delay={5} />
      <LogoBadge position="top-right" delay={10} />

      {/* Logo outro */}
      <LogoOutro startFrame={LOGO_START} />

      {audioClip && <Audio src={staticFile(`audio/${audioClip}`)} />}
      <Audio src={staticFile(`audio/${BG_MUSIC}`)} volume={0.3} />
    </AbsoluteFill>
  );
};
