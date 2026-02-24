import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, FONT_FAMILY, SPRINGS } from "../config/brand";

type TextStyle = "impact" | "neon" | "typewriter";

export const CatchyText: React.FC<{
  text: string;
  style?: TextStyle;
  fontSize?: number;
  delay?: number;
}> = ({ text, style = "impact", fontSize = 80, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const delayedFrame = Math.max(0, frame - delay);

  if (style === "impact") {
    return <ImpactText text={text} fontSize={fontSize} frame={delayedFrame} fps={fps} />;
  }
  if (style === "neon") {
    return <NeonText text={text} fontSize={fontSize} frame={delayedFrame} fps={fps} />;
  }
  return <TypewriterText text={text} fontSize={fontSize} frame={delayedFrame} fps={fps} />;
};

// ── Impact: bold 900, word-by-word spring slam ──
const ImpactText: React.FC<{
  text: string;
  fontSize: number;
  frame: number;
  fps: number;
}> = ({ text, fontSize, frame, fps }) => {
  const words = text.split(" ");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 16,
        padding: "0 40px",
      }}
    >
      {words.map((word, i) => {
        const wordDelay = i * 4;
        const s = spring({
          frame: frame - wordDelay,
          fps,
          config: SPRINGS.slam,
          durationInFrames: Math.round(0.8 * fps),
        });

        const scale = interpolate(s, [0, 1], [3, 1]);
        const opacity = s;

        return (
          <span
            key={i}
            style={{
              fontFamily: FONT_FAMILY,
              fontSize,
              fontWeight: 900,
              color: BRAND.textLight,
              textTransform: "uppercase",
              WebkitTextStroke: `2px ${BRAND.gold}`,
              transform: `scale(${scale})`,
              opacity,
              display: "inline-block",
              textAlign: "center",
              lineHeight: 1.1,
              textShadow: `0 4px 20px rgba(0,0,0,0.8)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// ── Neon: gold glow with flicker effect ──
const NeonText: React.FC<{
  text: string;
  fontSize: number;
  frame: number;
  fps: number;
}> = ({ text, fontSize, frame, fps }) => {
  const entrance = spring({
    frame,
    fps,
    config: SPRINGS.smooth,
    durationInFrames: Math.round(0.6 * fps),
  });

  // Flicker: subtle random-like opacity variation using sine
  const flicker = frame > 5
    ? 0.85 + Math.sin(frame * 1.7) * 0.1 + Math.sin(frame * 3.1) * 0.05
    : entrance;

  const glowIntensity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize,
        fontWeight: 800,
        color: BRAND.gold,
        textTransform: "uppercase",
        textAlign: "center",
        opacity: entrance * flicker,
        textShadow: `
          0 0 ${10 * glowIntensity}px ${BRAND.gold},
          0 0 ${20 * glowIntensity}px ${BRAND.gold},
          0 0 ${40 * glowIntensity}px ${BRAND.gold}80,
          0 0 ${80 * glowIntensity}px ${BRAND.gold}40
        `,
        padding: "0 40px",
        lineHeight: 1.2,
      }}
    >
      {text}
    </div>
  );
};

// ── Typewriter: character-by-character reveal ──
const TypewriterText: React.FC<{
  text: string;
  fontSize: number;
  frame: number;
  fps: number;
}> = ({ text, fontSize, frame, fps }) => {
  const charsPerFrame = 0.8;
  const visibleChars = Math.floor(frame * charsPerFrame);
  const displayText = text.slice(0, visibleChars);

  // Blinking cursor
  const cursorVisible = Math.floor(frame / (fps * 0.3)) % 2 === 0;

  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize,
        fontWeight: 600,
        color: BRAND.textLight,
        textAlign: "center",
        padding: "0 60px",
        lineHeight: 1.3,
      }}
    >
      {displayText}
      <span
        style={{
          color: BRAND.gold,
          opacity: cursorVisible && visibleChars < text.length ? 1 : 0,
        }}
      >
        |
      </span>
    </div>
  );
};
