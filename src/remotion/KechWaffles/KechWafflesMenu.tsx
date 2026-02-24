import { AbsoluteFill, Series } from "remotion";
import { ProductSlide, type ProductData } from "./ProductSlide";
import { CategorySlide } from "./CategorySlide";

// ─── Product Data ───

const SIGNATURES_SUCREES: ProductData[] = [
  {
    name: "La Dubai",
    price: "55",
    description: "Pâte pistache, kadayif, chocolat noir, pistaches, tahini",
    image: "ladubai-gaufre.png",
    isHot: true,
  },
  {
    name: "La Souss-Massa",
    price: "50",
    description: "Amlou maison, amandes, miel eucalyptus, fleur de sel",
    image: "soussmassa-gaufre.png",
    isHot: true,
  },
  {
    name: "La Marrakchia",
    price: "50",
    description:
      "Crème fleur d'oranger, fraises, pétales de rose, sirop rose, pistaches",
    image: "marrakchia-gaufres.png",
    isHot: true,
  },
  {
    name: "L'Oasis",
    price: "50",
    description: "Crème de dattes, dattes fraîches, beurre cacahuète, amandes, fleur de sel",
    image: "loasis2-gaufres.png",
    isHot: true,
  },
  {
    name: "La Tiramisu",
    price: "45",
    description:
      "Crème mascarpone café, cacao, biscuits spéculoos, sauce chocolat",
    image: "BUBBLETIRA.png",
    isHot: true,
  },
  {
    name: "La Lotus",
    price: "45",
    description: "Pâte Lotus, biscuits Lotus émiettés, sauce caramel, chantilly",
    image: "croffle.png",
    isHot: true,
  },
];

const BASES: ProductData[] = [
  {
    name: "Gaufre Liégeoise",
    price: "35",
    description: "Authentique gaufre liégeoise avec perles de sucre caramélisées",
    image: "gaufreliegeoise.png",
    isHot: true,
  },
  {
    name: "Craffle",
    price: "30",
    description: "Croissant gaufré croustillant",
    image: "croffle.png",
    isHot: true,
  },
  {
    name: "Bubble Waffle",
    price: "30",
    description: "Gaufre bulle en cornet",
    image: "BUBBLETIRA.png",
    isHot: true,
  },
  {
    name: "Pancakes",
    price: "30",
    description: "Stack de pancakes moelleux",
    image: "pancakestiramisu.png",
    isHot: true,
  },
];

const BOISSONS: ProductData[] = [
  {
    name: "Cappuccino",
    price: "20-30",
    description: "S / M / L",
    image: "cappuccino.png",
    isHot: true,
  },
  {
    name: "Latte",
    price: "15-25",
    description: "S / M / L",
    image: "latte.png",
    isHot: true,
  },
  {
    name: "Milkshake Chocolat",
    price: "35",
    description: "Milkshake onctueux au chocolat",
    image: "milkshakechocolat.png",
    isHot: false,
  },
  {
    name: "Milkshake Fraise",
    price: "35",
    description: "Milkshake onctueux à la fraise",
    image: "milkshakefraise.png",
    isHot: false,
  },
];

const SIGNATURES_SALEES: ProductData[] = [
  {
    name: "La Marrakchiya",
    price: "45",
    description: "Kefta maison, sauce tomate harissa, poivrons grillés, olives noires, coriandre",
    image: "marrakchia-pizza.png",
    isHot: true,
  },
  {
    name: "La Fesiya",
    price: "50",
    description: "Poulet confit, citrons confits, olives, fromage de chèvre, huile d'argan",
    image: "fesiya-pizza.png",
    isHot: true,
  },
  {
    name: "La Khli3",
    price: "55",
    description: "Khli3 émincé, œuf mollet, poivrons rouges, fromage Hollandais",
    image: "khli-pizza.png",
    isHot: true,
  },
  {
    name: "La Boisée",
    price: "45",
    description: "Poulet, mozzarella, poivron, pomme de terre, sauce gruyère",
    image: "wafflepizza.png",
    isHot: true,
  },
];

const BASES_SALEES: ProductData[] = [
  {
    name: "Pizza Waffle",
    price: "35",
    description: "Gaufre croustillante façon pizza",
    image: "wafflepizza.png",
    isHot: true,
  },
  {
    name: "Potato Waffle",
    price: "35",
    description: "Gaufre de pomme de terre vapeur croustillante",
    image: "potatowaffle.png",
    isHot: true,
  },
];

/*
 * ─── Timeline ───
 *
 * Category slide: 3s (90 frames)
 * Product slide: 6s (180 frames)
 * Overlap between slides: -0.5s (-15 frames) for smooth transitions
 *
 * Structure:
 * [Cat: Signatures Sucrées] → [Dubai] → [Souss-Massa] → [Marrakchia] → [Oasis] → [Tiramisu] → [Lotus]
 * [Cat: Nos Bases] → [Liégeoise] → [Craffle] → [Bubble] → [Pancakes]
 * [Cat: Signatures Salées] → [Marrakchiya] → [Fesiya] → [Khli3]
 * [Cat: Bases Salées] → [Pizza Waffle] → [Potato Waffle]
 * [Cat: Boissons] → [Cappuccino] → [Latte] → [Milkshake Choco] → [Milkshake Fraise]
 */

const SLIDE_DURATION = 180; // 6s at 30fps
const CATEGORY_DURATION = 90; // 3s at 30fps
const OVERLAP = -15; // 0.5s overlap

type SlideItem =
  | { type: "category"; title: string; subtitle?: string }
  | { type: "product"; product: ProductData; index: number };

const slides: SlideItem[] = [
  { type: "category", title: "Nos Signatures", subtitle: "Recettes Sucrées" },
  ...SIGNATURES_SUCREES.map((p, i) => ({
    type: "product" as const,
    product: p,
    index: i,
  })),
  { type: "category", title: "Nos Bases", subtitle: "Gaufres & Pancakes" },
  ...BASES.map((p, i) => ({
    type: "product" as const,
    product: p,
    index: i + 10,
  })),
  { type: "category", title: "Signatures Salées", subtitle: "Pizza Waffles" },
  ...SIGNATURES_SALEES.map((p, i) => ({
    type: "product" as const,
    product: p,
    index: i + 20,
  })),
  { type: "category", title: "Nos Bases Salées", subtitle: "Pizza & Potato Waffles" },
  ...BASES_SALEES.map((p, i) => ({
    type: "product" as const,
    product: p,
    index: i + 25,
  })),
  { type: "category", title: "Boissons", subtitle: "Cafés & Milkshakes" },
  ...BOISSONS.map((p, i) => ({
    type: "product" as const,
    product: p,
    index: i + 30,
  })),
];

export const KechWafflesMenu: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#171D14" }}>
      <Series>
        {slides.map((slide, i) => {
          const duration =
            slide.type === "category" ? CATEGORY_DURATION : SLIDE_DURATION;
          return (
            <Series.Sequence
              key={i}
              durationInFrames={duration}
              offset={i > 0 ? OVERLAP : 0}
            >
              {slide.type === "category" ? (
                <CategorySlide
                  title={slide.title}
                  subtitle={slide.subtitle}
                />
              ) : (
                <ProductSlide product={slide.product} index={slide.index} />
              )}
            </Series.Sequence>
          );
        })}
      </Series>
    </AbsoluteFill>
  );
};

// Calcul de la durée totale pour Root.tsx :
// 6 categories × 90 frames + 21 products × 180 frames + overlaps
// = 540 + 3780 - (26 overlaps × 15) = 4320 - 390 = 3930 frames
// Arrondi à 3950 frames = ~132s
export const KECH_MENU_DURATION = 3950;
