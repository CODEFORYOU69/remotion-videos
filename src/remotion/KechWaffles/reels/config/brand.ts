import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

export const FONT_FAMILY = fontFamily;

// ── Colors ──
export const BRAND = {
  gold: "#F8B50D",
  goldLight: "#FFD54F",
  dark: "#171D14",
  darkOverlay: "rgba(23, 29, 20, 0.65)",
  textLight: "#FAFAF2",
  textMuted: "rgba(250, 250, 242, 0.7)",
  white: "#FFFFFF",
} as const;

// ── Reel dimensions (9:16 vertical) ──
export const REEL = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

// ── Spring presets ──
export const SPRINGS = {
  slam: { damping: 12, stiffness: 200, mass: 0.8 },
  bouncy: { damping: 15, stiffness: 100 },
  smooth: { damping: 200 },
  snappy: { damping: 20, stiffness: 180 },
} as const;

// ── Logo path ──
export const LOGO_PATH = "kech-waffles/Transparent Gold White.png";

// ── Google link ──
export const GOOGLE_LINK = {
  url: "https://share.google/W68YmHJ2bIQGm8grw",
  displayText: "Kech Waffles Marrakech",
} as const;
