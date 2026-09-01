import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  Fondo, Banda, Escudo, Filete,
  DISPLAY, CASA, SANS, ORO, MARFIL, MUDO, entra, pasa,
} from "../mundo";

const BEATS = [
  { n: "01", titulo: "Carta curada", texto: "Diseñamos la carta de bebidas según la cocina y el ticket del salón." },
  { n: "02", titulo: "Asesor asignado", texto: "Un sommelier fijo para la cuenta. Sin pasar por un call center." },
  { n: "03", titulo: "Acceso prioritario", texto: "Las asignaciones cortas se ofrecen primero a las cuentas On Premise." },
  { n: "04", titulo: "Entrega programada", texto: "CABA y GBA, con control de temperatura para lo que lo necesita." },
];

/**
 * Reel 04 — la propuesta On Premise.
 *
 * Es el único de los cuatro sin una sola botella: le habla a un dueño de salón,
 * y a ése no lo convence una foto de producto sino saber qué le resuelven. Por
 * eso los cuatro beats son de servicio y el cierre pide una acción concreta.
 */
export const OnPremise: React.FC = () => {
  const f = useCurrentFrame();
  const INICIO = 108;
  const POR = 72;
  const fin = INICIO + BEATS.length * POR;

  return (
    <Fondo>
      <Banda cual="On Premise" derecha="Bares · Restaurantes · Hoteles" o={entra(f, 6)} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingLeft: 100,
          paddingRight: 100,
          opacity: pasa(f, 8, INICIO, 16),
        }}
      >
        <div style={{ fontFamily: DISPLAY, fontSize: 96, lineHeight: 1.1, color: MARFIL }}>
          Si tenés un salón,
          <br />
          <span style={{ fontStyle: "italic", color: ORO }}>no comprás botellas.</span>
        </div>
        <div style={{ margin: "40px 0" }}>
          <Filete progreso={entra(f, 34, 26)} ancho={300} />
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 26,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: MUDO,
          }}
        >
          Armás una carta
        </div>
      </AbsoluteFill>

      {BEATS.map((b, i) => {
        const desde = INICIO + i * POR;
        const o = pasa(f, desde, desde + POR, 14);
        if (o <= 0.001) return null;
        return (
          <AbsoluteFill
            key={b.n}
            style={{
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingLeft: 110,
              paddingRight: 110,
              opacity: o,
            }}
          >
            <div
              style={{
                fontFamily: DISPLAY,
                fontStyle: "italic",
                fontSize: 190,
                lineHeight: 0.9,
                color: ORO,
                opacity: 0.22,
              }}
            >
              {b.n}
            </div>
            <div
              style={{
                marginTop: -30,
                fontFamily: CASA,
                fontSize: 52,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: MARFIL,
                opacity: entra(f, desde + 8, 16),
              }}
            >
              {b.titulo}
            </div>
            <div style={{ margin: "34px 0" }}>
              <Filete progreso={entra(f, desde + 14, 24)} ancho={200} />
            </div>
            <div
              style={{
                fontFamily: DISPLAY,
                fontSize: 58,
                lineHeight: 1.34,
                color: MUDO,
                maxWidth: 800,
                opacity: entra(f, desde + 16, 20),
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
          opacity: pasa(f, fin + 2, fin + 116, 18),
        }}
      >
        <div style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: 112, color: ORO }}>
          Abrí la cuenta
        </div>
        <div style={{ margin: "36px 0" }}>
          <Filete progreso={entra(f, fin + 18, 26)} ancho={280} />
        </div>
        <div style={{ fontFamily: DISPLAY, fontSize: 60, lineHeight: 1.3, color: MARFIL }}>
          Sin costo y sin compromiso.
        </div>
        <div
          style={{
            marginTop: 44,
            fontFamily: SANS,
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: MUDO,
            opacity: entra(f, fin + 42),
          }}
        >
          Consultas por mensaje directo
        </div>
      </AbsoluteFill>

      <Escudo o={entra(f, fin + 6, 30)} />
    </Fondo>
  );
};
