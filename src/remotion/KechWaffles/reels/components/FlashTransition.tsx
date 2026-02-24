import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { BRAND } from "../config/brand";

export const FlashTransition: React.FC<{
  startFrame: number;
  color?: "white" | "gold";
}> = ({ startFrame, color = "white" }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > 4) return null;

  const opacity = interpolate(localFrame, [0, 1, 2, 3, 4], [0, 1, 1, 0.3, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgColor = color === "gold" ? BRAND.gold : BRAND.white;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
