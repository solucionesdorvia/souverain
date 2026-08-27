/* Contenido de los cuatro carruseles.

   `foto` apunta a instagram/normal/, donde las botellas están recortadas y
   llevadas todas a la misma altura. Sólo entran botellas solas: los packshots
   que traen la caja al lado rompen el encuadre repetido de la serie. */
window.CARRUSELES = [
{
  id: "luxury-black",
  etiqueta: "Luxury Black",
  portada: { titulo: "Ocho piezas", bajada: "Selección Luxury Black" },
  cierre: { titulo: "Se consultan", texto: "Las piezas Luxury Black no se publican con precio." },
  entradas: [
    { n: "01", nombre: "Dom Pérignon P2",        origen: "2004 · Épernay",     foto: "dp-p2-2004" },
    { n: "02", nombre: "Krug Grande Cuvée",      origen: "Reims",              foto: "krug-gc" },
    { n: "03", nombre: "Perrier-Jouët",          origen: "Belle Époque 2018",  foto: "pj-belle-epoque" },
    { n: "04", nombre: "La Grande Dame",         origen: "Veuve Clicquot",     foto: "vc-gd" },
    { n: "05", nombre: "Moët Grand Vintage",     origen: "2013 · Épernay",     foto: "moet-gv-2013" },
    { n: "06", nombre: "Dom Pérignon Rosé",      origen: "2008 · Épernay",     foto: "dp-rose-2008" },
    { n: "07", nombre: "Cheval des Andes",       origen: "2017 · Valle de Uco", foto: "cheval" },
    { n: "08", nombre: "Terrazas Grand Malbec",  origen: "Mendoza",            foto: "terr-grand-malbec" }
  ]
},
{
  id: "casas-nuevas",
  etiqueta: "La colección crece",
  portada: { titulo: "Seis casas", bajada: "Entran a la colección" },
  cierre: { titulo: "La colección", texto: "Casas internacionales y bodegas argentinas de parcela." },
  entradas: [
    { n: "01", nombre: "Zuccardi",          origen: "Valle de Uco",  linea: "Vinos de parcela: Piedra Infinita, Aluvional y Polígonos." },
    { n: "02", nombre: "Viña Cobos",        origen: "Perdriel",      linea: "El proyecto argentino de Paul Hobbs." },
    { n: "03", nombre: "Rutini",            origen: "Tupungato",     linea: "Felipe Rutini, con añadas que llegan hasta 1997." },
    { n: "04", nombre: "Ribera del Cuarzo", origen: "Valle de Uco",  linea: "Malbec y merlot de parcela única." },
    { n: "05", nombre: "Matervini",         origen: "Mendoza",       linea: "Piedras Viejas, Calcha y Viña Canota." },
    { n: "06", nombre: "Cuchillo de Palo",  origen: "Valle de Uco",  linea: "Pinot noir y espumantes extra brut." }
  ]
},
{
  id: "maridajes",
  etiqueta: "Maridajes",
  portada: { titulo: "Cinco encuentros", bajada: "Botella y plato" },
  cierre: { titulo: "Armamos la carta", texto: "Para bares, restaurantes y hoteles." },
  entradas: [
    { n: "01", nombre: "Dom Pérignon 2013",  origen: "con ostras",          foto: "dp-2013" },
    { n: "02", nombre: "Cheval des Andes",   origen: "con bife de chorizo", foto: "cheval" },
    { n: "03", nombre: "Scapa Glansa",       origen: "con roquefort",       foto: "scapa-glansa" },
    { n: "04", nombre: "Hennessy V.S.O.P",   origen: "con chocolate 70%",   foto: "hennessy-vsop" },
    { n: "05", nombre: "Terrazas Chardonnay", origen: "con salmón",         foto: "terr-grand-chard" }
  ]
},
{
  id: "souverain",
  etiqueta: "La casa",
  portada: { titulo: "Souverain", bajada: "Distribuidora · On Premise" },
  cierre: { titulo: "Hablemos", texto: "Si la botella que busca no figura, la conseguimos." },
  entradas: [
    { n: "01", nombre: "Qué distribuimos", origen: "Dieciséis categorías",   linea: "Whisky, champagne, cognac, gin, ron, pisco, vinos finos y generosos." },
    { n: "02", nombre: "La colección",     origen: "Internacional y argentina", linea: "De Dom Pérignon y Krug a bodegas mendocinas de parcela." },
    { n: "03", nombre: "On premise",       origen: "Bares y restaurantes",   linea: "Armamos la carta según la cocina de cada salón." },
    { n: "04", nombre: "A consultar",      origen: "Lo que está en cava",    linea: "Las piezas raras no se publican con precio." }
  ]
}];
