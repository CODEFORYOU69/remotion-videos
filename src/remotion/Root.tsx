import { Composition, Folder, Still } from "remotion";
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import { Main } from "./MyComp/Main";
import { NextLogo } from "./MyComp/NextLogo";
import { SmokybillLogo } from "./SmokybillLogo/SmokybillLogo";
import {
  KechWafflesMenu,
  KECH_MENU_DURATION,
} from "./KechWaffles/KechWafflesMenu";
import {
  RamadanSpecial,
  RAMADAN_DURATION,
} from "./KechWaffles/RamadanSpecial";
import {
  RamadanSpecialReel,
  RAMADAN_REEL_DURATION,
} from "./KechWaffles/RamadanSpecialReel";
import {
  KechWafflesMenuReel,
  KECH_MENU_REEL_DURATION,
} from "./KechWaffles/KechWafflesMenuReel";

// ── Reels templates ──
import {
  ProductSpotlight,
  SPOTLIGHT_DURATION,
} from "./KechWaffles/reels/templates/ProductSpotlight";
import {
  TopProducts,
  TOP_PRODUCTS_DURATION,
} from "./KechWaffles/reels/templates/TopProducts";
import { POVReel, POV_DURATION } from "./KechWaffles/reels/templates/POVReel";
import {
  Montage,
  MONTAGE_DURATION,
} from "./KechWaffles/reels/templates/Montage";
import {
  DailySpecial,
  DAILY_SPECIAL_DURATION,
} from "./KechWaffles/reels/templates/DailySpecial";

// ── Reels config ──
import { REEL } from "./KechWaffles/reels/config/brand";
import {
  productSpotlightSchema,
  topProductsSchema,
  povReelSchema,
  montageSchema,
  dailySpecialSchema,
} from "./KechWaffles/reels/config/types";
import {
  DEFAULT_SPOTLIGHT_PROPS,
  DEFAULT_TOP_PRODUCTS_PROPS,
  DEFAULT_POV_PROPS,
  DEFAULT_MONTAGE_PROPS,
  DEFAULT_DAILY_SPECIAL_PROPS,
} from "./KechWaffles/reels/config/assets";

// ── Posters ──
import {
  ProductPoster,
  POSTER_WIDTH,
  POSTER_HEIGHT,
} from "./KechWaffles/posters/ProductPoster";
import { ALL_PRODUCTS } from "./KechWaffles/posters/products";
import {
  RamadanFlyer,
  FLYER_WIDTH,
  FLYER_HEIGHT,
} from "./KechWaffles/posters/RamadanFlyer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Smokybill">
        <Composition
          id="SmokybillLogo"
          component={SmokybillLogo}
          durationInFrames={240}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="Kech-Waffles">
        <Composition
          id="KechWafflesMenu"
          component={KechWafflesMenu}
          durationInFrames={KECH_MENU_DURATION}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="RamadanSpecial"
          component={RamadanSpecial}
          durationInFrames={RAMADAN_DURATION}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="Kech-Waffles-Reels">
        <Composition
          id="KechWafflesMenuReel"
          component={KechWafflesMenuReel}
          durationInFrames={KECH_MENU_REEL_DURATION}
          fps={REEL.fps}
          width={REEL.width}
          height={REEL.height}
        />
        <Composition
          id="RamadanSpecialReel"
          component={RamadanSpecialReel}
          durationInFrames={RAMADAN_REEL_DURATION}
          fps={REEL.fps}
          width={REEL.width}
          height={REEL.height}
        />
        <Composition
          id="ProductSpotlight"
          component={ProductSpotlight}
          durationInFrames={SPOTLIGHT_DURATION}
          fps={REEL.fps}
          width={REEL.width}
          height={REEL.height}
          schema={productSpotlightSchema}
          defaultProps={DEFAULT_SPOTLIGHT_PROPS}
        />
        <Composition
          id="TopProducts"
          component={TopProducts}
          durationInFrames={TOP_PRODUCTS_DURATION}
          fps={REEL.fps}
          width={REEL.width}
          height={REEL.height}
          schema={topProductsSchema}
          defaultProps={DEFAULT_TOP_PRODUCTS_PROPS}
        />
        <Composition
          id="POVReel"
          component={POVReel}
          durationInFrames={POV_DURATION}
          fps={REEL.fps}
          width={REEL.width}
          height={REEL.height}
          schema={povReelSchema}
          defaultProps={DEFAULT_POV_PROPS}
        />
        <Composition
          id="Montage"
          component={Montage}
          durationInFrames={MONTAGE_DURATION}
          fps={REEL.fps}
          width={REEL.width}
          height={REEL.height}
          schema={montageSchema}
          defaultProps={DEFAULT_MONTAGE_PROPS}
        />
        <Composition
          id="DailySpecial"
          component={DailySpecial}
          durationInFrames={DAILY_SPECIAL_DURATION}
          fps={REEL.fps}
          width={REEL.width}
          height={REEL.height}
          schema={dailySpecialSchema}
          defaultProps={DEFAULT_DAILY_SPECIAL_PROPS}
        />
      </Folder>
      <Folder name="Kech-Waffles-Posters">
        {ALL_PRODUCTS.map((product) => (
          <Still
            key={product.id}
            id={`Poster-${product.id}`}
            component={ProductPoster}
            width={POSTER_WIDTH}
            height={POSTER_HEIGHT}
            defaultProps={{ product }}
          />
        ))}
        <Still
          id="RamadanFlyer-A5"
          component={RamadanFlyer}
          width={FLYER_WIDTH}
          height={FLYER_HEIGHT}
        />
      </Folder>
      <Folder name="Default">
        <Composition
          id={COMP_NAME}
          component={Main}
          durationInFrames={DURATION_IN_FRAMES}
          fps={VIDEO_FPS}
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          defaultProps={defaultMyCompProps}
        />
        <Composition
          id="NextLogo"
          component={NextLogo}
          durationInFrames={300}
          fps={30}
          width={140}
          height={140}
          defaultProps={{
            outProgress: 0,
          }}
        />
      </Folder>
    </>
  );
};
