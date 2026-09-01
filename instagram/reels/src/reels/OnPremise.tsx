import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  Fondo, Banda, Escudo, Filete, Cortina, Vineta,
  DISPLAY, CASA, SANS, ORO, MARFIL, MUDO, entra, pasa,
} from "../mundo";

const BEATS = [
  { titulo: "Carta curada", texto: "Diseñamos la carta de bebidas según la cocina y el ticket del salón." },
  { titulo: "Asesor asignado", texto: "Un sommelier fijo para la cuenta. Sin pasar por un call center." },
  { titulo: "Acceso prioritario", texto: "Las asignaciones cortas se ofrecen primero a las cuentas On Premise." },
  { titulo: "Entrega programada", texto: "CABA y GBA, con control de temperatura para lo que lo necesita." },
];

/**
 * Reel 04 — la propuesta On Premise.
 *
 * Es el único de los cuatro sin una sola botella: le habla a un dueño de salón,
 * y a ése no lo convence una foto de producto sino saber qué le resuelven.
 *
 * Cada beat dura 126 frames, poco más de cuatro segundos. Son dos frases por
 * plano y hay que poder leerlas sin rebobinar; a 2,4 segundos, que era el
 * ritmo anterior, la segunda se cortaba a la mitad.
 *
 * Los números 01–04 que encabezaban cada beat salieron: no aportaban nada que
 * el propio orden no dijera, y ocupaban el lugar más visible del cuadro.
 */
export const OnPremise: React.FC = () => {
  const f = useCurrentFrame();
  const INICIO = 132;
  const POR = 126;
  const fin = INICIO + BEATS.length * POR;

  return (
    <Fondo>
      <Banda cual="On Premise" derecha="Bares · Restaurantes · Hoteles" o={entra(f, 8)} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingLeft: 100,
          paddingRight: 100,
          opacity: pasa(f, 10, INICIO, 22),
        }}
      >
        <Cortina p={entra(f, 16, 32)}>
          <div style={{ fontFamily: DISPLAY, fontSize: 104, lineHeight: 1.12, color: MARFIL, letterSpacing: "-0.02em" }}>
            Si tenés un salón,
          </div>
        </Cortina>
        <Cortina p={entra(f, 40, 32)} style={{ marginTop: 4 }}>
          <div
            style={{
              fontFamily: DISPLAY,
              fontStyle: "italic",
              fontSize: 104,
              lineHeight: 1.12,
              color: ORO,
              letterSpacing: "-0.02em",
            }}
          >
            no comprás botellas.
          </div>
        </Cortina>
        <div style={{ margin: "46px 0" }}>
          <Filete progreso={entra(f, 66, 34)} ancho={300} />
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 26,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: MUDO,
            opacity: entra(f, 80, 26),
          }}
        >
          Armás una carta
        </div>
      </AbsoluteFill>

      {BEATS.map((b, i) => {
        const desde = INICIO + i * POR;
        const o = pasa(f, desde, desde + POR, 18);
        if (o <= 0.001) return null;
        return (
          <AbsoluteFill
            key={b.titulo}
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingLeft: 110,
              paddingRight: 110,
              opacity: o,
            }}
          >
            <Cortina p={entra(f, desde + 8, 30)}>
              <div
                style={{
                  fontFamily: CASA,
                  fontSize: 56,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: MARFIL,
                  lineHeight: 1.2,
                }}
              >
                {b.titulo}
              </div>
            </Cortina>
            <div style={{ margin: "40px 0" }}>
              <Filete progreso={entra(f, desde + 26, 32)} ancho={200} />
            </div>
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 62,
                lineHeight: 1.36,
                color: MUDO,
                maxWidth: 820,
                opacity: entra(f, desde + 34, 28),
              }}
            >
              {b.texto}
            </div>
          </AbsoluteFill>
        );
      })}

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingLeft: 110,
          paddingRight: 110,
          opacity: pasa(f, fin + 4, fin + 150, 22),
        }}
      >
        <Cortina p={entra(f, fin + 12, 30)}>
          <div style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: 122, color: ORO, letterSpacing: "-0.015em" }}>
            Abrí la cuenta
          </div>
        </Cortina>
        <div style={{ margin: "42px 0" }}>
          <Filete progreso={entra(f, fin + 34, 34)} ancho={280} />
        </div>
        <div style={{ fontFamily: DISPLAY, fontSize: 64, lineHeight: 1.32, color: MARFIL, opacity: entra(f, fin + 40, 26) }}>
          Sin costo y sin compromiso.
        </div>
        <div
          style={{
            marginTop: 50,
            fontFamily: SANS,
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: MUDO,
            opacity: entra(f, fin + 62, 26),
          }}
        >
          Consultas por mensaje directo
        </div>
      </AbsoluteFill>

      <Vineta />
      <Escudo o={entra(f, fin + 16, 34)} />
    </Fondo>
  );
};
