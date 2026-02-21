import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { SmokeEffect } from "./SmokeEffect";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

const GOLD = "#F8B50D";
const BG_DARK = "#171D14";
const TEXT_LIGHT = "#FAFAF2";

export type ProductData = {
  name: string;
  price: string;
  description: string;
  image: string;
  isHot?: boolean;
};

export const ProductSlide: React.FC<{
  product: ProductData;
  index: number;
}> = ({ product, index }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Entrance animations ──
  const imageEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(1.2 * fps),
  });

  const textEntrance = spring({
    frame: frame - Math.round(0.3 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(1 * fps),
  });

  const priceEntrance = spring({
    frame: frame - Math.round(0.6 * fps),
    fps,
    config: { damping: 15, stiffness: 100 },
    durationInFrames: Math.round(0.8 * fps),
  });

  const descEntrance = spring({
    frame: frame - Math.round(0.8 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });

  // ── Exit animations ──
  const exitStart = durationInFrames - Math.round(0.8 * fps);
  const exitProgress = interpolate(frame, [exitStart, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const globalOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  // ── Derived values ──
  const imageScale = interpolate(imageEntrance, [0, 1], [0.8, 1]);
  const imageOpacity = imageEntrance;
  const imageX = interpolate(imageEntrance, [0, 1], [-80, 0]);

  const textY = interpolate(textEntrance, [0, 1], [40, 0]);
  const textOpacity = textEntrance;

  const priceScale = interpolate(priceEntrance, [0, 1], [0.5, 1]);
  const priceOpacity = priceEntrance;

  const descY = interpolate(descEntrance, [0, 1], [20, 0]);
  const descOpacity = descEntrance;

  // Subtle floating animation for the image
  const floatY = Math.sin(frame * 0.05) * 5;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        fontFamily,
        opacity: globalOpacity,
      }}
    >
      {/* Gold accent line at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          opacity: textEntrance,
        }}
      />

      {/* Left side: Product image - FULL HEIGHT */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "55%",
          transform: `translateX(${imageX}px) scale(${imageScale})`,
          opacity: imageOpacity,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `translateY(${floatY}px)`,
          }}
        >
          <Img
            src={staticFile(`kech-waffles/${product.image}`)}
            style={{
              width: "90%",
              height: "90%",
              objectFit: "contain",
            }}
          />
          {/* Glow behind the product */}
          <div
            style={{
              position: "absolute",
              width: "60%",
              height: "60%",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`,
              zIndex: -1,
            }}
          />
        </div>
        {/* Smoke effect for hot items */}
        {product.isHot && (
          <div
            style={{
              position: "absolute",
              top: -20,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <SmokeEffect
              width={600}
              height={400}
              particleCount={18}
              seed={index * 7 + 1}
            />
          </div>
        )}
      </div>

      {/* Right side: Product info */}
      <div
        style={{
          position: "absolute",
          right: 80,
          top: "50%",
          transform: "translateY(-50%)",
          width: 800,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          textAlign: "right",
        }}
      >
        {/* Product name */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: TEXT_LIGHT,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {product.name}
          </h1>
        </div>

        {/* Gold separator */}
        <div
          style={{
            width: interpolate(textEntrance, [0, 1], [0, 120]),
            height: 3,
            backgroundColor: GOLD,
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        {/* Description */}
        <div
          style={{
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
          }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 300,
              color: "rgba(250, 250, 242, 0.7)",
              margin: 0,
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div
          style={{
            marginTop: 40,
            opacity: priceOpacity,
            transform: `scale(${priceScale})`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 90,
                fontWeight: 700,
                color: GOLD,
                lineHeight: 1,
              }}
            >
              {product.price}
            </span>
            <span
              style={{
                fontSize: 32,
                fontWeight: 400,
                color: GOLD,
                opacity: 0.8,
              }}
            >
              DH
            </span>
          </div>
        </div>
      </div>

      {/* Logo watermark center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: interpolate(textEntrance, [0, 1], [0, 0.08]),
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("kech-waffles/Transparent Gold White.png")}
          style={{ height: 800, objectFit: "contain" }}
        />
      </div>

      {/* Gold accent line at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          opacity: textEntrance,
        }}
      />
    </AbsoluteFill>
  );
};
