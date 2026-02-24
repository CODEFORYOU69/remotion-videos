import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";
import { LogoOutro } from "./reels/components/LogoOutro";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { loadFont as loadCairo } from "@remotion/google-fonts/Cairo";
import { SmokeEffect } from "./SmokeEffect";

const { fontFamily: poppins } = loadFont("normal", {
  weights: ["300", "400", "600", "700"],
  subsets: ["latin", "latin-ext"],
});

const { fontFamily: cairo } = loadCairo("normal", {
  weights: ["300", "400", "600", "700"],
  subsets: ["arabic"],
});

// ─── Brand Colors ───
const GOLD = "#F8B50D";
const BG_DARK = "#0D1108";
const TEXT_LIGHT = "#FAFAF2";
const RAMADAN_GREEN = "#1B5E20";
const RAMADAN_GOLD = "#D4A017";

// ─── Crescent Moon SVG ───
const CrescentMoon: React.FC<{ size?: number; color?: string }> = ({
  size = 80,
  color = GOLD,
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M 50 5 C 30 5 13 22 13 50 C 13 78 30 95 50 95 C 35 85 28 68 28 50 C 28 32 35 15 50 5 Z"
      fill={color}
    />
  </svg>
);

// ─── Star SVG ───
const Star: React.FC<{ size?: number; color?: string }> = ({
  size = 20,
  color = GOLD,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path
      d="M12 2L14.09 8.26L20.18 8.97L15.54 13.14L16.91 19.02L12 16.27L7.09 19.02L8.46 13.14L3.82 8.97L9.91 8.26L12 2Z"
      fill={color}
    />
  </svg>
);

// ─── Lantern SVG ───
const Lantern: React.FC<{ size?: number; color?: string }> = ({
  size = 60,
  color = GOLD,
}) => (
  <svg width={size} height={size * 1.8} viewBox="0 0 60 108">
    <path d="M 25 0 Q 25 8 30 8 Q 35 8 35 0" fill="none" stroke={color} strokeWidth="2" />
    <rect x="20" y="8" width="20" height="6" rx="2" fill={color} />
    <path d="M 15 14 Q 10 40 15 70 Q 20 80 30 82 Q 40 80 45 70 Q 50 40 45 14 Z" fill={color} opacity="0.3" />
    <path d="M 15 14 Q 10 40 15 70 Q 20 80 30 82 Q 40 80 45 70 Q 50 40 45 14 Z" fill="none" stroke={color} strokeWidth="1.5" />
    <ellipse cx="30" cy="45" rx="10" ry="20" fill={color} opacity="0.15" />
    <rect x="22" y="82" width="16" height="5" rx="2" fill={color} />
    <path d="M 28 87 L 30 95 L 32 87" fill={color} />
  </svg>
);

// ─── Intro Scene (vertical) ───
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const moonScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    durationInFrames: Math.round(1.5 * fps),
  });

  const titleEntrance = spring({
    frame: frame - Math.round(0.5 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(1 * fps),
  });

  const subtitleEntrance = spring({
    frame: frame - Math.round(1 * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });

  const lineWidth = interpolate(
    frame,
    [Math.round(0.8 * fps), Math.round(1.8 * fps)],
    [0, 300],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  const starTwinkle = (seed: number) =>
    0.3 + 0.7 * Math.abs(Math.sin(frame * 0.08 + seed));

  const lanternY = (seed: number) => Math.sin(frame * 0.03 + seed) * 8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        fontFamily: poppins,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 30%, ${RAMADAN_GREEN}15 0%, transparent 60%)`,
        }}
      />

      {/* Stars — repositioned for 1080x1920 */}
      {[
        { x: 80, y: 120, s: 12 },
        { x: 200, y: 250, s: 8 },
        { x: 950, y: 150, s: 14 },
        { x: 900, y: 350, s: 10 },
        { x: 350, y: 80, s: 6 },
        { x: 750, y: 60, s: 8 },
        { x: 540, y: 200, s: 10 },
        { x: 450, y: 300, s: 7 },
        { x: 700, y: 250, s: 9 },
      ].map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: star.x,
            top: star.y,
            opacity: starTwinkle(i * 2.3) * titleEntrance,
          }}
        >
          <Star size={star.s} color={GOLD} />
        </div>
      ))}

      {/* Lanterns */}
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 80 + lanternY(0),
          opacity: subtitleEntrance * 0.7,
        }}
      >
        <Lantern size={55} color={GOLD} />
      </div>
      <div
        style={{
          position: "absolute",
          right: 60,
          top: 120 + lanternY(2),
          opacity: subtitleEntrance * 0.7,
        }}
      >
        <Lantern size={50} color={RAMADAN_GOLD} />
      </div>

      {/* Crescent Moon */}
      <div
        style={{
          transform: `scale(${moonScale}) rotate(${interpolate(moonScale, [0, 1], [-30, 0])}deg)`,
          marginBottom: 40,
        }}
      >
        <CrescentMoon size={150} color={GOLD} />
      </div>

      {/* Top line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          marginBottom: 30,
        }}
      />

      {/* Ramadan Moubarak */}
      <div
        style={{
          opacity: titleEntrance,
          transform: `translateY(${interpolate(titleEntrance, [0, 1], [30, 0])}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 82,
            fontWeight: 700,
            color: GOLD,
            margin: 0,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Ramadan Moubarak
        </h1>
        <p
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: GOLD,
            margin: 0,
            marginTop: 12,
            fontFamily: cairo,
            direction: "rtl",
            opacity: 0.85,
          }}
        >
          رمضان مبارك
        </p>
      </div>

      {/* Bottom line */}
      <div
        style={{
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          marginTop: 30,
          marginBottom: 25,
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleEntrance,
          transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [20, 0])}px)`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 40,
            fontWeight: 300,
            color: TEXT_LIGHT,
            margin: 0,
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Nos Spécialités
        </p>
        <p
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: TEXT_LIGHT,
            margin: 0,
            marginTop: 8,
            fontFamily: cairo,
            direction: "rtl",
            opacity: 0.7,
          }}
        >
          تخصصاتنا
        </p>
      </div>

      {/* Logo watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: subtitleEntrance * 0.08,
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("kech-waffles/Transparent Gold White.png")}
          style={{ height: 600, objectFit: "contain" }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ─── Product Data Types ───
type PriceVariant = { label: string; labelAr?: string; price: string };

type RamadanProduct = {
  name: string;
  nameAr: string;
  variants: PriceVariant[];
  image: string;
  isHot: boolean;
  description: string;
  descriptionAr: string;
};

// ─── Product Slide (vertical: image top, info bottom) ───
const RamadanProductSlide: React.FC<{
  product: RamadanProduct;
  index: number;
}> = ({ product, index }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

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

  // Exit
  const exitStart = durationInFrames - Math.round(0.8 * fps);
  const globalOpacity = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const imageY = interpolate(imageEntrance, [0, 1], [-60, 0]);
  const textY = interpolate(textEntrance, [0, 1], [30, 0]);
  const floatY = Math.sin(frame * 0.04) * 6;

  const starTwinkle = (seed: number) =>
    0.2 + 0.8 * Math.abs(Math.sin(frame * 0.07 + seed));

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG_DARK,
        fontFamily: poppins,
        opacity: globalOpacity,
        overflow: "hidden",
      }}
    >
      {/* Green glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 30%, ${RAMADAN_GREEN}10 0%, transparent 50%)`,
        }}
      />

      {/* Stars — for 1080 width */}
      {[
        { x: 60, y: 80, s: 8 },
        { x: 980, y: 100, s: 10 },
        { x: 900, y: 500, s: 6 },
        { x: 120, y: 1600, s: 7 },
        { x: 950, y: 1400, s: 9 },
      ].map((star, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: star.x,
            top: star.y,
            opacity: starTwinkle(i * 3.1 + index) * textEntrance,
          }}
        >
          <Star size={star.s} color={GOLD} />
        </div>
      ))}

      {/* Gold accent lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${GOLD}80, transparent)`,
          opacity: textEntrance,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, transparent, ${GOLD}80, transparent)`,
          opacity: textEntrance,
        }}
      />

      {/* Ramadan badge top-right */}
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: textEntrance * 0.6,
        }}
      >
        <CrescentMoon size={32} color={GOLD} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: GOLD,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Spécial Ramadan
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: GOLD,
              fontFamily: cairo,
              direction: "rtl",
              opacity: 0.8,
            }}
          >
            خاص رمضان
          </span>
        </div>
      </div>

      {/* TOP: Product image (top 50%) */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          height: 850,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${imageY}px)`,
          opacity: imageEntrance,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `translateY(${floatY}px)`,
          }}
        >
          <Img
            src={staticFile(`kech-waffles/${product.image}`)}
            style={{
              width: 650,
              height: 650,
              objectFit: "contain",
            }}
          />
          {/* Warm glow */}
          <div
            style={{
              position: "absolute",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`,
              zIndex: -1,
            }}
          />
          {product.isHot && (
            <div
              style={{
                position: "absolute",
                top: -30,
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <SmokeEffect
                width={500}
                height={350}
                particleCount={16}
                seed={index * 13 + 7}
              />
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM: Product info (centered) */}
      <div
        style={{
          position: "absolute",
          top: 1000,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        {/* Product name */}
        <div
          style={{
            opacity: textEntrance,
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
            }}
          >
            {product.name}
          </h1>
          <p
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: TEXT_LIGHT,
              margin: 0,
              marginTop: 8,
              fontFamily: cairo,
              direction: "rtl",
              opacity: 0.7,
            }}
          >
            {product.nameAr}
          </p>
        </div>

        {/* Gold separator */}
        <div
          style={{
            width: interpolate(textEntrance, [0, 1], [0, 120]),
            height: 3,
            backgroundColor: GOLD,
            marginTop: 24,
            marginBottom: 24,
          }}
        />

        {/* Description */}
        <div
          style={{
            opacity: interpolate(textEntrance, [0, 1], [0, 0.7]),
            transform: `translateY(${interpolate(textEntrance, [0, 1], [15, 0])}px)`,
            marginBottom: 40,
          }}
        >
          <p
            style={{
              fontSize: 28,
              fontWeight: 300,
              color: TEXT_LIGHT,
              margin: 0,
              opacity: 0.7,
            }}
          >
            {product.description}
          </p>
          <p
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: TEXT_LIGHT,
              margin: 0,
              marginTop: 6,
              fontFamily: cairo,
              direction: "rtl",
              opacity: 0.5,
            }}
          >
            {product.descriptionAr}
          </p>
        </div>

        {/* Price variants — centered */}
        {product.variants.map((variant, vi) => {
          const variantDelay = Math.round((0.6 + vi * 0.15) * fps);
          const variantEntrance = spring({
            frame: frame - variantDelay,
            fps,
            config: { damping: 15, stiffness: 120 },
            durationInFrames: Math.round(0.6 * fps),
          });

          return (
            <div
              key={vi}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
                marginBottom: 16,
                opacity: variantEntrance,
                transform: `translateY(${interpolate(variantEntrance, [0, 1], [20, 0])}px)`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", minWidth: 100 }}>
                <span
                  style={{
                    fontSize: 28,
                    fontWeight: 400,
                    color: TEXT_LIGHT,
                    opacity: 0.6,
                  }}
                >
                  {variant.label}
                </span>
                {variant.labelAr && (
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 400,
                      color: TEXT_LIGHT,
                      opacity: 0.45,
                      fontFamily: cairo,
                      direction: "rtl",
                    }}
                  >
                    {variant.labelAr}
                  </span>
                )}
              </div>
              <div
                style={{
                  width: 50,
                  height: 1,
                  backgroundColor: GOLD,
                  opacity: 0.4,
                }}
              />
              <span
                style={{
                  fontSize: 56,
                  fontWeight: 700,
                  color: GOLD,
                  lineHeight: 1,
                  minWidth: 80,
                }}
              >
                {variant.price}
              </span>
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 400,
                  color: GOLD,
                  opacity: 0.7,
                }}
              >
                DH
              </span>
            </div>
          );
        })}
      </div>

      {/* Logo watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: textEntrance * 0.08,
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("kech-waffles/Transparent Gold White.png")}
          style={{ height: 600, objectFit: "contain" }}
        />
      </div>
    </AbsoluteFill>
  );
};

// ─── Products ───
const RAMADAN_PRODUCTS: RamadanProduct[] = [
  {
    name: "Borek",
    nameAr: "بوريك",
    description: "Feuilleté croustillant farci",
    descriptionAr: "معجنات مقرمشة محشية",
    variants: [
      { label: "Petit", labelAr: "صغير", price: "20" },
      { label: "Grand", labelAr: "كبير", price: "30" },
    ],
    image: "borek2.png",
    isHot: true,
  },
  {
    name: "Kunefe",
    nameAr: "كنافة",
    description: "Pâtisserie orientale au fromage filant",
    descriptionAr: "حلوى شرقية بالجبن",
    variants: [
      { label: "Petit", labelAr: "صغير", price: "15" },
      { label: "Grand", labelAr: "كبير", price: "20" },
    ],
    image: "kunefe.png",
    isHot: true,
  },
  {
    name: "Jus Carotte Orange",
    nameAr: "عصير جزر وبرتقال",
    description: "Jus frais pressé vitaminé",
    descriptionAr: "عصير طازج غني بالفيتامينات",
    variants: [
      { label: "25 cl", price: "15" },
      { label: "50 cl", price: "25" },
      { label: "1 Litre", price: "40" },
    ],
    image: "carotorangejuice.png",
    isHot: false,
  },
];

const INTRO_DURATION = 120;
const PRODUCT_DURATION = 210;
const OVERLAP = -15;
const LOGO_OUTRO_DURATION = 45; // 1.5s

const CONTENT_DURATION =
  INTRO_DURATION +
  RAMADAN_PRODUCTS.length * PRODUCT_DURATION +
  RAMADAN_PRODUCTS.length * OVERLAP;

export const RamadanSpecialReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <Sequence durationInFrames={INTRO_DURATION} premountFor={30}>
        <IntroScene />
      </Sequence>

      {RAMADAN_PRODUCTS.map((product, i) => {
        const from =
          INTRO_DURATION + i * (PRODUCT_DURATION + OVERLAP) + OVERLAP;
        return (
          <Sequence
            key={i}
            from={from}
            durationInFrames={PRODUCT_DURATION}
            premountFor={30}
          >
            <RamadanProductSlide product={product} index={i} />
          </Sequence>
        );
      })}

      {/* Logo outro */}
      <LogoOutro startFrame={CONTENT_DURATION} />
    </AbsoluteFill>
  );
};

export const RAMADAN_REEL_DURATION = CONTENT_DURATION + LOGO_OUTRO_DURATION;
