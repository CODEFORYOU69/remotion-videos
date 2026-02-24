import {
  AbsoluteFill,
  Audio,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { POVReelProps } from "../config/types";
import { BRAND, FONT_FAMILY } from "../config/brand";
import { BG_MUSIC } from "../config/assets";
import { FlashTransition } from "../components/FlashTransition";
import { LogoBadge } from "../components/LogoBadge";
import { LogoWatermark } from "../components/LogoWatermark";
import { GoogleLink } from "../components/GoogleLink";
import { LogoOutro } from "../components/LogoOutro";

// 405 frames / 13.5s @ 30fps (12s content + 1.5s logo outro)
export const POV_DURATION = 405;

export const POVReel: React.FC<POVReelProps> = ({
  povText,
  clips,
  audioClip,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Timeline ──
  const POV_END = Math.round(2.5 * fps); // 75
  const CLIPS_START = POV_END;
  const CLIPS_END = Math.round(10.5 * fps); // 315
  const OUTRO_START = CLIPS_END;
  const LOGO_START = Math.round(12 * fps); // 360

  // ── POV text typewriter (0-2.5s) ──
  const charsPerFrame = 0.6;
  const typewriterChars = Math.floor(Math.max(0, frame - 15) * charsPerFrame);
  const visiblePovText = povText.slice(0, typewriterChars);
  const cursorBlink = Math.floor(frame / 9) % 2 === 0;

  const povOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Fast-cut clips (2.5-10.5s) ──
  const clipsDuration = CLIPS_END - CLIPS_START;
  const framesPerClip = Math.floor(clipsDuration / clips.length);
  const currentClipIndex =
    frame >= CLIPS_START && frame < CLIPS_END
      ? Math.min(Math.floor((frame - CLIPS_START) / framesPerClip), clips.length - 1)
      : -1;

  // Flash between clips
  const flashFrames = clips.map((_, i) => CLIPS_START + i * framesPerClip).slice(1);

  // Ken Burns per clip
  const clipLocalFrame = frame >= CLIPS_START ? (frame - CLIPS_START) % framesPerClip : 0;
  const zoomIn = currentClipIndex % 2 === 0;
  const clipScale = zoomIn
    ? interpolate(clipLocalFrame, [0, framesPerClip], [1.0, 1.15], { extrapolateRight: "clamp" })
    : interpolate(clipLocalFrame, [0, framesPerClip], [1.15, 1.0], { extrapolateRight: "clamp" });

  // ── Outro fade ──
  const outroFade = interpolate(frame, [durationInFrames - 10, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      {/* Phase 1: POV text on dark screen (0-2.5s) */}
      {frame < POV_END + 5 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 80px",
            opacity: interpolate(
              frame,
              [POV_END - 5, POV_END + 5],
              [1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 80,
                fontWeight: 900,
                color: BRAND.gold,
                opacity: povOpacity,
                marginBottom: 20,
                textShadow: `0 0 30px ${BRAND.gold}60`,
              }}
            >
              POV:
            </div>
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 48,
                fontWeight: 600,
                color: BRAND.textLight,
                lineHeight: 1.4,
              }}
            >
              {visiblePovText}
              <span style={{ color: BRAND.gold, opacity: cursorBlink ? 1 : 0 }}>|</span>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Phase 2: Fast-cut clips full-screen (2.5-10.5s) */}
      {currentClipIndex >= 0 && (
        <>
          <AbsoluteFill
            style={{
              transform: `scale(${clipScale})`,
              transformOrigin: "center center",
            }}
          >
            <OffthreadVideo
              src={staticFile(`videokech/${clips[currentClipIndex]}`)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              muted
            />
          </AbsoluteFill>
          <AbsoluteFill
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
            }}
          />
        </>
      )}

      {/* Flash transitions between clips */}
      {flashFrames.map((f, i) => (
        <FlashTransition key={i} startFrame={f} color="white" />
      ))}
      <FlashTransition startFrame={POV_END} color="gold" />

      {/* Phase 3: Outro — logo + google link (10.5-12s) */}
      {frame >= OUTRO_START && (
        <AbsoluteFill style={{ opacity: outroFade }}>
          <LogoWatermark size={400} opacity={0.25} />
          <GoogleLink delay={OUTRO_START + 5} />
        </AbsoluteFill>
      )}

      <FlashTransition startFrame={OUTRO_START} color="gold" />
      <LogoBadge position="top-right" size={80} delay={CLIPS_START} />

      {/* Logo outro */}
      <LogoOutro startFrame={LOGO_START} />

      {audioClip && <Audio src={staticFile(`audio/${audioClip}`)} />}
      <Audio src={staticFile(`audio/${BG_MUSIC}`)} volume={0.3} />
    </AbsoluteFill>
  );
};
