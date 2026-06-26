// Módulo de modo de checkout — intercambiable por variable de entorno.
// CHECKOUT_MODE = "stripe" | "whatsapp"

export type CheckoutMode = "stripe" | "whatsapp";

export function getCheckoutMode(): CheckoutMode {
  const raw = (process.env.CHECKOUT_MODE ?? "stripe").toLowerCase();
  return raw === "whatsapp" ? "whatsapp" : "stripe";
}

export function getWhatsappNumber(): string {
  return process.env.WHATSAPP_NUMBER ?? "5491157581269";
}

export type CartLine = {
  name: string;
  quantity: number;
  unitPrice: number; // centavos
};

export function buildWhatsappUrl(opts: {
  items: CartLine[];
  total: number;
  customerName?: string;
  customerEmail?: string;
  notes?: string;
}): string {
  const number = getWhatsappNumber();
  const lines: string[] = [];
  lines.push("Hola Souverain, quiero confirmar el siguiente pedido:");
  lines.push("");
  for (const it of opts.items) {
    const sub = (it.unitPrice * it.quantity) / 100;
    lines.push(`• ${it.quantity} × ${it.name} — $${sub.toLocaleString("es-AR")}`);
  }
  lines.push("");
  lines.push(`Total: $${(opts.total / 100).toLocaleString("es-AR")}`);
  if (opts.customerName) lines.push(`Nombre: ${opts.customerName}`);
  if (opts.customerEmail) lines.push(`Email: ${opts.customerEmail}`);
  if (opts.notes) lines.push(`Notas: ${opts.notes}`);
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${number}?text=${text}`;
}
