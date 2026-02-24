import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, LOGO_PATH, SPRINGS } from "../config/brand";

/**
 * Full-screen logo outro — big centered logo with spring entrance + fade out.
 * Renders only when frame >= startFrame.
 * Duration: ~1.5s (45 frames @ 30fps)
 */
export const LogoOutro: React.FC<{
  startFrame: number;
}> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  if (frame < startFrame) return null;

  const localFrame = frame - startFrame;

  // Logo scales in with spring
  const logoSpring = spring({
    frame: localFrame,
    fps,
    config: SPRINGS.bouncy,
    durationInFrames: Math.round(0.8 * fps),
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.3, 1]);

  // Fade out at the very end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BRAND.dark,
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Gold glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.gold}15 0%, transparent 70%)`,
          opacity: logoSpring,
        }}
      />
      <Img
        src={staticFile(LOGO_PATH)}
        style={{
          width: 700,
          height: 700,
          objectFit: "contain",
          transform: `scale(${logoScale})`,
          opacity: logoSpring,
        }}
      />
    </AbsoluteFill>
  );
};
