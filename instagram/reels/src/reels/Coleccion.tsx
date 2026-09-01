import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import {
  Fondo, Banda, Escudo, Botella, Filete,
  DISPLAY, CASA, SANS, ORO, MARFIL, MUDO, entra, pasa,
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
 * Reel 01 — la escala de la colección.
 *
 * La cifra hace de anzuelo: aparece sola, sin contexto, y recién después se
 * revela de qué son esas trescientas veintitrés unidades. El conteo se frena
 * antes del final del plano para que el número quede quieto y legible; un
 * contador que termina justo al cortar no se llega a leer.
 */
export const Coleccion: React.FC = () => {
  const f = useCurrentFrame();

  const cifra = Math.round(
    interpolate(f, [18, 96], [0, 323], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

  return (
    <Fondo>
      <Banda cual="La colección" derecha="Buenos Aires" o={entra(f, 6)} />

      {/* 01 · la cifra sola */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: pasa(f, 10, 150, 16),
        }}
      >
        <div
          style={{
            fontFamily: DISPLAY,
            fontStyle: "italic",
            fontSize: 400,
            lineHeight: 0.8,
            color: ORO,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {cifra}
        </div>
        <div style={{ marginTop: 46, opacity: entra(f, 100) }}>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 26,
              letterSpacing: "0.42em",
              textTransform: "uppercase",
              color: MUDO,
            }}
          >
            Piezas en exhibición
          </div>
        </div>
      </AbsoluteFill>

      {/* 02 · la grilla */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: pasa(f, 152, 292, 18),
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
            width: 840,
            placeItems: "center",
          }}
        >
          {GRILLA.map((b, i) => (
            <Botella
              key={b}
              clave={b}
              alto={300}
              /* Escalonadas de a dos frames: la grilla se arma sola en vez de
                 aparecer entera de golpe. */
              o={entra(f, 158 + i * 3, 20)}
              y={(1 - entra(f, 158 + i * 3, 22)) * 26}
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
          opacity: pasa(f, 296, 400, 18),
        }}
      >
        <div style={{ fontFamily: CASA, fontSize: 40, letterSpacing: "0.2em", color: MARFIL }}>
          CURAMOS
        </div>
        <div style={{ margin: "34px 0" }}>
          <Filete progreso={entra(f, 312, 26)} ancho={300} />
        </div>
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: 78,
            lineHeight: 1.16,
            color: MARFIL,
          }}
        >
          No surtimos una góndola.
          <br />
          <span style={{ fontStyle: "italic", color: ORO }}>Armamos una cava.</span>
        </div>
        <div
          style={{
            marginTop: 44,
            fontFamily: SANS,
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: MUDO,
            opacity: entra(f, 336),
          }}
        >
          Consultas por mensaje directo
        </div>
      </AbsoluteFill>

      <Escudo o={entra(f, 300, 30)} />
    </Fondo>
  );
};
