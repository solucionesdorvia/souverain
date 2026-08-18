import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Precio guardado en centavos (ARS). Formatea a ARS sin centavos.
/**
 * Precio para las pantallas de cara al público.
 *
 * price 0 significa que la lista todavía no está cargada, no que la pieza sea
 * gratis: mostrar "$ 0" se lee como un error del sitio. Hasta que haya precio
 * la pieza se ofrece como consulta. Cuando se carguen, esto vuelve solo al
 * precio sin tocar ningún componente.
 *
 * El panel de administración sigue usando formatPrice, donde un 0 sí es un 0.
 */
export function precioPublico(cents: number): string | null {
  return cents > 0 ? formatPrice(cents) : null;
}

export function formatPrice(cents: number): string {
  const amount = cents / 100;
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
