import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, FONT_FAMILY, GOOGLE_LINK, SPRINGS } from "../config/brand";

export const GoogleLink: React.FC<{
  delay?: number;
}> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: SPRINGS.snappy,
    durationInFrames: Math.round(0.8 * fps),
  });

  const translateY = interpolate(entrance, [0, 1], [60, 0]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        opacity: entrance,
        transform: `translateY(${translateY}px)`,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          backgroundColor: "rgba(0,0,0,0.7)",
          borderRadius: 50,
          padding: "16px 32px",
          border: `2px solid ${BRAND.gold}40`,
        }}
      >
        {/* Pin icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill={BRAND.gold}
          />
        </svg>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 28,
            fontWeight: 600,
            color: BRAND.textLight,
          }}
        >
          {GOOGLE_LINK.displayText}
        </span>
      </div>
    </div>
  );
};
