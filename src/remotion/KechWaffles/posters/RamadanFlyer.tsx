import { AbsoluteFill, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";
import { loadFont as loadCairo } from "@remotion/google-fonts/Cairo";
import QRCode from "react-qr-code";

const { fontFamily } = loadFont("normal", {
  weights: ["300", "400", "600", "700", "800", "900"],
  subsets: ["latin", "latin-ext"],
});

const { fontFamily: cairo } = loadCairo("normal", {
  weights: ["400", "700"],
  subsets: ["arabic"],
});

const GOLD = "#F8B50D";
const RAMADAN_GREEN = "#1B5E20";
const TEXT_LIGHT = "#FAFAF2";
const LOGO = "kech-waffles/Transparent Gold White.png";
const GOOGLE_MAPS_URL = "https://share.google/W68YmHJ2bIQGm8grw";

// A5 at 300 DPI: 148mm × 210mm → 1748 × 2480 px
export const FLYER_WIDTH = 1748;
export const FLYER_HEIGHT = 2480;

export const RamadanFlyer: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: RAMADAN_GREEN,
        fontFamily,
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow behind products */}
      <div
        style={{
          position: "absolute",
          top: "35%",
          left: "50%",
          width: 1400,
          height: 1400,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${GOLD}10 0%, transparent 70%)`,
        }}
      />

      {/* Gold border - top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
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
          height: 6,
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        }}
      />

      {/* Gold corner accents */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 80,
          height: 80,
          borderTop: `4px solid ${GOLD}`,
          borderLeft: `4px solid ${GOLD}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          width: 80,
          height: 80,
          borderTop: `4px solid ${GOLD}`,
          borderRight: `4px solid ${GOLD}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          width: 80,
          height: 80,
          borderBottom: `4px solid ${GOLD}`,
          borderLeft: `4px solid ${GOLD}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          width: 80,
          height: 80,
          borderBottom: `4px solid ${GOLD}`,
          borderRight: `4px solid ${GOLD}`,
        }}
      />

      {/* Logo watermark */}
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
          style={{ height: 1000, objectFit: "contain" }}
        />
      </div>

      {/* ── Content ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 70,
          paddingBottom: 70,
        }}
      >
        {/* Logo */}
        <Img
          src={staticFile(LOGO)}
          style={{
            width: 360,
            height: 360,
            objectFit: "contain",
          }}
        />

        {/* Ramadan Badge */}
        <div
          style={{
            backgroundColor: GOLD,
            borderRadius: 25,
            paddingTop: 10,
            paddingBottom: 14,
            paddingLeft: 60,
            paddingRight: 60,
            marginTop: 25,
          }}
        >
          <span
            style={{
              fontFamily: cairo,
              fontSize: 44,
              fontWeight: 700,
              color: RAMADAN_GREEN,
            }}
          >
            رمضان مبارك
          </span>
        </div>

        {/* Title FR */}
        <span
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: TEXT_LIGHT,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginTop: 30,
            textAlign: "center",
          }}
        >
          Spécial Ramadan
        </span>

        {/* Title AR */}
        <span
          style={{
            fontFamily: cairo,
            fontSize: 48,
            fontWeight: 400,
            color: GOLD,
            marginTop: 5,
            textAlign: "center",
          }}
        >
          سبيسيال رمضان
        </span>

        {/* Subtitle */}
        <span
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: GOLD,
            letterSpacing: 3,
            textTransform: "uppercase",
            marginTop: 12,
            textAlign: "center",
          }}
        >
          Kunefe, Borek & Jus Frais
        </span>

        {/* Gold separator */}
        <div
          style={{
            width: 200,
            height: 3,
            backgroundColor: GOLD,
            marginTop: 25,
            marginBottom: 25,
          }}
        />

        {/* Products side by side — 3 items */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 35,
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100%",
            paddingLeft: 60,
            paddingRight: 60,
          }}
        >
          {/* Kunefe */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 430,
                height: 430,
                borderRadius: 20,
                border: `4px solid ${GOLD}`,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            >
              <Img
                src={staticFile("kech-waffles/kunefe.png")}
                style={{
                  width: 430,
                  height: 430,
                  objectFit: "cover",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: TEXT_LIGHT,
                marginTop: 16,
                textAlign: "center",
              }}
            >
              Kunefe
            </span>
            <span
              style={{
                fontFamily: cairo,
                fontSize: 32,
                color: GOLD,
                marginTop: 2,
                textAlign: "center",
              }}
            >
              كنافة
            </span>
          </div>

          {/* Borek */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 430,
                height: 430,
                borderRadius: 20,
                border: `4px solid ${GOLD}`,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            >
              <Img
                src={staticFile("kech-waffles/borek2.png")}
                style={{
                  width: 430,
                  height: 430,
                  objectFit: "cover",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 40,
                fontWeight: 700,
                color: TEXT_LIGHT,
                marginTop: 16,
                textAlign: "center",
              }}
            >
              Borek
            </span>
            <span
              style={{
                fontFamily: cairo,
                fontSize: 32,
                color: GOLD,
                marginTop: 2,
                textAlign: "center",
              }}
            >
              بوريك
            </span>
          </div>

          {/* Jus Carotte Orange */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 430,
                height: 430,
                borderRadius: 20,
                border: `4px solid ${GOLD}`,
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
            >
              <Img
                src={staticFile("kech-waffles/carotorangejuice.png")}
                style={{
                  width: 430,
                  height: 430,
                  objectFit: "cover",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: TEXT_LIGHT,
                marginTop: 16,
                textAlign: "center",
                lineHeight: 1.2,
              }}
            >
              Jus Carotte{"\n"}Orange
            </span>
            <span
              style={{
                fontFamily: cairo,
                fontSize: 32,
                color: GOLD,
                marginTop: 2,
                textAlign: "center",
              }}
            >
              عصير جزر وبرتقال
            </span>
          </div>
        </div>

        {/* Gold separator */}
        <div
          style={{
            width: 200,
            height: 3,
            backgroundColor: GOLD,
            marginTop: 35,
            marginBottom: 30,
          }}
        />

        {/* "À partir de 10 DH" */}
        <div
          style={{
            backgroundColor: "rgba(248, 181, 13, 0.15)",
            border: `3px solid ${GOLD}`,
            borderRadius: 20,
            paddingTop: 18,
            paddingBottom: 22,
            paddingLeft: 70,
            paddingRight: 70,
            marginBottom: 25,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                fontSize: 38,
                fontWeight: 600,
                color: TEXT_LIGHT,
              }}
            >
              À partir de
            </span>
            <span
              style={{
                fontSize: 72,
                fontWeight: 900,
                color: GOLD,
                lineHeight: 1,
              }}
            >
              10
            </span>
            <span
              style={{
                fontSize: 38,
                fontWeight: 600,
                color: GOLD,
              }}
            >
              DH
            </span>
          </div>
        </div>

        {/* Ramadan slogan */}
        <span
          style={{
            fontFamily: cairo,
            fontSize: 40,
            color: GOLD,
            textAlign: "center",
            marginBottom: 8,
          }}
        >
          فطورك بنين معانا!
        </span>
        <span
          style={{
            fontSize: 32,
            fontWeight: 300,
            color: "rgba(250, 250, 242, 0.7)",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Votre ftour, délicieux avec nous !
        </span>

        {/* QR Code section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              backgroundColor: TEXT_LIGHT,
              borderRadius: 16,
              padding: 18,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCode
              value={GOOGLE_MAPS_URL}
              size={300}
              fgColor={RAMADAN_GREEN}
              bgColor={TEXT_LIGHT}
              level="M"
            />
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: GOLD,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Scan Me
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "rgba(250, 250, 242, 0.6)",
            }}
          >
            Kech Waffles Marrakech
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
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
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(250, 250, 242, 0.5)",
          }}
        >
          @kech_waffles
        </span>
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            backgroundColor: GOLD,
          }}
        />
        <span
          style={{
            fontSize: 22,
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
