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
import type { TopProductsProps } from "../config/types";
import { BRAND, FONT_FAMILY, SPRINGS } from "../config/brand";
import { BG_MUSIC } from "../config/assets";
import { CatchyText } from "../components/CatchyText";
import { FlashTransition } from "../components/FlashTransition";
import { CountdownNumber } from "../components/CountdownNumber";
import { LogoBadge } from "../components/LogoBadge";
import { GoogleLink } from "../components/GoogleLink";
import { GoldAccent } from "../components/GoldAccent";
import { LogoOutro } from "../components/LogoOutro";

// 795 frames / 26.5s @ 30fps (25s content + 1.5s logo outro)
export const TOP_PRODUCTS_DURATION = 795;

export const TopProducts: React.FC<TopProductsProps> = ({
  clips,
  title,
  labels,
  audioClip,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Timeline ──
  const TITLE_END = Math.round(2 * fps); // 60
  const P3_START = TITLE_END;
  const P3_END = Math.round(10 * fps); // 300
  const P2_START = P3_END;
  const P2_END = Math.round(18 * fps); // 540
  const P1_START = P2_END;
  const P1_END = Math.round(24 * fps); // 720
  const OUTRO_START = P1_END;
  const LOGO_START = Math.round(25 * fps); // 750

  // ── Title entrance (0-2s) ──
  const titleFade = interpolate(frame, [TITLE_END - 5, TITLE_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Phases: 3 countdown sections ──
  const phases = [
    { start: P3_START, end: P3_END, number: 3, clip: clips[0], label: labels[0] },
    { start: P2_START, end: P2_END, number: 2, clip: clips[Math.min(1, clips.length - 1)], label: labels[Math.min(1, labels.length - 1)] },
    { start: P1_START, end: P1_END, number: 1, clip: clips[Math.min(2, clips.length - 1)], label: labels[Math.min(2, labels.length - 1)] },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.dark }}>
      {/* Phase 0: Title slam (0-2s) */}
      {frame < TITLE_END + 5 && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center", opacity: titleFade }}
        >
          <CatchyText text={title} style="impact" fontSize={90} />
        </AbsoluteFill>
      )}

      {/* 3 countdown phases — each with full-screen video + number + label */}
      {phases.map((phase, phaseIndex) => {
        if (frame < phase.start || frame >= phase.end + 5) return null;

        const localFrame = frame - phase.start;
        const phaseDuration = phase.end - phase.start;

        // Ken Burns zoom
        const bgScale = interpolate(localFrame, [0, phaseDuration], [1, 1.12], {
          extrapolateRight: "clamp",
        });

        // Label entrance
        const labelSpring = spring({
          frame: localFrame - 20,
          fps,
          config: SPRINGS.snappy,
          durationInFrames: Math.round(0.8 * fps),
        });

        // Phase exit
        const phaseExit = interpolate(
          localFrame,
          [phaseDuration - 8, phaseDuration],
          [1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        const isWinner = phase.number === 1;

        return (
          <AbsoluteFill key={phaseIndex} style={{ opacity: phaseExit }}>
            {/* Full-screen video */}
            <AbsoluteFill
              style={{
                transform: `scale(${bgScale})`,
                transformOrigin: "center center",
              }}
            >
              <OffthreadVideo
                src={staticFile(`videokech/${phase.clip}`)}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                muted
              />
            </AbsoluteFill>

            <AbsoluteFill style={{ backgroundColor: BRAND.dark, opacity: 0.45 }} />
            <AbsoluteFill
              style={{
                background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
              }}
            />

            {/* Countdown number */}
            <div style={{ position: "absolute", top: 350, left: 0, right: 0 }}>
              <CountdownNumber number={phase.number} delay={phase.start + 5} />
            </div>

            {/* Label text */}
            <div
              style={{
                position: "absolute",
                top: 850,
                left: 0,
                right: 0,
                textAlign: "center",
                opacity: labelSpring,
                transform: `translateY(${interpolate(labelSpring, [0, 1], [40, 0])}px)`,
              }}
            >
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 72,
                  fontWeight: 800,
                  color: BRAND.textLight,
                  textTransform: "uppercase",
                  textShadow: `0 4px 20px rgba(0,0,0,0.7)`,
                }}
              >
                {phase.label}
              </span>

              {isWinner && (
                <div style={{ marginTop: 30 }}>
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 48,
                      fontWeight: 900,
                      color: BRAND.gold,
                      textShadow: `0 0 20px ${BRAND.gold}80`,
                    }}
                  >
                    LA MEILLEURE!
                  </span>
                </div>
              )}
            </div>

            {/* Flash at start */}
            <FlashTransition startFrame={phase.start} color={isWinner ? "gold" : "white"} />
          </AbsoluteFill>
        );
      })}

      {/* Outro (24-25s) */}
      {frame >= OUTRO_START && (
        <AbsoluteFill>
          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center", paddingBottom: 200 }}
          >
            <CatchyText text="Tu préfères laquelle?" style="neon" fontSize={52} delay={OUTRO_START} />
          </AbsoluteFill>
          <GoogleLink delay={OUTRO_START + 8} />
        </AbsoluteFill>
      )}

      <GoldAccent />
      <LogoBadge position="top-right" delay={10} />

      {/* Logo outro */}
      <LogoOutro startFrame={LOGO_START} />

      {audioClip && <Audio src={staticFile(`audio/${audioClip}`)} />}
      <Audio src={staticFile(`audio/${BG_MUSIC}`)} volume={0.3} />
    </AbsoluteFill>
  );
};
