import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Series,
  Easing,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { SmokeEffect } from "./SmokeEffect";
import { LogoOutro } from "./reels/components/LogoOutro";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800"],
  subsets: ["latin", "latin-ext"],
});

const GOLD = "#F8B50D";
const BG_DARK = "#171D14";
const TEXT_LIGHT = "#FAFAF2";
const LOGO_PATH = "kech-waffles/Transparent Gold White.png";

type ProductData = {
  name: string;
  price: string;
  description: string;
  image: string;
  isHot?: boolean;
};

// ─── Product Data (prix BDD) ───

const SIGNATURES_SUCREES: ProductData[] = [
  { name: "La Dubai", price: "55", description: "Pâte pistache, kadayif, chocolat noir, pistaches, tahini", image: "ladubai-gaufre.png", isHot: true },
  { name: "La Souss-Massa", price: "50", description: "Amlou maison, amandes, miel eucalyptus, fleur de sel", image: "soussmassa-gaufre.png", isHot: true },
  { name: "La Marrakchia", price: "50", description: "Crème fleur d'oranger, fraises, pétales de rose, sirop rose, pistaches", image: "marrakchia-gaufres.png", isHot: true },
  { name: "L'Oasis", price: "50", description: "Crème de dattes, dattes fraîches, beurre cacahuète, amandes, fleur de sel", image: "loasis2-gaufres.png", isHot: true },
  { name: "La Tiramisu", price: "45", description: "Crème mascarpone café, cacao, biscuits spéculoos, sauce chocolat", image: "BUBBLETIRA.png", isHot: true },
  { name: "La Lotus", price: "45", description: "Pâte Lotus, biscuits Lotus émiettés, sauce caramel, chantilly", image: "croffle.png", isHot: true },
];

const BASES: ProductData[] = [
  { name: "Gaufre Liégeoise", price: "35", description: "Authentique gaufre liégeoise avec perles de sucre caramélisées", image: "gaufreliegeoise.png", isHot: true },
  { name: "Craffle", price: "30", description: "Croissant gaufré croustillant", image: "croffle.png", isHot: true },
  { name: "Bubble Waffle", price: "30", description: "Gaufre bulle en cornet", image: "BUBBLETIRA.png", isHot: true },
  { name: "Pancakes", price: "30", description: "Stack de pancakes moelleux", image: "pancakestiramisu.png", isHot: true },
];

const SIGNATURES_SALEES: ProductData[] = [
  { name: "La Marrakchiya", price: "45", description: "Kefta maison, sauce tomate harissa, poivrons grillés, olives noires, coriandre", image: "marrakchia-pizza.png", isHot: true },
  { name: "La Fesiya", price: "50", description: "Poulet confit, citrons confits, olives, fromage de chèvre, huile d'argan", image: "fesiya-pizza.png", isHot: true },
  { name: "La Khli3", price: "55", description: "Khli3 émincé, œuf mollet, poivrons rouges, fromage Hollandais", image: "khli-pizza.png", isHot: true },
  { name: "La Boisée", price: "45", description: "Poulet, mozzarella, poivron, pomme de terre, sauce gruyère", image: "wafflepizza.png", isHot: true },
];

const BASES_SALEES: ProductData[] = [
  { name: "Pizza Waffle", price: "35", description: "Gaufre croustillante façon pizza", image: "wafflepizza.png", isHot: true },
  { name: "Potato Waffle", price: "35", description: "Gaufre de pomme de terre vapeur croustillante", image: "potatowaffle.png", isHot: true },
];

const BOISSONS: ProductData[] = [
  { name: "Cappuccino", price: "20-30", description: "S / M / L", image: "cappuccino.png", isHot: true },
  { name: "Latte", price: "15-25", description: "S / M / L", image: "latte.png", isHot: true },
  { name: "Milkshake Chocolat", price: "35", description: "Milkshake onctueux au chocolat", image: "milkshakechocolat.png" },
  { name: "Milkshake Fraise", price: "35", description: "Milkshake onctueux à la fraise", image: "milkshakefraise.png" },
];

// ─── Vertical Product Slide (1080x1920) ───

const ProductSlideReel: React.FC<{ product: ProductData; index: number }> = ({
  product,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const imageEntrance = spring({ frame, fps, config: { damping: 200 }, durationInFrames: Math.round(1.2 * fps) });
  const textEntrance = spring({ frame: frame - Math.round(0.3 * fps), fps, config: { damping: 200 }, durationInFrames: Math.round(1 * fps) });
  const priceEntrance = spring({ frame: frame - Math.round(0.6 * fps), fps, config: { damping: 15, stiffness: 100 }, durationInFrames: Math.round(0.8 * fps) });
  const descEntrance = spring({ frame: frame - Math.round(0.8 * fps), fps, config: { damping: 200 }, durationInFrames: Math.round(0.8 * fps) });

  const exitStart = durationInFrames - Math.round(0.8 * fps);
  const globalOpacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const imageScale = interpolate(imageEntrance, [0, 1], [0.8, 1]);
  const imageY = interpolate(imageEntrance, [0, 1], [60, 0]);
  const textY = interpolate(textEntrance, [0, 1], [40, 0]);
  const priceScale = interpolate(priceEntrance, [0, 1], [0.5, 1]);
  const descY = interpolate(descEntrance, [0, 1], [20, 0]);
  const floatY = Math.sin(frame * 0.05) * 5;

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK, fontFamily, opacity: globalOpacity }}>
      {/* Gold accent top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity: textEntrance }} />

      {/* Top: Product image */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          height: 900,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${imageY}px) scale(${imageScale})`,
          opacity: imageEntrance,
        }}
      >
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", transform: `translateY(${floatY}px)` }}>
          <Img
            src={staticFile(`kech-waffles/${product.image}`)}
            style={{ width: 700, height: 700, objectFit: "contain" }}
          />
          <div style={{ position: "absolute", width: "70%", height: "70%", borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}15 0%, transparent 70%)`, zIndex: -1 }} />
        </div>
        {product.isHot && (
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)" }}>
            <SmokeEffect width={600} height={400} particleCount={18} seed={index * 7 + 1} />
          </div>
        )}
      </div>

      {/* Bottom: Product info */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        {/* Name */}
        <div style={{ opacity: textEntrance, transform: `translateY(${textY}px)` }}>
          <h1 style={{ fontSize: 72, fontWeight: 700, color: TEXT_LIGHT, margin: 0, lineHeight: 1.1 }}>
            {product.name}
          </h1>
        </div>

        {/* Gold separator */}
        <div style={{ width: interpolate(textEntrance, [0, 1], [0, 120]), height: 3, backgroundColor: GOLD, marginTop: 25, marginBottom: 25 }} />

        {/* Description */}
        <div style={{ opacity: descEntrance, transform: `translateY(${descY}px)` }}>
          <p style={{ fontSize: 32, fontWeight: 300, color: "rgba(250, 250, 242, 0.7)", margin: 0, lineHeight: 1.5 }}>
            {product.description}
          </p>
        </div>

        {/* Price */}
        <div style={{ marginTop: 40, opacity: priceEntrance, transform: `scale(${priceScale})` }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 8 }}>
            <span style={{ fontSize: 100, fontWeight: 700, color: GOLD, lineHeight: 1 }}>{product.price}</span>
            <span style={{ fontSize: 36, fontWeight: 400, color: GOLD, opacity: 0.8 }}>DH</span>
          </div>
        </div>
      </div>

      {/* Logo watermark */}
      <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", opacity: interpolate(textEntrance, [0, 1], [0, 0.06]), pointerEvents: "none" }}>
        <Img src={staticFile(LOGO_PATH)} style={{ height: 800, objectFit: "contain" }} />
      </div>

      {/* Gold accent bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, opacity: textEntrance }} />
    </AbsoluteFill>
  );
};

// ─── Vertical Category Slide (1080x1920) ───

const CategorySlideReel: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, Math.round(0.8 * fps)], [0, 400], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const titleEntrance = spring({ frame: frame - Math.round(0.2 * fps), fps, config: { damping: 200 }, durationInFrames: Math.round(1 * fps) });
  const subtitleEntrance = spring({ frame: frame - Math.round(0.6 * fps), fps, config: { damping: 200 }, durationInFrames: Math.round(0.8 * fps) });

  const exitStart = durationInFrames - Math.round(0.6 * fps);
  const globalOpacity = interpolate(frame, [exitStart, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK, fontFamily, justifyContent: "center", alignItems: "center", opacity: globalOpacity }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", border: `2px solid ${GOLD}`, opacity: interpolate(frame, [0, Math.round(1 * fps)], [0, 0.15], { extrapolateRight: "clamp" }), transform: `scale(${interpolate(frame, [0, Math.round(1.5 * fps)], [0.5, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })})` }} />

      <div style={{ width: lineWidth, height: 3, backgroundColor: GOLD, marginBottom: 40 }} />

      <div style={{ opacity: titleEntrance, transform: `translateY(${interpolate(titleEntrance, [0, 1], [50, 0])}px)` }}>
        <h1 style={{ fontSize: 80, fontWeight: 700, color: TEXT_LIGHT, margin: 0, textAlign: "center", letterSpacing: 2, textTransform: "uppercase" }}>
          {title}
        </h1>
      </div>

      {subtitle && (
        <div style={{ opacity: subtitleEntrance, transform: `translateY(${interpolate(subtitleEntrance, [0, 1], [30, 0])}px)`, marginTop: 20 }}>
          <p style={{ fontSize: 36, fontWeight: 300, color: GOLD, margin: 0, textAlign: "center", letterSpacing: 4, textTransform: "uppercase" }}>
            {subtitle}
          </p>
        </div>
      )}

      <div style={{ width: lineWidth, height: 3, backgroundColor: GOLD, marginTop: 40 }} />

      <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", opacity: interpolate(subtitleEntrance, [0, 1], [0, 0.08]), pointerEvents: "none" }}>
        <Img src={staticFile(LOGO_PATH)} style={{ height: 800, objectFit: "contain" }} />
      </div>
    </AbsoluteFill>
  );
};

// ─── Timeline ───

const SLIDE_DURATION = 150; // 5s at 30fps (shorter for reel)
const CATEGORY_DURATION = 75; // 2.5s at 30fps
const OVERLAP = -10;
const LOGO_OUTRO_DURATION = 45; // 1.5s

type SlideItem =
  | { type: "category"; title: string; subtitle?: string }
  | { type: "product"; product: ProductData; index: number };

const slides: SlideItem[] = [
  { type: "category", title: "Nos Signatures", subtitle: "Recettes Sucrées" },
  ...SIGNATURES_SUCREES.map((p, i) => ({ type: "product" as const, product: p, index: i })),
  { type: "category", title: "Nos Bases", subtitle: "Gaufres & Pancakes" },
  ...BASES.map((p, i) => ({ type: "product" as const, product: p, index: i + 10 })),
  { type: "category", title: "Signatures Salées", subtitle: "Pizza Waffles" },
  ...SIGNATURES_SALEES.map((p, i) => ({ type: "product" as const, product: p, index: i + 20 })),
  { type: "category", title: "Nos Bases Salées", subtitle: "Pizza & Potato Waffles" },
  ...BASES_SALEES.map((p, i) => ({ type: "product" as const, product: p, index: i + 25 })),
  { type: "category", title: "Boissons", subtitle: "Cafés & Milkshakes" },
  ...BOISSONS.map((p, i) => ({ type: "product" as const, product: p, index: i + 30 })),
];

// 5 categories × 75 + 20 products × 150 + overlaps (25 × 10) + logo outro
// = 375 + 3000 - 250 + 45 = 3170 frames
export const KECH_MENU_REEL_DURATION = 3170;

export const KechWafflesMenuReel: React.FC = () => {
  const contentEnd = KECH_MENU_REEL_DURATION - LOGO_OUTRO_DURATION;

  return (
    <AbsoluteFill style={{ backgroundColor: BG_DARK }}>
      <Series>
        {slides.map((slide, i) => {
          const duration = slide.type === "category" ? CATEGORY_DURATION : SLIDE_DURATION;
          return (
            <Series.Sequence key={i} durationInFrames={duration} offset={i > 0 ? OVERLAP : 0}>
              {slide.type === "category" ? (
                <CategorySlideReel title={slide.title} subtitle={slide.subtitle} />
              ) : (
                <ProductSlideReel product={slide.product} index={slide.index} />
              )}
            </Series.Sequence>
          );
        })}
      </Series>

      {/* Logo outro */}
      <LogoOutro startFrame={contentEnd} />
    </AbsoluteFill>
  );
};
