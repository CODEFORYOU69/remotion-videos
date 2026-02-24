import { z } from "zod";

const clipSchema = z.string().describe("Filename in videokech/");

// ── Template prop schemas (no product photos, no prices — video-only) ──

export const productSpotlightSchema = z.object({
  clips: z.array(clipSchema).min(1),
  catchyText: z.string(),
  audioClip: z.string().optional(),
});
export type ProductSpotlightProps = z.infer<typeof productSpotlightSchema>;

export const topProductsSchema = z.object({
  clips: z.array(clipSchema).min(3),
  title: z.string(),
  labels: z.array(z.string()).min(3),
  audioClip: z.string().optional(),
});
export type TopProductsProps = z.infer<typeof topProductsSchema>;

export const povReelSchema = z.object({
  povText: z.string(),
  clips: z.array(clipSchema).min(1),
  audioClip: z.string().optional(),
});
export type POVReelProps = z.infer<typeof povReelSchema>;

export const montageSchema = z.object({
  clips: z.array(clipSchema).min(3),
  textOverlays: z.array(z.string()).min(3),
  audioClip: z.string().optional(),
});
export type MontageProps = z.infer<typeof montageSchema>;

export const dailySpecialSchema = z.object({
  clips: z.array(clipSchema).min(1),
  specialText: z.string(),
  ctaText: z.string(),
  audioClip: z.string().optional(),
});
export type DailySpecialProps = z.infer<typeof dailySpecialSchema>;
