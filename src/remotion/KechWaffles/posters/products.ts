export type PosterProduct = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

// ── Signatures Sucrées ──
const SIGNATURES_SUCREES: PosterProduct[] = [
  {
    id: "la-dubai",
    name: "La Dubai",
    price: "55",
    description: "Pâte pistache, kadayif, chocolat noir, pistaches, tahini",
    image: "ladubai-gaufre.png",
    category: "Signatures Sucrées",
  },
  {
    id: "la-souss-massa",
    name: "La Souss-Massa",
    price: "50",
    description: "Amlou maison, amandes, miel eucalyptus, fleur de sel",
    image: "soussmassa-gaufre.png",
    category: "Signatures Sucrées",
  },
  {
    id: "la-marrakchia",
    name: "La Marrakchia",
    price: "50",
    description:
      "Crème fleur d'oranger, fraises, pétales de rose, sirop rose, pistaches",
    image: "marrakchia-gaufres.png",
    category: "Signatures Sucrées",
  },
  {
    id: "loasis",
    name: "L'Oasis",
    price: "50",
    description:
      "Crème de dattes, dattes fraîches, beurre cacahuète, amandes, fleur de sel",
    image: "loasis2-gaufres.png",
    category: "Signatures Sucrées",
  },
  {
    id: "la-tiramisu",
    name: "La Tiramisu",
    price: "45",
    description:
      "Crème mascarpone café, cacao, biscuits spéculoos, sauce chocolat",
    image: "BUBBLETIRA.png",
    category: "Signatures Sucrées",
  },
  {
    id: "la-lotus",
    name: "La Lotus",
    price: "45",
    description: "Pâte Lotus, biscuits Lotus émiettés, sauce caramel, chantilly",
    image: "croffle.png",
    category: "Signatures Sucrées",
  },
];

// ── Bases Sucrées ──
const BASES: PosterProduct[] = [
  {
    id: "gaufre-liegeoise",
    name: "Gaufre Liégeoise",
    price: "35",
    description: "Authentique gaufre liégeoise avec perles de sucre caramélisées",
    image: "gaufreliegeoise.png",
    category: "Nos Bases",
  },
  {
    id: "craffle",
    name: "Craffle",
    price: "30",
    description: "Croissant gaufré croustillant",
    image: "croffle.png",
    category: "Nos Bases",
  },
  {
    id: "bubble-waffle",
    name: "Bubble Waffle",
    price: "30",
    description: "Gaufre bulle en cornet",
    image: "BUBBLETIRA.png",
    category: "Nos Bases",
  },
  {
    id: "pancakes",
    name: "Pancakes",
    price: "30",
    description: "Stack de pancakes moelleux",
    image: "pancakestiramisu.png",
    category: "Nos Bases",
  },
];

// ── Signatures Salées ──
const SIGNATURES_SALEES: PosterProduct[] = [
  {
    id: "la-marrakchiya",
    name: "La Marrakchiya",
    price: "45",
    description:
      "Kefta maison, sauce tomate harissa, poivrons grillés, olives noires, coriandre",
    image: "marrakchia-pizza.png",
    category: "Pizza Waffles",
  },
  {
    id: "la-fesiya",
    name: "La Fesiya",
    price: "50",
    description:
      "Poulet confit, citrons confits, olives, fromage de chèvre, huile d'argan",
    image: "fesiya-pizza.png",
    category: "Pizza Waffles",
  },
  {
    id: "la-khli3",
    name: "La Khli3",
    price: "55",
    description:
      "Khli3 émincé, œuf mollet, poivrons rouges, fromage Hollandais",
    image: "khli-pizza.png",
    category: "Pizza Waffles",
  },
  {
    id: "la-boisee",
    name: "La Boisée",
    price: "45",
    description: "Poulet, mozzarella, poivron, pomme de terre, sauce gruyère",
    image: "wafflepizza.png",
    category: "Pizza Waffles",
  },
];

// ── Bases Salées ──
const BASES_SALEES: PosterProduct[] = [
  {
    id: "pizza-waffle",
    name: "Pizza Waffle",
    price: "35",
    description: "Gaufre croustillante façon pizza",
    image: "wafflepizza.png",
    category: "Bases Salées",
  },
  {
    id: "potato-waffle",
    name: "Potato Waffle",
    price: "35",
    description: "Gaufre de pomme de terre vapeur croustillante",
    image: "potatowaffle.png",
    category: "Bases Salées",
  },
];

// ── Cafés ──
const CAFES: PosterProduct[] = [
  {
    id: "espresso",
    name: "Espresso",
    price: "10",
    description: "Espresso corsé, extraction parfaite",
    image: "espresso.png",
    category: "Cafés",
  },
  {
    id: "double-espresso",
    name: "Double Espresso",
    price: "15",
    description: "Double dose d'espresso intense",
    image: "double-espresso.png",
    category: "Cafés",
  },
  {
    id: "americano",
    name: "Americano",
    price: "20",
    description: "Espresso allongé à l'eau chaude",
    image: "AMERICANOCHAUD.png",
    category: "Cafés",
  },
  {
    id: "lungo",
    name: "Lungo",
    price: "12",
    description: "Extraction longue, saveur douce et aromatique",
    image: "lungo.png",
    category: "Cafés",
  },
  {
    id: "ristretto",
    name: "Ristretto",
    price: "10",
    description: "Espresso court et concentré",
    image: "ristretto.png",
    category: "Cafés",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: "20-30",
    description: "Espresso, lait moussé, mousse onctueuse — S / M / L",
    image: "cappuccino.png",
    category: "Cafés",
  },
  {
    id: "latte",
    name: "Latte",
    price: "15-25",
    description: "Espresso doux noyé dans un lait soyeux — S / M / L",
    image: "latte.png",
    category: "Cafés",
  },
  {
    id: "cortado",
    name: "Cortado",
    price: "20",
    description: "Espresso coupé d'une touche de lait velouté",
    image: "cortado.png",
    category: "Cafés",
  },
  {
    id: "espresso-macchiato",
    name: "Espresso Macchiato",
    price: "18",
    description: "Espresso tacheté d'une pointe de mousse de lait",
    image: "espressomachiatto.png",
    category: "Cafés",
  },
  {
    id: "flat-white",
    name: "Flat White",
    price: "25",
    description: "Double espresso, micro-mousse de lait veloutée",
    image: "flatwhite.png",
    category: "Cafés",
  },
  {
    id: "cafe-au-lait",
    name: "Café au Lait",
    price: "15",
    description: "Café doux mélangé au lait chaud",
    image: "caféaulait.png",
    category: "Cafés",
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    price: "20",
    description: "Café infusé à froid pendant 12h, doux et rafraîchissant",
    image: "coldbrew.png",
    category: "Cafés",
  },
  {
    id: "cafe-glace",
    name: "Café Glacé",
    price: "20",
    description: "Espresso sur glace, léger et frais",
    image: "cafeglace.png",
    category: "Cafés",
  },
  {
    id: "frappe",
    name: "Frappé",
    price: "30",
    description: "Café glacé mixé, onctueux et crémeux",
    image: "frappé.png",
    category: "Cafés",
  },
  {
    id: "dalgona",
    name: "Ice Dalgona",
    price: "30",
    description: "Mousse de café fouetté sur lait glacé",
    image: "DALGONA.png",
    category: "Cafés",
  },
];

// ── Boissons Ice Lactées ──
const ICE_LATTES: PosterProduct[] = [
  {
    id: "iced-latte",
    name: "Iced Latte",
    price: "30",
    description: "Espresso sur glace avec lait frais",
    image: "icedlatté.png",
    category: "Ice Lactées",
  },
  {
    id: "ice-latte-caramel",
    name: "Ice Latte Caramel",
    price: "30",
    description: "Latte glacé au sirop de caramel onctueux",
    image: "icelattecaramel.png",
    category: "Ice Lactées",
  },
  {
    id: "ice-latte-noisette",
    name: "Ice Latte Noisette",
    price: "30",
    description: "Latte glacé au sirop de noisette",
    image: "icelattenoisette.png",
    category: "Ice Lactées",
  },
  {
    id: "ice-latte-vanille",
    name: "Ice Latte Vanille",
    price: "30",
    description: "Latte glacé à la vanille douce",
    image: "icelattevanille.png",
    category: "Ice Lactées",
  },
  {
    id: "ice-caramel-macchiato",
    name: "Ice Caramel Macchiato",
    price: "30",
    description: "Lait, espresso et caramel en couches sur glace",
    image: "icecaramelmachiato.png",
    category: "Ice Lactées",
  },
  {
    id: "ice-mocha",
    name: "Ice Mocha",
    price: "35",
    description: "Espresso, chocolat et lait glacé",
    image: "icemocha.png",
    category: "Ice Lactées",
  },
  {
    id: "ice-white-mocha",
    name: "Ice White Mocha",
    price: "35",
    description: "Espresso, chocolat blanc et lait glacé",
    image: "icewhitemocha.png",
    category: "Ice Lactées",
  },
  {
    id: "ice-matcha-latte",
    name: "Ice Matcha Latte",
    price: "40",
    description: "Matcha premium et lait frais sur glace",
    image: "icematchalatté.png",
    category: "Ice Lactées",
  },
  {
    id: "ice-chai-latte",
    name: "Ice Chai Latte",
    price: "30",
    description: "Thé chai épicé et lait glacé",
    image: "chailattéfroid.png",
    category: "Ice Lactées",
  },
];

// ── Boissons Spécialisées ──
const SPECIALITES: PosterProduct[] = [
  {
    id: "chocolat-chaud",
    name: "Chocolat Chaud",
    price: "30",
    description: "Chocolat fondant et lait moussé",
    image: "chocolatchaud.png",
    category: "Boissons Chaudes",
  },
  {
    id: "white-mocha",
    name: "White Mocha",
    price: "35",
    description: "Espresso, chocolat blanc, lait moussé",
    image: "whitemocha.png",
    category: "Boissons Chaudes",
  },
  {
    id: "matcha-latte",
    name: "Matcha Latte",
    price: "40",
    description: "Matcha premium japonais et lait velouté",
    image: "matchahot.png",
    category: "Boissons Chaudes",
  },
  {
    id: "chai-latte",
    name: "Chai Latte",
    price: "18",
    description: "Thé chai aux épices et lait moussé",
    image: "chailatté.png",
    category: "Boissons Chaudes",
  },
  {
    id: "the-menthe",
    name: "Thé à la Menthe",
    price: "10-15",
    description: "Thé vert à la menthe fraîche — Petit / Grand",
    image: "thémenthe.png",
    category: "Boissons Chaudes",
  },
];

// ── Milkshakes ──
const MILKSHAKES: PosterProduct[] = [
  {
    id: "milkshake-chocolat",
    name: "Milkshake Chocolat",
    price: "35",
    description: "Milkshake onctueux au chocolat",
    image: "milkshakechocolat.png",
    category: "Milkshakes",
  },
  {
    id: "milkshake-fraise",
    name: "Milkshake Fraise",
    price: "35",
    description: "Milkshake onctueux à la fraise",
    image: "milkshakefraise.png",
    category: "Milkshakes",
  },
  {
    id: "milkshake-vanille",
    name: "Milkshake Vanille",
    price: "35",
    description: "Milkshake onctueux à la vanille",
    image: "milkshakevanille.png",
    category: "Milkshakes",
  },
];

// ── Jus Frais ──
const JUS: PosterProduct[] = [
  {
    id: "jus-orange",
    name: "Jus d'Orange Frais",
    price: "10-20",
    description: "Oranges fraîchement pressées — 25cl / 40cl / 50cl",
    image: "jusdorange.png",
    category: "Jus Frais",
  },
  {
    id: "jus-carotte-orange",
    name: "Jus Carotte Orange",
    price: "15-40",
    description: "Carotte et orange pressées — 25cl / 50cl / 1L",
    image: "carotorangejuice.png",
    category: "Jus Frais",
  },
];

// ── Shots Vitaminés ──
const SHOTS: PosterProduct[] = [
  {
    id: "shot-betterave",
    name: "Shot Betterave Boost",
    price: "26",
    description: "Betterave, pomme, citron, gingembre — Énergie",
    image: "shotbetterave.png",
    category: "Shots Vitaminés",
  },
  {
    id: "shot-vert-detox",
    name: "Shot Vert Détox",
    price: "28",
    description: "Concombre, céleri, citron, menthe, spiruline — Détox",
    image: "shotvertdetox.png",
    category: "Shots Vitaminés",
  },
  {
    id: "shot-lait-dor",
    name: "Shot Lait d'Or",
    price: "28",
    description: "Lait de coco, curcuma, gingembre, cannelle — Golden Milk",
    image: "shotlaidor.png",
    category: "Shots Vitaminés",
  },
  {
    id: "shot-curcuma-mangue",
    name: "Shot Mangue Curcuma",
    price: "28",
    description: "Mangue, orange, curcuma, lait de coco — Tropical",
    image: "shotcurcumamangue.png",
    category: "Shots Vitaminés",
  },
  {
    id: "shot-ananas-coco",
    name: "Shot Coco Ananas",
    price: "27",
    description: "Eau de coco, ananas, citron, gingembre — Immunité",
    image: "shotananascoco.png",
    category: "Shots Vitaminés",
  },
  {
    id: "shot-wheatgrass",
    name: "Shot Wheatgrass",
    price: "30",
    description: "Herbe de blé, pomme, citron, spiruline — Détox",
    image: "SHOTWHEATGRASS.png",
    category: "Shots Vitaminés",
  },
  {
    id: "shot-gingembre-menthe",
    name: "Shot Gingembre Menthe",
    price: "25",
    description: "Citron, gingembre, menthe, pomme, miel — Digestion",
    image: "shotginmenthecitron.png",
    category: "Shots Vitaminés",
  },
  {
    id: "shot-cayenne",
    name: "Shot Cayenne Fire",
    price: "24",
    description: "Citron, sirop d'érable, cayenne — Métabolisme",
    image: "shotcayenne.png",
    category: "Shots Vitaminés",
  },
  {
    id: "shot-orange-curcuma",
    name: "Shot Orange Curcuma",
    price: "25",
    description: "Orange, carotte, curcuma, gingembre — Vitamine C",
    image: "shotorangecurcar.png",
    category: "Shots Vitaminés",
  },
  {
    id: "shot-spiruline",
    name: "Shot Protéine Verte",
    price: "35",
    description: "Lait d'amande, spiruline, épinards, chia — Protéines",
    image: "shotspiruline.png",
    category: "Shots Vitaminés",
  },
];

export const ALL_PRODUCTS: PosterProduct[] = [
  ...SIGNATURES_SUCREES,
  ...BASES,
  ...SIGNATURES_SALEES,
  ...BASES_SALEES,
  ...CAFES,
  ...ICE_LATTES,
  ...SPECIALITES,
  ...MILKSHAKES,
  ...JUS,
  ...SHOTS,
];

export const getProduct = (id: string): PosterProduct | undefined =>
  ALL_PRODUCTS.find((p) => p.id === id);
