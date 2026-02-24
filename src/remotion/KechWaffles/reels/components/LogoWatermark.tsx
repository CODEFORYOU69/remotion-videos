import { AbsoluteFill, Img, staticFile } from "remotion";
import { LOGO_PATH } from "../config/brand";

export const LogoWatermark: React.FC<{
  size?: number;
  opacity?: number;
}> = ({ size = 600, opacity = 0.08 }) => {
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        pointerEvents: "none",
      }}
    >
      <Img
        src={staticFile(LOGO_PATH)}
        style={{ height: size, objectFit: "contain" }}
      />
    </AbsoluteFill>
  );
};
