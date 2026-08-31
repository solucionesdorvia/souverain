export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Distribuidora Souverain",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  tagline: "On Premise · Casa de bebidas premium · Buenos Aires",
  address: "Leonardo Euler 2396, B1615 Área El Triángulo, Pcia. de Buenos Aires",
  phone: "+54 9 11 5758-1269",
  phoneIntl: "5491157581269",
  hours: "Lunes a Viernes · 09:00 a 17:00 hs",
  hoursWeekend: "Fines de semana cerrado",
  email: "ventas@distribuidorasouverain.com",
};

/**
 * Datos fiscales que las páginas legales tienen que mostrar por ley.
 *
 * Los que faltan quedan en null a propósito: la página los reemplaza por un
 * aviso visible en vez de inventarlos. Un CUIT equivocado en los términos es
 * peor que decir que está pendiente.
 */
export const FISCAL: { razonSocial: string | null; cuit: string | null; domicilio: string | null } = {
  razonSocial: null,
  cuit: null,
  domicilio: SITE.address,
};
