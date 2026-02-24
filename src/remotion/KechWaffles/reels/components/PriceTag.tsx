import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, FONT_FAMILY, SPRINGS } from "../config/brand";

export const PriceTag: React.FC<{
  price: string;
  delay?: number;
  fontSize?: number;
}> = ({ price, delay = 0, fontSize = 120 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.bouncy,
    durationInFrames: Math.round(0.8 * fps),
  });

  const scale = interpolate(entrance, [0, 1], [0.5, 1]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
        gap: 8,
        opacity: entrance,
        transform: `scale(${scale})`,
      }}
    >
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize,
          fontWeight: 700,
          color: BRAND.gold,
          lineHeight: 1,
          textShadow: `0 4px 20px rgba(248, 181, 13, 0.4)`,
        }}
      >
        {price}
      </span>
      <span
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: fontSize * 0.35,
          fontWeight: 400,
          color: BRAND.gold,
          opacity: 0.8,
        }}
      >
        DH
      </span>
    </div>
  );
};
