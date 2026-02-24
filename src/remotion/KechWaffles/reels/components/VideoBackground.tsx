import {
  AbsoluteFill,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../config/brand";

export const VideoBackground: React.FC<{
  clip: string;
  overlayOpacity?: number;
  zoomFrom?: number;
  zoomTo?: number;
}> = ({ clip, overlayOpacity = 0.65, zoomFrom = 1.0, zoomTo = 1.15 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <OffthreadVideo
          src={staticFile(`videokech/${clip}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
        />
      </AbsoluteFill>
      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          backgroundColor: BRAND.dark,
          opacity: overlayOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
