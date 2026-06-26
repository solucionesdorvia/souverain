"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

type Mode = "stripe" | "whatsapp";

export function CheckoutForm({ mode }: { mode: Mode }) {
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <div className="hairline p-16 text-center max-w-xl">
        <p className="text-mute mb-8">Su selección está vacía.</p>
        <Link href="/tienda" className="btn-primary">Volver a la colección</Link>
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((it) => ({ productId: it.productId, quantity: it.quantity })),
          customer: { name, email, phone, notes },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Error al iniciar el checkout");

      if (data.url) {
        if (data.mode === "whatsapp") {
          clear();
          window.location.href = data.url;
        } else {
          // Stripe redirect
          window.location.href = data.url;
        }
      } else {
        throw new Error("Respuesta inesperada del servidor");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-20">
      <div className="space-y-10">
        <fieldset className="space-y-6">
          <legend className="eyebrow mb-4">Datos de contacto</legend>
          <div>
            <label className="eyebrow block mb-2">Nombre y apellido *</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="input-souv" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="eyebrow block mb-2">Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-souv" />
            </div>
            <div>
              <label className="eyebrow block mb-2">Teléfono *</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="input-souv" />
            </div>
          </div>
          <div>
            <label className="eyebrow block mb-2">Notas (opcional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="input-souv resize-none" />
          </div>
        </fieldset>

        {error && (
          <div className="hairline p-4 text-sm text-gold">
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Procesando…" : mode === "whatsapp" ? "Generar pedido por WhatsApp" : "Pagar con tarjeta"}
        </button>
        <p className="text-[11px] uppercase tracking-[0.25em] text-mute text-center">
          {mode === "whatsapp"
            ? "Se abrirá WhatsApp con su pedido ya armado."
            : "Pago seguro procesado por Stripe."}
        </p>
      </div>

      <aside className="hairline p-8 h-fit lg:sticky lg:top-28">
        <div className="eyebrow mb-6">Resumen del pedido</div>
        <ul className="divide-y divide-hairline mb-6">
          {items.map((it) => (
            <li key={it.productId} className="flex gap-4 py-4">
              <div className="relative w-14 h-20 bg-background hairline overflow-hidden flex-shrink-0">
                <Image src={it.imageUrl} alt={it.name} fill className="object-cover" sizes="56px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-base leading-tight">{it.name}</div>
                <div className="text-xs text-mute mt-1">× {it.quantity}</div>
              </div>
              <div className="text-sm tabular-nums">{formatPrice(it.unitPrice * it.quantity)}</div>
            </li>
          ))}
        </ul>
        <div className="hairline-t pt-5 flex items-baseline justify-between">
          <span className="eyebrow">Total</span>
          <span className="font-display text-2xl text-gold tabular-nums">{formatPrice(total)}</span>
        </div>
      </aside>
    </form>
  );
}
