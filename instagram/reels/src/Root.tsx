import React from "react";
import { Composition } from "remotion";
import { ANCHO, ALTO, FPS } from "./mundo";
import { Coleccion } from "./reels/Coleccion";
import { Serie, type Pieza } from "./reels/Serie";
import { OnPremise } from "./reels/OnPremise";

/* La duración de una serie sale de sus piezas, no de un número a ojo: portada +
   piezas + cierre. Si mañana se agrega una botella, el reel se alarga solo. */
const duracionSerie = (piezas: number, porPieza = 66, portada = 96, cierre = 116) =>
  portada + piezas * porPieza + cierre;

const LUXURY: Pieza[] = [
  { nombre: "Dom Pérignon P2", origen: "2004 · Épernay", foto: "dp-p2-2004" },
  { nombre: "Krug Grande Cuvée", origen: "Reims", foto: "krug-gc" },
  { nombre: "Belle Époque", origen: "Perrier-Jouët", foto: "pj-belle-epoque" },
  { nombre: "La Grande Dame", origen: "Veuve Clicquot", foto: "vc-gd" },
  { nombre: "La Grande Dame Rosé", origen: "Veuve Clicquot", foto: "vc-gd-rose" },
];

const CHAMPAGNE: Pieza[] = [
  { nombre: "Dom Pérignon", origen: "Épernay", foto: "dp-2013" },
  { nombre: "Krug", origen: "Reims", foto: "krug-gc" },
  { nombre: "Veuve Clicquot", origen: "Reims", foto: "vc-yellow" },
  { nombre: "Moët & Chandon", origen: "Épernay", foto: "moet-gv-2013" },
  { nombre: "G.H. Mumm", origen: "Reims", foto: "mumm-cordon-rouge" },
];

export const Root: React.FC = () => (
  <>
    <Composition
      id="reel-coleccion"
      component={Coleccion}
      durationInFrames={410}
      fps={FPS}
      width={ANCHO}
      height={ALTO}
    />
    <Composition
      id="reel-luxury-black"
      component={Serie}
      durationInFrames={duracionSerie(LUXURY.length)}
      fps={FPS}
      width={ANCHO}
      height={ALTO}
      defaultProps={{
        etiqueta: "Luxury Black",
        titulo: "Las que no\nse exhiben",
        bajada: "Selección Luxury Black",
        piezas: LUXURY,
        cierreTitulo: "Sin precio",
        cierreTexto: "Cada referencia se incorpora una sola vez.",
      }}
    />
    <Composition
      id="reel-champagne"
      component={Serie}
      durationInFrames={duracionSerie(CHAMPAGNE.length)}
      fps={FPS}
      width={ANCHO}
      height={ALTO}
      defaultProps={{
        etiqueta: "Champagne",
        titulo: "Cuarenta\ny tres",
        bajada: "Piezas de Champagne",
        piezas: CHAMPAGNE,
        cierreTitulo: "De Reims a Épernay",
        cierreTexto: "Añadas, magnums y ediciones que no van al mostrador.",
      }}
    />
    <Composition
      id="reel-on-premise"
      component={OnPremise}
      durationInFrames={470}
      fps={FPS}
      width={ANCHO}
      height={ALTO}
    />
  </>
);
