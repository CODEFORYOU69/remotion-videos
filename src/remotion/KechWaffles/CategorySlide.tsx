import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

const GOLD = "#F8B50D";
const BG_DARK = "#171D14";
const TEXT_LIGHT = "#FAFAF2";

export const CategorySlide: React.FC<{
  title: string;
  subtitle?: string;
}> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Entrance ──
  const lineWidth = interpolate(frame, [0, Math.round(0.8 * fps)], [0, 400], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const titleEntrance = spring({
    frame: frame - Math.round(0.2 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(1 * fps),
  });

  const subtitleEntrance = spring({
    frame: frame - Math.round(0.6 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });

  // ── Exit ──
  const exitStart = durationInFrames - Math.round(0.6 * fps);
  const globalOpacity = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titleY = interpolate(titleEntrance, [0, 1], [50, 0]);
  const subtitleY = interpolate(subtitleEntrance, [0, 1], [30, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        fontFamily,
        justifyContent: "center",
        alignItems: "center",
        opacity: globalOpacity,
      }}
    >
      {/* Decorative gold circle */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: `2px solid ${GOLD}`,
          opacity: interpolate(frame, [0, Math.round(1 * fps)], [0, 0.15], {
            extrapolateRight: "clamp",
          }),
          transform: `scale(${interpolate(frame, [0, Math.round(1.5 * fps)], [0.5, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })})`,
        }}
      />

      {/* Top gold line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          backgroundColor: GOLD,
          marginBottom: 30,
        }}
      />

      {/* Title */}
      <div
        style={{
          opacity: titleEntrance,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: TEXT_LIGHT,
            margin: 0,
            textAlign: "center",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {title}
        </h1>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <div
          style={{
            opacity: subtitleEntrance,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 15,
          }}
        >
          <p
            style={{
              fontSize: 30,
              fontWeight: 300,
              color: GOLD,
              margin: 0,
              textAlign: "center",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </p>
        </div>
      )}

      {/* Bottom gold line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          backgroundColor: GOLD,
          marginTop: 30,
        }}
      />

      {/* Logo watermark center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(subtitleEntrance, [0, 1], [0, 0.08]),
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("kech-waffles/Transparent Gold White.png")}
          style={{ height: 800, objectFit: "contain" }}
        />
      </div>
    </AbsoluteFill>
  );
};
