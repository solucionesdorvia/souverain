/**
 * Añada que se lee en cada packshot.
 *
 * Varias etiquetas no tienen foto publicada por añada: de Cheval des Andes sólo
 * circula la 2017 y de Terrazas sólo la cosecha vigente. En esos casos la pieza
 * se muestra con la foto de otra añada, y conviene decirlo en vez de disimularlo.
 *
 * Sólo figuran acá las fotos donde el año se lee en la etiqueta. Si una foto no
 * está en la tabla, se asume que no muestra añada y no hay nada que aclarar.
 *
 * La tabla se levantó leyendo cada foto con el OCR del sistema en tres escalas
 * y, para las que no daban resultado, recortando la etiqueta y releyéndola
 * girada. Ese segundo paso fue necesario: Matervini imprime la añada en
 * vertical y en cuerpo diminuto al costado del monograma, y en la primera
 * pasada se perdían diez de once. Cada desajuste se confirmó después mirando la
 * etiqueta ampliada, porque el OCR falla con los números estilizados: leía 2023
 * donde Moët dice 2013 y 2010 donde Siesta dice 2019.
 */
const ANADA_DE_LA_FOTO: Record<string, number> = {
  "am-cab-franc-cab-sauv": 2022,
  "am-chardonnay": 2017,
  "am-gsm": 2017,
  "am-malbec": 2018,
  "am-pinot-noir": 2017,
  "am-semillon": 2024,
  "caro-petit-5l": 2022,
  "cheval": 2017,
  "dp-2013": 2013,
  "dp-2017": 2017,
  "dp-mag-2008": 2008,
  "dp-mag-2012": 2012,
  "dp-p2-2004": 2004,
  "dp-rose": 2009,
  "dp-rose-2006": 2006,
  "dp-rose-2008": 2008,
  "dp-vintage": 2015,
  "etchart": 1993,
  "lv-cabernet": 2022,
  "lv-chardonnay": 2024,
  "lv-le-dix": 2021,
  "lv-reserve-cabernet": 2022,
  "lv-reserve-carmenere": 2022,
  "lv-sauvignon-blanc": 2024,
  "moet-gv": 2016,
  "moet-gv-2013": 2013,
  "moet-gvr-2013": 2013,
  "moet-gvr-2015": 2015,
  "mv-alteza": 2017,
  "mv-blanco": 2018,
  "mv-calcha": 2017,
  "mv-finca": 2017,
  "mv-imposible": 2019,
  "mv-mas-alla": 2023,
  "mv-pedregal": 2019,
  "mv-piedras-ladera": 2018,
  "mv-piedras-terrazas": 2014,
  "mv-tinto": 2017,
  "mv-vina-canota": 2017,
  "otr-merlot": 2020,
  "otr-pinot-noir": 2020,
  "pj-belle-epoque": 2018,
  "rdc-especial-malbec": 2020,
  "siesta-doble-magnum": 2017,
  "siesta-lost": 2018,
  "siesta-malbec": 2019,
  "terr-altamira": 2021,
  "terr-chacayes": 2021,
  "terr-compuertas": 2021,
  "terr-grand-cab": 2023,
  "terr-grand-chard": 2024,
  "terr-grand-malbec": 2023,
  "terr-origen-chard": 2025,
  "terr-petit-manseng": 2023,
  "vc-bramare-lujan-cs": 2020,
  "vc-bramare-lujan-mb": 2022,
  "vc-bramare-uco-chard": 2023,
  "vc-bramare-uco-mb": 2022,
  "vc-chanares-cab-franc": 2022,
  "vc-chanares-malbec": 2022,
  "vc-cocodrilo": 2023,
  "vc-gd": 2018,
  "vc-gd-rose": 2015,
  "vc-hobbs-cabernet": 2022,
  "vc-hobbs-malbec": 2022,
  "vc-vintage-2015": 2015,
  "vc-vintage-rose": 2008,   // la etiqueta dice 2008, no 2012
  "vc-volturno": 2022,
  "vc-yellow": 1972,
  "vc-zingaretti-malbec": 2022,
  "zuc-emma-zuccardi-bonarda": 2023,
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
