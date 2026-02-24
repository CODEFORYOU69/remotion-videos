import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { LOGO_PATH, SPRINGS } from "../config/brand";

export const LogoBadge: React.FC<{
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  delay?: number;
}> = ({ position = "top-right", size = 120, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.bouncy,
    durationInFrames: Math.round(0.8 * fps),
  });

  const positionStyle: React.CSSProperties = {
    position: "absolute",
    ...(position.includes("top") ? { top: 40 } : { bottom: 40 }),
    ...(position.includes("left") ? { left: 40 } : { right: 40 }),
  };

  return (
    <div
      style={{
        ...positionStyle,
        transform: `scale(${entrance})`,
        opacity: entrance,
        pointerEvents: "none",
      }}
    >
      <Img
        src={staticFile(LOGO_PATH)}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
        }}
      />
    </div>
  );
};
