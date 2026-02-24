import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, FONT_FAMILY, SPRINGS } from "../config/brand";

export const CountdownNumber: React.FC<{
  number: number;
  delay?: number;
}> = ({ number, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.slam,
    durationInFrames: Math.round(0.6 * fps),
  });

  const scale = interpolate(entrance, [0, 1], [3, 1]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: entrance,
        transform: `scale(${scale})`,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 400,
          fontWeight: 900,
          color: BRAND.gold,
          lineHeight: 1,
          textShadow: `
            0 0 40px rgba(248, 181, 13, 0.6),
            0 8px 30px rgba(0, 0, 0, 0.5)
          `,
          WebkitTextStroke: `3px ${BRAND.goldLight}`,
        }}
      >
        {number}
      </span>
    </div>
  );
};
