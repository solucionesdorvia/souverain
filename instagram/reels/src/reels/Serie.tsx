import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import {
  Fondo, Banda, Escudo, Botella, Filete, Barrido, Cortina, Vineta,
  DISPLAY, CASA, SANS, ORO, MARFIL, MUDO, entra, pasa,
} from "../mundo";

export type Pieza = { nombre: string; origen: string; foto: string };

/**
 * Reel de serie: una portada, N piezas de a una, y un cierre.
 *
 * Los reels de catálogo comparten esta forma porque comparten el problema:
 * mostrar botellas de a una, con aire, sin que el espectador pierda el hilo.
 *
 * Cada pieza dura `porPieza` frames. Con 30 fps y 108 frames son 3,6 segundos:
 * el primero y medio es sólo la botella entrando y la luz pasándole por encima,
 * y el nombre aparece cuando el ojo ya terminó de recorrerla. La versión
 * anterior duraba 2,2 s y el texto competía con la botella por el mismo
 * instante; se leía apurada.
 *
 * El nombre va arriba del origen y no al revés. Tenerlo debajo convertía al
 * origen en un rótulo colgado sobre el título, que es la forma más común de
 * gastar la primera línea del cuadro en algo que nadie está buscando.
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
  porPieza = 108,
  portadaHasta = 120,
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
          opacity: pasa(f, 8, portadaHasta, 20),
        }}
      >
        <Cortina p={entra(f, 12, 30)}>
          <div
            style={{
              fontFamily: DISPLAY,
              fontStyle: "italic",
              fontSize: 148,
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              color: MARFIL,
              whiteSpace: "pre-line",
              padding: "0 40px",
            }}
          >
            {titulo}
          </div>
        </Cortina>
        <div style={{ margin: "44px 0" }}>
          <Filete progreso={entra(f, 40, 34)} ancho={260} />
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 26,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            color: MUDO,
            opacity: entra(f, 52, 26),
          }}
        >
          {bajada}
        </div>
      </AbsoluteFill>

      {/* Piezas */}
      {piezas.map((p, i) => {
        const desde = portadaHasta + i * porPieza;
        const o = pasa(f, desde, desde + porPieza, 16);
        if (o <= 0.001) return null;
        const local = f - desde;
        /* La luz cruza una sola vez, entre el segundo 0,4 y el 1,9. Después la
           botella se queda quieta el resto del plano. */
        const luz = interpolate(local, [12, 58], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const ALTO = 1180;
        return (
          <AbsoluteFill key={p.foto + i} style={{ opacity: o }}>
            <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 330 }}>
              <div style={{ position: "relative" }}>
                <Botella
                  clave={p.foto}
                  alto={ALTO}
                  /* Deriva lentísima: da vida al plano fijo sin que se note. */
                  escala={1 + local * 0.00022}
                  y={(1 - entra(f, desde, 34)) * 18}
                />
                <Barrido clave={p.foto} avance={luz} alto={ALTO} />
              </div>
            </AbsoluteFill>

            <div
              style={{
                position: "absolute",
                bottom: 292,
                left: 90,
                right: 90,
                textAlign: "center",
              }}
            >
              <Cortina p={entra(f, desde + 30, 28)}>
                <div
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 96,
                    lineHeight: 1.06,
                    letterSpacing: "-0.02em",
                    color: MARFIL,
                  }}
                >
                  {p.nombre}
                </div>
              </Cortina>
              <div
                style={{
                  marginTop: 22,
                  fontFamily: CASA,
                  fontSize: 27,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: ORO,
                  opacity: entra(f, desde + 46, 24),
                }}
              >
                {p.origen}
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
          opacity: pasa(f, finPiezas + 4, finPiezas + 150, 22),
        }}
      >
        <Cortina p={entra(f, finPiezas + 12, 30)}>
          <div
            style={{
              fontFamily: DISPLAY,
              fontStyle: "italic",
              fontSize: 126,
              color: ORO,
              lineHeight: 1.04,
              letterSpacing: "-0.015em",
            }}
          >
            {cierreTitulo}
          </div>
        </Cortina>
        <div style={{ margin: "42px 0" }}>
          <Filete progreso={entra(f, finPiezas + 34, 34)} ancho={280} />
        </div>
        <div
          style={{
            fontFamily: DISPLAY,
            fontSize: 64,
            lineHeight: 1.32,
            color: MARFIL,
            opacity: entra(f, finPiezas + 40, 26),
          }}
        >
          {cierreTexto}
        </div>
        <div
          style={{
            marginTop: 50,
            fontFamily: SANS,
            fontSize: 24,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: MUDO,
            opacity: entra(f, finPiezas + 62, 26),
          }}
        >
          Consultas por mensaje directo
        </div>
      </AbsoluteFill>

      <Vineta />
      <Escudo o={entra(f, finPiezas + 16, 34)} />
    </Fondo>
  );
};
