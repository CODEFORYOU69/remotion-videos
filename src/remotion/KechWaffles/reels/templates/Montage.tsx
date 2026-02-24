import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  OffthreadVideo,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { MontageProps } from "../config/types";
import { BRAND, FONT_FAMILY, LOGO_PATH, SPRINGS } from "../config/brand";
import { BG_MUSIC } from "../config/assets";
import { FlashTransition } from "../components/FlashTransition";
import { LogoWatermark } from "../components/LogoWatermark";
import { GoogleLink } from "../components/GoogleLink";
import { GoldAccent } from "../components/GoldAccent";
import { LogoOutro } from "../components/LogoOutro";

// 645 frames / 21.5s @ 30fps (20s content + 1.5s logo outro)
export const MONTAGE_DURATION = 645;

export const Montage: React.FC<MontageProps> = ({
  clips,
  textOverlays,
  audioClip,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Timeline ──
  const INTRO_END = Math.round(1 * fps); // 30
  const CLIPS_START = INTRO_END;
  const CLIPS_END = Math.round(19 * fps); // 570
  const OUTRO_START = CLIPS_END;
  const LOGO_START = Math.round(20 * fps); // 600

  // ── Intro: Logo flash (0-1s) ──
  const introLogoScale = spring({
    frame,
    fps,
    config: SPRINGS.slam,
    durationInFrames: Math.round(0.6 * fps),
  });
  const introFade = interpolate(frame, [INTRO_END - 8, INTRO_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Clips section (1-19s) ──
  const clipsDuration = CLIPS_END - CLIPS_START;
  const framesPerClip = Math.floor(clipsDuration / clips.length);

  const currentClipIndex =
    frame >= CLIPS_START && frame < CLIPS_END
      ? Math.min(Math.floor((frame - CLIPS_START) / framesPerClip), clips.length - 1)
      : -1;

  const clipLocalFrame = frame >= CLIPS_START ? (frame - CLIPS_START) % framesPerClip : 0;

  // Alternating zoom in/out
  const zoomIn = currentClipIndex % 2 === 0;
  const clipScale = zoomIn
    ? interpolate(clipLocalFrame, [0, framesPerClip], [1.0, 1.15], { extrapolateRight: "clamp" })
    : interpolate(clipLocalFrame, [0, framesPerClip], [1.15, 1.0], { extrapolateRight: "clamp" });

  // Text overlay
  const currentOverlay =
    currentClipIndex >= 0 && currentClipIndex < textOverlays.length
      ? textOverlays[currentClipIndex]
      : "";

  const textSpring = spring({
    frame: clipLocalFrame,
    fps,
    config: SPRINGS.slam,
    durationInFrames: Math.round(0.5 * fps),
  });

  // Flash frames between clips
  const flashFrames = clips.map((_, i) => CLIPS_START + i * framesPerClip).slice(1);

  // ── Outro (19-20s) ──
  const outroSpring = spring({
    frame: frame - OUTRO_START,
    fps,
    config: SPRINGS.smooth,
    durationInFrames: Math.round(0.6 * fps),
  });
  const outroFade = interpolate(frame, [durationInFrames - 8, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      {/* Phase 1: Logo flash intro (0-1s) */}
      {frame < INTRO_END + 5 && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center", opacity: introFade }}
        >
          <Img
            src={staticFile(LOGO_PATH)}
            style={{
              width: 400,
              height: 400,
              objectFit: "contain",
              transform: `scale(${interpolate(introLogoScale, [0, 1], [3, 1])})`,
              opacity: introLogoScale,
            }}
          />
        </AbsoluteFill>
      )}

      <FlashTransition startFrame={INTRO_END - 2} color="gold" />

      {/* Phase 2: Dynamic clips (1-19s) */}
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

          <AbsoluteFill style={{ backgroundColor: BRAND.dark, opacity: 0.35 }} />
          <AbsoluteFill
            style={{
              background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
            }}
          />

          {/* Text overlay */}
          {currentOverlay && (
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 100,
                  fontWeight: 900,
                  color: BRAND.textLight,
                  textTransform: "uppercase",
                  WebkitTextStroke: `2px ${BRAND.gold}`,
                  transform: `scale(${interpolate(textSpring, [0, 1], [3, 1])})`,
                  opacity: textSpring,
                  textShadow: "0 4px 30px rgba(0,0,0,0.8)",
                  textAlign: "center",
                  padding: "0 60px",
                }}
              >
                {currentOverlay}
              </span>
            </AbsoluteFill>
          )}
        </>
      )}

      {/* Flash transitions between clips */}
      {flashFrames.map((f, i) => (
        <FlashTransition key={i} startFrame={f} color="white" />
      ))}

      {/* Phase 3: Logo + Google link outro (19-20s) */}
      {frame >= OUTRO_START && (
        <AbsoluteFill style={{ opacity: outroFade }}>
          <LogoWatermark size={300} opacity={0.2 * outroSpring} />
          <GoogleLink delay={OUTRO_START + 5} />
        </AbsoluteFill>
      )}

      <GoldAccent delay={CLIPS_START} />

      {/* Logo outro */}
      <LogoOutro startFrame={LOGO_START} />

      {audioClip && <Audio src={staticFile(`audio/${audioClip}`)} />}
      <Audio src={staticFile(`audio/${BG_MUSIC}`)} volume={0.3} />
    </AbsoluteFill>
  );
};
