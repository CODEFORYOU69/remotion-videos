// ── Video clips catalog (14 clips in videokech/) ──
// Descriptive filenames = content description

export const CLIPS = {
  // Boissons / Drinks
  cold_brew_caramel: "cold-brew-caramel.mp4",
  espresso_montee: "espresso-deja-montee.mp4",
  espresso_1: "preparationespresso1.mp4",
  espresso_2: "preparation-espresso-2.mp4",
  espresso_3: "preparation-espresso-3.mp4",
  espresso_4: "preparation-espresso-4.mp4",

  // Ambiance / Restaurant
  interieur_bar: "kech waffle interieur bar.mp4",
  devanture_1: "kech waffles devanture.mp4",
  devanture_2: "kech waffles devanture 2.mp4",

  // Food preparation
  pancakes_amlou: "pancakes-amlou.mp4",
  pizza_boisee: "pizzawaffle-mix boisée et .mp4",
  coupage_fraise: "preparation-coupage-fraise.mp4",

  // Remplissage / Filling
  can_chocolat_pistache: "remplissage can frais chocolat pistache.mp4",
  can_chocolat_fraise: "remplissage-chocolat-can-fraise.mp4",
} as const;

// ── All clip filenames as array (for easy iteration) ──
export const ALL_CLIPS = Object.values(CLIPS);

// ── Audio catalog ──
export const AUDIO_CLIPS = {
  trois_frangins: "3Frangins.wav",
  sans_patattes: "SansPatattes.wav",
  agneau: "Agneau.mp3",
  egyptien: "Egyptien.mp3",
  ca_sent_bon: "Ca-sent-bon!-Mmmmh!-Mmmmh!-Mmmmh.mp3",
  il_est_bon: "Il-est-bon-Ma-mere-faisait-le-cafe-de-cette-facon-Chaud-fort-et-bon.mp3",
  nourrir_millions: "moi-je-nourris-des-millions-de-personnes!-et-demain-demain!-je-nourrirai-peut-etre-la-terre-entiere!.mp3",
  quatre_saisons: "ca-sent-les-quatsaisons-ca-sent-la-Terre-la-terrrrre-la-TERRRRRE-La-Denrrrree.mp3",
  maman: "Maman-cest-sur-elle-a-toujours-voulu-etre-Maman-Dailleurs-pour-moi-cest-tres-bien-Tu-mas-fait-peur.mp3",
  argent_honnete: "n'ayez-pas-peur-madame-c'est-de-l'argent-honnete-et-honnetement-gagne.mp3",
} as const;

// ── Background music filename (place in public/audio/) ──
export const BG_MUSIC = "bg-music-moroccan.mp3";

// ── Default props for each template ──
// Each template uses DIFFERENT clips to create variety

export const DEFAULT_SPOTLIGHT_PROPS = {
  clips: [
    CLIPS.coupage_fraise,
    CLIPS.pancakes_amlou,
    CLIPS.can_chocolat_pistache,
  ],
  catchyText: "LA GAUFRE QUI FAIT RÊVER...",
  audioClip: AUDIO_CLIPS.ca_sent_bon,
};

export const DEFAULT_TOP_PRODUCTS_PROPS = {
  clips: [
    CLIPS.pizza_boisee,
    CLIPS.can_chocolat_fraise,
    CLIPS.espresso_montee,
  ],
  title: "TOP 3 KECH WAFFLES",
  labels: ["LE SALÉ", "LE SUCRÉ", "LE CAFÉ"],
  audioClip: AUDIO_CLIPS.trois_frangins,
};

export const DEFAULT_POV_PROPS = {
  povText: "tu découvres Kech Waffles pour la première fois...",
  clips: [
    CLIPS.devanture_1,
    CLIPS.interieur_bar,
    CLIPS.coupage_fraise,
    CLIPS.pancakes_amlou,
    CLIPS.cold_brew_caramel,
  ],
  audioClip: AUDIO_CLIPS.ca_sent_bon,
};

export const DEFAULT_MONTAGE_PROPS = {
  clips: [
    CLIPS.devanture_2,
    CLIPS.interieur_bar,
    CLIPS.espresso_1,
    CLIPS.coupage_fraise,
    CLIPS.can_chocolat_pistache,
    CLIPS.pancakes_amlou,
  ],
  textOverlays: ["LE GOÛT", "L'AMBIANCE", "LE CAFÉ", "LA FRAÎCHEUR", "LE PLAISIR", "KECH WAFFLES"],
  audioClip: AUDIO_CLIPS.nourrir_millions,
};

export const DEFAULT_DAILY_SPECIAL_PROPS = {
  clips: [
    CLIPS.espresso_2,
    CLIPS.can_chocolat_fraise,
    CLIPS.pizza_boisee,
  ],
  specialText: "OFFRE DU JOUR",
  ctaText: "Viens goûter!",
  audioClip: AUDIO_CLIPS.il_est_bon,
};
