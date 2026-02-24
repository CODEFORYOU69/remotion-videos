const BASE_HASHTAGS = "#kechwaffles #marrakech #fyp #viral #gaufres #waffles #morocco #foodie #tiktokfood #foryou";

export function spotlightCaption(productName: string): string {
  return `${productName} 🧇🔥 La gaufre qui fait sensation à Marrakech!\n\nViens goûter chez Kech Waffles 📍\n\n${BASE_HASHTAGS} #${productName.replace(/\s+/g, "").toLowerCase()}`;
}

export function topProductsCaption(title: string): string {
  return `${title} 🏆 Tu préfères laquelle? Dis-le en commentaire! 👇\n\n📍 Kech Waffles Marrakech\n\n${BASE_HASHTAGS} #top3 #classement`;
}

export function povCaption(povText: string): string {
  return `POV: ${povText} 😍\n\n📍 Kech Waffles Marrakech\n\n${BASE_HASHTAGS} #pov #povtiktok`;
}

export function montageCaption(): string {
  return `Kech Waffles, c'est pas juste des gaufres... c'est une vibe 🧇✨\n\n📍 Marrakech\n\n${BASE_HASHTAGS} #montage #vibes`;
}

export function dailySpecialCaption(productName: string, discount?: string): string {
  const discountLine = discount ? `\n${discount} aujourd'hui seulement! ⏰` : "";
  return `OFFRE DU JOUR: ${productName} 🔥${discountLine}\n\nViens profiter chez Kech Waffles 📍\n\n${BASE_HASHTAGS} #offredujour #promo`;
}
