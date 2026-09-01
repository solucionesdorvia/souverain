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
    { n: "06", nombre: "Dom Pérignon Magnum",   origen: "2008 · Épernay",     foto: "dp-mag-2008" },
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
},
{
  id: "champagne",
  etiqueta: "Champagne",
  portada: { titulo: "Cuarenta y tres", bajada: "Piezas de Champagne" },
  cierre: { titulo: "La cava", texto: "Añadas, magnums y ediciones que no van al mostrador." },
  entradas: [
    { n: "01", nombre: "Dom Pérignon",    origen: "Épernay", foto: "dp-2013" },
    { n: "02", nombre: "Krug",            origen: "Reims",   foto: "krug-gc" },
    { n: "03", nombre: "Veuve Clicquot",  origen: "Reims",   foto: "vc-yellow" },
    { n: "04", nombre: "Perrier-Jouët",   origen: "Épernay", foto: "pj-belle-epoque" },
    { n: "05", nombre: "Moët & Chandon",  origen: "Épernay", foto: "moet-gv-2013" },
    { n: "06", nombre: "G.H. Mumm",       origen: "Reims",   foto: "mumm-cordon-rouge" }
  ]
},
{
  id: "rosados",
  etiqueta: "Rosados",
  portada: { titulo: "Seis rosados", bajada: "Champagne, y un gin" },
  cierre: { titulo: "Para la mesa", texto: "El rosado no es un vino de verano: es un vino de comida." },
  entradas: [
    { n: "01", nombre: "Rich Rosé",           origen: "Veuve Clicquot",  foto: "vc-rich-rose" },
    { n: "02", nombre: "La Grande Dame Rosé", origen: "Veuve Clicquot",  foto: "vc-gd-rose" },
    { n: "03", nombre: "Moët Rosé Impérial",  origen: "Épernay",         foto: "moet-rose" },
    { n: "04", nombre: "Mumm Rosé",           origen: "Reims",           foto: "mumm-rose" },
    { n: "05", nombre: "Veuve Clicquot Rosé", origen: "Reims",           foto: "vc-rose" },
    { n: "06", nombre: "Malfy Rosa",          origen: "Gin · Torino",    foto: "malfy-rosa" }
  ]
},
{
  id: "terrazas",
  etiqueta: "Terrazas de los Andes",
  portada: { titulo: "Una casa", bajada: "Seis alturas de Mendoza" },
  cierre: { titulo: "Altura", texto: "Cada varietal en la altura donde madura mejor." },
  entradas: [
    { n: "01", nombre: "Grand Chardonnay",  origen: "Valle de Uco",   foto: "terr-grand-chard" },
    { n: "02", nombre: "Origen Altamira",   origen: "Paraje Altamira", foto: "terr-altamira" },
    { n: "03", nombre: "Origen Chacayes",   origen: "Los Chacayes",   foto: "terr-chacayes" },
    { n: "04", nombre: "Origen Compuertas", origen: "Las Compuertas", foto: "terr-compuertas" },
    { n: "05", nombre: "Origen Chardonnay", origen: "Valle de Uco",   foto: "terr-origen-chard" },
    { n: "06", nombre: "Petit Manseng",     origen: "Vendimia tardía", foto: "terr-petit-manseng" }
  ]
},
{
  id: "espirituosas",
  etiqueta: "Espirituosas",
  portada: { titulo: "Seis destilados", bajada: "Cognac, gin, ron y vodka" },
  cierre: { titulo: "La barra", texto: "Armamos la barra completa de un salón, no una botella suelta." },
  entradas: [
    { n: "01", nombre: "Hennessy V.S.O.P", origen: "Cognac",       foto: "hennessy-vsop" },
    { n: "02", nombre: "Hennessy V.S",     origen: "Cognac",       foto: "hennessy-vs" },
    { n: "03", nombre: "Malfy Limone",     origen: "Amalfi",       foto: "malfy-limone" },
    { n: "04", nombre: "Malfy Originale",  origen: "Torino",       foto: "malfy-originale" },
    { n: "05", nombre: "Havana Maestros",  origen: "Cuba",         foto: "havana-maestros" },
    { n: "06", nombre: "Absolut Elyx",     origen: "Suecia",       foto: "absolut-elyx" }
  ]
},
{
  id: "argentina",
  etiqueta: "Argentina",
  portada: { titulo: "Seis bodegas", bajada: "Vino de parcela" },
  cierre: { titulo: "Parcela", texto: "Producciones cortas que no llegan a la góndola." },
  entradas: [
    { n: "01", nombre: "Zuccardi",          origen: "Valle de Uco",   linea: "Piedra Infinita, Aluvional y Polígonos: el suelo antes que la variedad." },
    { n: "02", nombre: "Matervini",         origen: "Mendoza",        linea: "Santiago Achával y Roberto Cipresso. Piedras Viejas, Calcha, Viña Canota." },
    { n: "03", nombre: "Ribera del Cuarzo", origen: "Valle Azul, Río Negro", linea: "Cuarzo en el suelo, a orillas del río. Patagonia norte." },
    { n: "04", nombre: "Cuchillo de Palo",  origen: "Valle de Uco",   linea: "Pinot noir y extra brut de producción corta." },
    { n: "05", nombre: "AlmaNegra",         origen: "Ernesto Catena", linea: "Blends de autor y etiquetas que se agotan por añada." },
    { n: "06", nombre: "Mara de Uco",       origen: "Valle de Uco",   linea: "Semillón, cabernet franc y malbec de altura." }
  ]
},
{
  id: "como-se-compra",
  etiqueta: "Cómo se compra",
  portada: { titulo: "Cuatro pasos", bajada: "De la consulta a la entrega" },
  cierre: { titulo: "Escribinos", texto: "Si la botella que busca no figura, la conseguimos." },
  entradas: [
    { n: "01", nombre: "Consultás",   origen: "Por mensaje directo", linea: "Nos decís qué buscás. No hace falta que sepas la etiqueta exacta." },
    { n: "02", nombre: "Confirmamos", origen: "Precio y stock",      linea: "Buena parte de la colección es de asignación limitada: se confirma pieza por pieza." },
    { n: "03", nombre: "Coordinamos", origen: "CABA y GBA",          linea: "Entrega en el domicilio y el horario que nos indiques." },
    { n: "04", nombre: "Recibís",     origen: "Mayores de 18 años",  linea: "Revisá las botellas al recibirlas. Si algo no corresponde, lo resolvemos." }
  ]
}];
