/**
 * Añada que se lee en cada packshot.
 *
 * Varias etiquetas no tienen foto publicada por añada: de Cheval des Andes sólo
 * circula la 2017 y de Terrazas sólo la cosecha vigente. En esos casos la pieza
 * se muestra con la foto de otra añada, y conviene decirlo en vez de disimularlo.
 *
 * Sólo figuran acá las fotos donde el año se lee en la etiqueta. Si una foto no
 * está en la tabla, se asume que no muestra añada y no hay nada que aclarar.
 */
const ANADA_DE_LA_FOTO: Record<string, number> = {
  "dp-vintage": 2015,
  "dp-2017": 2017,
  "dp-2013": 2013,
  "dp-mag-2012": 2012,
  "dp-mag-2008": 2008,
  "dp-rose": 2009,
  "dp-rose-2008": 2008,
  "dp-rose-2006": 2006,
  "dp-p2-2004": 2004,
  "moet-gv": 2016,
  "moet-gv-2013": 2013,
  "moet-gvr-2015": 2015,
  "moet-gvr-2013": 2013,
  "cheval": 2017,
  "terr-grand-malbec": 2023,
  "terr-grand-cab": 2023,
  "terr-grand-chard": 2024,
  "terr-petit-manseng": 2023,
  "terr-origen-chard": 2025,
  "terr-altamira": 2021,
  "terr-chacayes": 2021,
  "terr-compuertas": 2021,
  "vc-gd": 2018,
  "vc-gd-rose": 2015,
  "vc-vintage-rose": 2008,   // la etiqueta dice 2008, no 2012
  "vc-vintage-2015": 2015,
  "pj-belle-epoque": 2018,
  "etchart": 2022,
};

/** Devuelve la añada que se lee en la foto, o null si esa foto no muestra año. */
function anadaDeLaFoto(imageUrl: string): number | null {
  const m = imageUrl.match(/\/productos\/([a-z0-9-]+)\.jpg/);
  return (m && ANADA_DE_LA_FOTO[m[1]]) ?? null;
}

/**
 * true cuando la pieza declara una añada en su nombre y la foto muestra otra.
 * Se usa para aclararlo al lado de la foto, únicamente en las que hace falta.
 */
export function fotoDeOtraAnada(name: string, imageUrl: string): boolean {
  const enNombre = anadaDelNombre(name);
  if (enNombre === null) return false;
  const enFoto = anadaDeLaFoto(imageUrl);
  return enFoto !== null && enFoto !== enNombre;
}

/**
 * Añada declarada en el nombre de la pieza.
 *
 * Además del año de cuatro cifras contempla la forma "Cosecha 92", que es como
 * viene el Etchart del 92 en el catálogo. Sin esto quedaba fuera del control y
 * mostraba una botella de 2022 sin ninguna aclaración.
 */
function anadaDelNombre(name: string): number | null {
  const cuatro = name.match(/\b(19|20)\d{2}\b/);
  if (cuatro) return Number(cuatro[0]);
  const dos = name.match(/\bcosecha\s+(\d{2})\b/i);
  if (!dos) return null;
  const n = Number(dos[1]);
  return n > 30 ? 1900 + n : 2000 + n;   // 92 -> 1992, 05 -> 2005
}
