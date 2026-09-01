/**
 * Vocabulario de estados de una solicitud On Premise.
 *
 * Vive acá y no repartido entre la pantalla, el control y la API para que los
 * tres hablen del mismo conjunto: si mañana se agrega un estado, se agrega en
 * un solo lugar y la API deja de aceptar cualquier string suelto.
 *
 * NEW es el que escribe /api/on-premise y el default de la columna, así que no
 * se toca aunque el resto esté en castellano.
 */
export const ESTADOS_LEAD = ["NEW", "CONTACTADO", "ACTIVA", "DESCARTADA"] as const;

export type EstadoLead = (typeof ESTADOS_LEAD)[number];

export const ETIQUETA_ESTADO: Record<EstadoLead, string> = {
  NEW: "Sin contactar",
  CONTACTADO: "Contactado",
  ACTIVA: "Cuenta activa",
  DESCARTADA: "Descartada",
};

export function esEstadoLead(v: string): v is EstadoLead {
  return (ESTADOS_LEAD as readonly string[]).includes(v);
}

/**
 * Arma el enlace de WhatsApp a partir del teléfono que cargó el solicitante.
 *
 * Souverain trabaja los contactos por WhatsApp, así que el número escrito a
 * mano tiene que poder abrirse de un toque. Se aceptan las formas en que la
 * gente lo escribe de verdad — con 0, con 15, con guiones, con +54 — y si el
 * dato no se parece a nada conocido se devuelve null y la pantalla muestra el
 * teléfono como texto en vez de un enlace que llevaría a un chat equivocado.
 */
export function whatsappDesdeTelefono(tel: string): string | null {
  let d = tel.replace(/\D/g, "");
  if (!d) return null;
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("54")) {
    const resto = d.slice(2);
    // +54 sin el 9 de móvil: se agrega, que es lo que espera wa.me.
    return resto.startsWith("9") ? d : `549${resto}`;
  }
  // Local: 011 15 5758-1269 / 11 5758-1269 / 1157581269
  if (d.startsWith("0")) d = d.slice(1);
  // El 15 se saca sólo cuando sobra. Un móvil local son 10 dígitos (área más
  // número) y con el 15 intermedio son 12; sacarlo siempre rompía los números
  // cuyo prefijo ya contiene un 15, como el 351 155… de Córdoba, que quedaban
  // en 8 dígitos y se descartaban.
  if (d.length === 12) {
    const sin15 = d.replace(/^(\d{2,4})15(\d{6,8})$/, "$1$2");
    if (sin15.length === 10) d = sin15;
  }
  if (d.length === 10) return `549${d}`;
  return null;
}
