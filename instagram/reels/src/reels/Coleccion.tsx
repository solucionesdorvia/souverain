import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import {
  Fondo, Banda, Escudo, Botella, Filete, Barrido, Cortina, Vineta,
  DISPLAY, SANS, ORO, MARFIL, MUDO, entra, pasa,
} from "../mundo";

/* Doce botellas en tres columnas. Se eligieron mirándolas una por una, no por
   marca ni por proporción: varios packshots del catálogo traen la caja al lado
   (Glenlivet, Chivas, Scapa Skiren) o son un recorte de la etiqueta en vez de
   la botella entera (Monkey 47), y en una grilla repetida eso salta. */
const GRILLA = [
  "dp-2013", "krug-gc", "vc-yellow",
  "moet-gv-2013", "pj-belle-epoque", "mumm-cordon-rouge",
  "hennessy-vsop", "hennessy-vs", "scapa-glansa",
  "longmorn-dc", "malfy-originale", "absolut-elyx",
];

/**
 * Reel 01 — qué clase de casa es Souverain.
 *
 * La versión anterior arrancaba contando piezas del catálogo. Se cayó el
 * recurso: el número se vence en cuanto entra una tanda nueva, y nadie sabe
 * cuánto tiempo se sostiene. Ahora el anzuelo es una sola botella revelada por
 * la luz y una frase que no caduca, y la grilla llega después como prueba de
 * que detrás de esa botella hay muchas más.
 */
export const Coleccion: React.FC = () => {
  const f = useCurrentFrame();
  const luzApertura = interpolate(f, [16, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Fondo>
      <Banda cual="La colección" derecha="Buenos Aires" o={entra(f, 8)} />

      {/* 01 · una sola botella, revelada por la luz */}
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", opacity: pasa(f, 10, 168, 22) }}
      >
        <div style={{ position: "relative", marginBottom: 210 }}>
          <Botella clave="dp-2013" alto={1240} escala={1 + f * 0.00016} />
          <Barrido clave="dp-2013" avance={luzApertura} alto={1240} fuerza={1.15} />
        </div>
        <div style={{ position: "absolute", bottom: 372, left: 0, right: 0, textAlign: "center" }}>
          <Cortina p={entra(f, 78, 30)}>
            <div
              style={{
                fontFamily: DISPLAY,
                fontStyle: "italic",
                fontSize: 104,
                lineHeight: 1.06,
                letterSpacing: "-0.015em",
                color: MARFIL,
              }}
            >
              Una botella entra
            </div>
          </Cortina>
          <Cortina p={entra(f, 96, 30)} style={{ marginTop: 6 }}>
            <div
              style={{
                fontFamily: DISPLAY,
                fontStyle: "italic",
                fontSize: 104,
                lineHeight: 1.06,
                letterSpacing: "-0.015em",
                color: ORO,
              }}
            >
              o no entra.
            </div>
          </Cortina>
        </div>
      </AbsoluteFill>

      {/* 02 · la grilla */}
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center", opacity: pasa(f, 172, 342, 24) }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 44,
            width: 880,
            placeItems: "center",
          }}
        >
          {GRILLA.map((b, i) => (
            <Botella
              key={b}
              clave={b}
              alto={318}
              /* Escalonadas: la grilla se arma sola en vez de aparecer entera
                 de golpe, y el ojo alcanza a recorrerla. */
              o={entra(f, 180 + i * 5, 26)}
              y={(1 - entra(f, 180 + i * 5, 28)) * 30}
            />
          ))}
        </div>
      </AbsoluteFill>

      {/* 03 · el remate */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 110,
          paddingRight: 110,
          textAlign: "center",
          opacity: pasa(f, 348, 470, 24),
        }}
      >
        <Cortina p={entra(f, 356, 32)}>
          <div style={{ fontFamily: DISPLAY, fontSize: 88, lineHeight: 1.16, color: MARFIL, letterSpacing: "-0.02em" }}>
            No surtimos una góndola.
          </div>
        </Cortina>
        <Cortina p={entra(f, 376, 32)} style={{ marginTop: 4 }}>
          <div
            style={{
              fontFamily: DISPLAY,
              fontStyle: "italic",
              fontSize: 88,
              lineHeight: 1.16,
              color: ORO,
              letterSpacing: "-0.02em",
            }}
          >
            Armamos una cava.
          </div>
        </Cortina>
        <div style={{ margin: "44px 0" }}>
          <Filete progreso={entra(f, 398, 34)} ancho={300} />
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: MUDO,
            opacity: entra(f, 412, 26),
          }}
        >
          Consultas por mensaje directo
        </div>
      </AbsoluteFill>

      <Vineta />
      <Escudo o={entra(f, 352, 34)} />
    </Fondo>
  );
};
