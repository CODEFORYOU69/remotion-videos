import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";
import type { PosterProduct } from "./products";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const GOLD = "#F8B50D";
const BG_DARK = "#171D14";
const TEXT_LIGHT = "#FAFAF2";
const LOGO = "kech-waffles/Transparent Gold White.png";

// 1080x1350 — Instagram 4:5 portrait
export const POSTER_WIDTH = 1080;
export const POSTER_HEIGHT = 1350;

export const ProductPoster: React.FC<{ product: PosterProduct }> = ({
  product,
}) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          width: 900,
          height: 900,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}12 0%, transparent 70%)`,
        }}
      />

      {/* Gold border - top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }}
      />

      {/* Gold border - bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 5,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }}
      />

      {/* Gold corner accents */}
      {/* Top-left */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          width: 60,
          height: 60,
          borderTop: `3px solid ${GOLD}`,
          borderLeft: `3px solid ${GOLD}`,
        }}
      />
      {/* Top-right */}
      <div
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          width: 60,
          height: 60,
          borderTop: `3px solid ${GOLD}`,
          borderRight: `3px solid ${GOLD}`,
        }}
      />
      {/* Bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: 30,
          width: 60,
          height: 60,
          borderBottom: `3px solid ${GOLD}`,
          borderLeft: `3px solid ${GOLD}`,
        }}
      />
      {/* Bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          width: 60,
          height: 60,
          borderBottom: `3px solid ${GOLD}`,
          borderRight: `3px solid ${GOLD}`,
        }}
      />

      {/* Logo - top center */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Img
          src={staticFile(LOGO)}
          style={{
            width: 140,
            height: 140,
            objectFit: "contain",
          }}
        />
      </div>

      {/* Category badge */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 22,
            fontWeight: 600,
            color: GOLD,
            textTransform: "uppercase",
            letterSpacing: 6,
          }}
        >
          {product.category}
        </span>
      </div>

      {/* Product image */}
      <div
        style={{
          position: "absolute",
          top: 240,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 580,
        }}
      >
        {/* Glow circle behind product */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${GOLD}18 0%, ${GOLD}08 50%, transparent 70%)`,
          }}
        />
        <Img
          src={staticFile(`kech-waffles/${product.image}`)}
          style={{
            width: 520,
            height: 520,
            objectFit: "contain",
            filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.6))",
          }}
        />
      </div>

      {/* Gold separator */}
      <div
        style={{
          position: "absolute",
          top: 840,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 3,
          backgroundColor: GOLD,
        }}
      />

      {/* Product name */}
      <div
        style={{
          position: "absolute",
          top: 870,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 72,
            fontWeight: 800,
            color: TEXT_LIGHT,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {product.name}
        </span>
      </div>

      {/* Description */}
      <div
        style={{
          position: "absolute",
          top: 970,
          left: 80,
          right: 80,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 30,
            fontWeight: 300,
            color: "rgba(250, 250, 242, 0.7)",
            lineHeight: 1.6,
          }}
        >
          {product.description}
        </span>
      </div>

      {/* Price */}
      <div
        style={{
          position: "absolute",
          top: 1060,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: 8,
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 80,
            fontWeight: 900,
            color: GOLD,
            lineHeight: 1,
          }}
        >
          {product.price}
        </span>
        <span
          style={{
            fontFamily,
            fontSize: 32,
            fontWeight: 400,
            color: GOLD,
            opacity: 0.8,
          }}
        >
          DH
        </span>
      </div>

      {/* Logo watermark - very subtle behind product */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile(LOGO)}
          style={{ height: 700, objectFit: "contain" }}
        />
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 55,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(250, 250, 242, 0.5)",
          }}
        >
          @kech_waffles
        </span>
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: GOLD,
          }}
        />
        <span
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: 400,
            color: "rgba(250, 250, 242, 0.5)",
          }}
        >
          Kech Waffles Marrakech
        </span>
      </div>
    </AbsoluteFill>
  );
};
