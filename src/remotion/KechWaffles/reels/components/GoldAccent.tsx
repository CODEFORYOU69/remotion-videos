import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND, SPRINGS } from "../config/brand";

export const GoldAccent: React.FC<{
  delay?: number;
}> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.smooth,
    durationInFrames: Math.round(0.8 * fps),
  });

  const width = interpolate(entrance, [0, 1], [0, 100]);

  const lineStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, transparent, ${BRAND.gold}, transparent)`,
    opacity: entrance,
    width: `${width}%`,
    margin: "0 auto",
  };

  return (
    <>
      <div style={{ ...lineStyle, top: 0 }} />
      <div style={{ ...lineStyle, bottom: 0 }} />
    </>
  );
};
