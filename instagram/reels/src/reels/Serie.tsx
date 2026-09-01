import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  Fondo, Banda, Escudo, Botella, Filete,
  DISPLAY, CASA, SANS, ORO, MARFIL, MUDO, entra, pasa,
} from "../mundo";

export type Pieza = { nombre: string; origen: string; foto: string };

/**
 * Reel de serie: una portada, N piezas de a una, y un cierre.
 *
 * Los tres reels de catálogo comparten esta forma porque comparten el problema:
 * mostrar botellas de a una, con aire, sin que el espectador pierda el hilo de
 * qué está viendo. La banda superior queda fija con el contador; eso da la
 * sensación de recorrido que en un carrusel dan las diapositivas.
 *
 * Cada pieza dura `porPieza` frames. Con 30 fps y 66 frames son 2,2 segundos:
 * alcanza para leer el nombre y no tanto como para que el dedo siga scrolleando.
 */
export const Serie: React.FC<{
  etiqueta: string;
  titulo: string;
  bajada: string;
  piezas: Pieza[];
  cierreTitulo: string;
  cierreTexto: string;
  porPieza?: number;
  portadaHasta?: number;
}> = ({
  etiqueta,
  titulo,
  bajada,
  piezas,
  cierreTitulo,
  cierreTexto,
  porPieza = 66,
  portadaHasta = 96,
}) => {
  const f = useCurrentFrame();
  const finPiezas = portadaHasta + piezas.length * porPieza;
  const indice = Math.floor((f - portadaHasta) / porPieza);

  return (
    <Fondo>
      <Banda
        cual={etiqueta}
        derecha={
          indice >= 0 && indice < piezas.length
            ? `${String(indice + 1).padStart(2, "0")} — ${String(piezas.length).padStart(2, "0")}`
            : undefined
        }
        o={entra(f, 6)}
      />

      {/* Portada */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          opacity: pasa(f, 8, portadaHasta, 16),
        }}
      >
        <div
          style={{
            fontFamily: DISPLAY,
            fontStyle: "italic",
            fontSize: 132,
            lineHeight: 1.02,
            color: MARFIL,
            whiteSpace: "pre-line",
          }}
        >
          {titulo}
        </div>
        <div style={{ margin: "38px 0" }}>
          <Filete progreso={entra(f, 30, 26)} ancho={260} />
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 26,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            color: MUDO,
          }}
        >
          {bajada}
        </div>
      </AbsoluteFill>

      {/* Piezas */}
      {piezas.map((p, i) => {
        const desde = portadaHasta + i * porPieza;
        const o = pasa(f, desde, desde + porPieza, 13);
        if (o <= 0.001) return null;
        return (
          <AbsoluteFill key={p.foto + i} style={{ opacity: o }}>
            <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 300 }}>
              <Botella
                clave={p.foto}
                alto={980}
                /* Deriva lentísima: da vida al plano fijo sin que se note el
                   truco. Un zoom marcado acá se leería como plantilla. */
                escala={1 + (f - desde) * 0.00035}
              />
            </AbsoluteFill>
            <div
              style={{
                position: "absolute",
                bottom: 300,
                left: 0,
                right: 0,
                textAlign: "center",
                paddingLeft: 90,
                paddingRight: 90,
              }}
            >
              <div
                style={{
                  fontFamily: CASA,
                  fontSize: 30,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: ORO,
                  opacity: entra(f, desde + 8, 16),
                }}
              >
                {p.origen}
              </div>
              <div
                style={{
                  marginTop: 20,
                  fontFamily: DISPLAY,
                  fontSize: 82,
                  lineHeight: 1.08,
                  color: MARFIL,
                  opacity: entra(f, desde + 13, 18),
                }}
              >
                {p.nombre}
              </div>
            </div>
          </AbsoluteFill>
        );
      })}

      {/* Cierre */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          paddingLeft: 110,
          paddingRight: 110,
          opacity: pasa(f, finPiezas + 2, finPiezas + 110, 18),
        }}
      >
        <div
          style={{
            fontFamily: DISPLAY,
            fontStyle: "italic",
            fontSize: 116,
            color: ORO,
            lineHeight: 1.04,
          }}
        >
          {cierreTitulo}
        </div>
        <div style={{ margin: "36px 0" }}>
          <Filete progreso={entra(f, finPiezas + 18, 26)} ancho={280} />
        </div>
        <div style={{ fontFamily: DISPLAY, fontSize: 62, lineHeight: 1.3, color: MARFIL }}>
          {cierreTexto}
        </div>
        <div
          style={{
            marginTop: 44,
            fontFamily: SANS,
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: MUDO,
            opacity: entra(f, finPiezas + 40),
          }}
        >
          Consultas por mensaje directo
        </div>
      </AbsoluteFill>

      <Escudo o={entra(f, finPiezas + 6, 30)} />
    </Fondo>
  );
};
