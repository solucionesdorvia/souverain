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

/**
 * El barrido de luz.
 *
 * Es el único momento autorizado del reel y el que hace el trabajo: una botella
 * en una sala oscura no aparece, la revela una luz que pasa por encima. El
 * degradado va enmascarado con el alfa del propio PNG, así que el brillo cae
 * sobre el vidrio y la etiqueta y no sobre el fondo; recortarlo con una forma
 * geométrica sería la versión barata del mismo efecto.
 *
 * `avance` va de 0 a 1 y mueve la banda de un borde al otro.
 */
export const Barrido: React.FC<{ clave: string; avance: number; alto: number; fuerza?: number }> = ({
  clave,
  avance,
  alto,
  fuerza = 1,
}) => {
  /* El recorrido arranca y termina apenas afuera del cuadro. Con un rango más
     ancho la banda pasaba casi todo el plano fuera de la botella y el efecto
     se perdía: se medía en el pixel pero no se veía. */
  const x = interpolate(avance, [0, 1], [-55, 135]);
  /* Máscara aparte y no el alfa del propio PNG: ese alfa incluye el halo de
     estudio alrededor de la botella y el barrido se derramaba sobre el fondo.
     Las de mascaras/ tienen la silueta recortada dura, con un pelo de
     desenfoque en el borde. */
  const mascara = `url(${staticFile(`mascaras/${clave}.png`)})`;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        WebkitMaskImage: mascara,
        maskImage: mascara,
        WebkitMaskSize: `auto ${alto}px`,
        maskSize: `auto ${alto}px`,
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        /* Banda angosta y con núcleo caliente: es un reflejo especular sobre
           vidrio, no un lavado de luz. El oro del centro es el mismo acento de
           la marca, así que el brillo pertenece al mundo y no parece un filtro. */
        background: `linear-gradient(104deg,
          transparent ${x}%,
          rgba(255,252,244,${0.16 * fuerza}) ${x + 12}%,
          rgba(255,252,244,${0.78 * fuerza}) ${x + 20}%,
          rgba(232,205,150,${0.95 * fuerza}) ${x + 24}%,
          rgba(201,162,75,${0.34 * fuerza}) ${x + 30}%,
          transparent ${x + 44}%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};

/**
 * Revelado por cortina.
 *
 * El texto sube desde detrás de su propia línea de base en lugar de aparecer
 * con un fundido. Cuesta lo mismo y se lee como tipografía compuesta, no como
 * una capa a la que le subieron la opacidad.
 */
export const Cortina: React.FC<{
  p: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ p, children, style }) => (
  <div style={{ overflow: "hidden", ...style }}>
    <div
      style={{
        transform: `translateY(${(1 - p) * 112}%)`,
        opacity: p < 0.02 ? 0 : 1,
      }}
    >
      {children}
    </div>
  </div>
);

/**
 * Viñeta.
 *
 * Cierra los bordes para que el ojo caiga en el centro del cuadro. En vertical
 * importa más que en apaisado: el celular se mira con luz de ambiente encima y
 * sin esto los bordes del video se confunden con el fondo de la app.
 */
export const Vineta: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(78% 52% at 50% 46%, transparent 42%, rgba(0,0,0,.55) 100%)",
      pointerEvents: "none",
    }}
  />
);

