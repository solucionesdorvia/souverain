import React from "react";
import { AbsoluteFill, Img, staticFile, interpolate, useCurrentFrame } from "remotion";
import { loadFont as cargarCormorant } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as cargarCinzel } from "@remotion/google-fonts/Cinzel";

const { fontFamily: CORMORANT } = cargarCormorant();
const { fontFamily: CINZEL } = cargarCinzel();

/** El mismo mundo visual del sitio y de los carruseles, sin reinterpretarlo. */
export const NEGRO = "#0A0A0A";
export const ORO = "#C9A24B";
export const MARFIL = "#F2EFE9";
export const MUDO = "#8F8F8F";
export const FILETE = "#2A2A2A";
export const DISPLAY = `${CORMORANT}, Garamond, serif`;
export const CASA = `${CINZEL}, Garamond, serif`;
export const SANS = 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';

export const ANCHO = 1080;
export const ALTO = 1920;
export const FPS = 30;

/**
 * Curva de entrada.
 *
 * Todo el movimiento del reel sale de acá para que nada se mueva con un ritmo
 * distinto del resto. Es un ease-out largo y sin rebote: la marca es sobria y
 * un overshoot la vuelve publicidad de gaseosa.
 */
export function entra(frame: number, desde: number, duracion = 18) {
  const t = interpolate(frame, [desde, desde + duracion], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return 1 - Math.pow(1 - t, 3);
}

/** Entra y sale, para los bloques que se relevan dentro de un mismo plano. */
export function pasa(frame: number, desde: number, hasta: number, borde = 14) {
  const a = entra(frame, desde, borde);
  const b = 1 - entra(frame, hasta - borde, borde);
  return Math.min(a, b);
}

export const Fondo: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: NEGRO }}>
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(120% 62% at 50% 40%, rgba(255,255,255,.055), transparent 66%)",
      }}
    />
    {children}
  </AbsoluteFill>
);

/** Rótulo superior: la serie a la izquierda, el contador a la derecha. */
export const Banda: React.FC<{ cual: string; derecha?: string; o?: number }> = ({
  cual,
  derecha,
  o = 1,
}) => (
  <div
    style={{
      position: "absolute",
      top: 96,
      left: 84,
      right: 84,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      paddingBottom: 26,
      borderBottom: `1px solid ${FILETE}`,
      fontFamily: SANS,
      fontSize: 24,
      textTransform: "uppercase",
      opacity: o,
    }}
  >
    <span style={{ letterSpacing: "0.34em", color: ORO }}>{cual}</span>
    {derecha && <span style={{ letterSpacing: "0.26em", color: MUDO }}>{derecha}</span>}
  </div>
);

/** El escudo real, nunca la palabra "Souverain" escrita. */
export const Escudo: React.FC<{ o?: number; ancho?: number }> = ({ o = 1, ancho = 210 }) => (
  <div style={{ position: "absolute", bottom: 104, left: 0, right: 0, textAlign: "center", opacity: o }}>
    <Img src={staticFile("logo-crest.png")} style={{ width: ancho, opacity: 0.92 }} />
  </div>
);

/**
 * Una botella de la serie normalizada.
 *
 * Los PNG vienen recortados y llevados todos a la misma altura, así que el
 * tamaño se fija por la altura del lienzo y no por la imagen: dos botellas
 * consecutivas se ven a la misma escala aunque una sea magnum.
 */
export const Botella: React.FC<{
  clave: string;
  alto: number;
  o?: number;
  y?: number;
  escala?: number;
}> = ({ clave, alto, o = 1, y = 0, escala = 1 }) => (
  <Img
    src={staticFile(`botellas/${clave}.png`)}
    style={{
      height: alto,
      objectFit: "contain",
      opacity: o,
      transform: `translateY(${y}px) scale(${escala})`,
    }}
  />
);

/** Filete de oro que se dibuja de izquierda a derecha. */
export const Filete: React.FC<{ progreso: number; ancho?: number }> = ({ progreso, ancho = 320 }) => (
  <div style={{ width: ancho, height: 1, backgroundColor: FILETE, position: "relative" }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: ORO,
        transformOrigin: "left center",
        transform: `scaleX(${progreso})`,
      }}
    />
  </div>
);

/** Marca de agua tipográfica para el fondo de los planos de cierre. */
export const useFrameSeguro = () => useCurrentFrame();
