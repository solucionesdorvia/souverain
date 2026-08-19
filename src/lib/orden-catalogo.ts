/**
 * Las añadas de una misma etiqueta comparten packshot, así que en el orden
 * natural caían juntas: los seis Cheval des Andes quedaban como seis tarjetas
 * idénticas seguidas y parecía un error de la página.
 *
 * En vez de cambiar el criterio de orden (que dejaría de ser "Novedades"), se
 * hace una pasada que sólo adelanta la siguiente pieza con otra foto cuando la
 * que toca repetiría una de las últimas `gap`. El resto del orden queda igual.
 * gap=3 cubre tanto la grilla de 2 columnas como la de 3: separa a la vecina
 * de al lado y a la de arriba.
 */
export function separarFotosRepetidas<T extends { imageUrl: string }>(items: T[], gap = 3): T[] {
  const out: T[] = [];
  const pend = [...items];
  while (pend.length) {
    const recientes = out.slice(-gap).map((p) => p.imageUrl);
    let i = pend.findIndex((p) => !recientes.includes(p.imageUrl));
    if (i === -1) i = 0; // no queda ninguna distinta: se acepta la repetición
    out.push(pend.splice(i, 1)[0]);
  }
  return out;
}
