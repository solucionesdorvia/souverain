"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsappUrl } from "@/lib/checkout-mode";

type Props = {
  productId: string;
  slug: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  showWhatsapp?: boolean;
};

export function AddToCart({ productId, slug, name, imageUrl, unitPrice, showWhatsapp = false }: Props) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  function handleAdd() {
    add({ productId, slug, name, imageUrl, unitPrice }, qty);
  }

  function whatsapp() {
    const url = buildWhatsappUrl({
      items: [{ name, quantity: qty, unitPrice }],
      total: qty * unitPrice,
    });
    window.open(url, "_blank");
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <span className="eyebrow">Cantidad</span>
        <div className="flex items-center hairline">
          <button
            className="px-4 py-3 text-ink/70 hover:text-gold transition-colors"
            onClick={() => setQty(Math.max(1, qty - 1))}
            aria-label="Restar"
          >
            <Minus size={14} />
          </button>
          <span className="px-5 text-sm tabular-nums">{qty}</span>
          <button
            className="px-4 py-3 text-ink/70 hover:text-gold transition-colors"
            onClick={() => setQty(qty + 1)}
            aria-label="Sumar"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
      <button onClick={handleAdd} className="btn-primary w-full">
        Agregar al carrito
      </button>
      {showWhatsapp && (
        <button onClick={whatsapp} className="btn-ghost w-full">
          Consultar por WhatsApp
        </button>
      )}
    </div>
  );
}
