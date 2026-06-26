"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function CarritoPage() {
  const { items, total, setQuantity, remove } = useCart();

  return (
    <div className="container-souv py-16 md:py-24">
      <header className="mb-12">
        <div className="eyebrow-gold mb-3">Carrito</div>
        <h1 className="display-2">Su <span className="italic">selección.</span></h1>
      </header>

      {items.length === 0 ? (
        <div className="hairline p-16 md:p-24 text-center max-w-xl mx-auto">
          <div className="gallery-number mb-6">—</div>
          <p className="font-display text-2xl md:text-3xl mb-4">
            Su selección está vacía.
          </p>
          <p className="caption max-w-sm mx-auto mb-10">
            La colección espera. Cada pieza se incorpora una sola vez.
          </p>
          <Link href="/tienda" className="btn-primary">Explorar la colección</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {items.map((it) => (
              <li key={it.productId} className="flex gap-6 py-6">
                <div className="relative w-28 h-36 bg-surface hairline overflow-hidden flex-shrink-0">
                  <Image src={it.imageUrl} alt={it.name} fill className="object-cover" sizes="112px" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <Link href={`/producto/${it.slug}`} className="font-display text-2xl text-ink hover:text-gold transition-colors">
                      {it.name}
                    </Link>
                    <button onClick={() => remove(it.productId)} aria-label="Quitar" className="p-1 text-mute hover:text-gold transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  <div className="text-sm text-mute mb-auto">{formatPrice(it.unitPrice)} c/u</div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center hairline">
                      <button onClick={() => setQuantity(it.productId, it.quantity - 1)} className="px-3 py-2 text-ink/70 hover:text-gold"><Minus size={14} /></button>
                      <span className="px-4 text-sm tabular-nums">{it.quantity}</span>
                      <button onClick={() => setQuantity(it.productId, it.quantity + 1)} className="px-3 py-2 text-ink/70 hover:text-gold"><Plus size={14} /></button>
                    </div>
                    <div className="text-sm text-ink/90 tabular-nums">
                      {formatPrice(it.unitPrice * it.quantity)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="hairline p-8 h-fit lg:sticky lg:top-28">
            <div className="eyebrow mb-6">Resumen</div>
            <dl className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-mute">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-mute">Envío</dt>
                <dd className="text-mute">Se calcula en el checkout</dd>
              </div>
            </dl>
            <div className="hairline-t pt-6 mb-8 flex items-baseline justify-between">
              <span className="eyebrow">Total</span>
              <span className="font-display text-3xl text-gold tabular-nums">{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" className="btn-primary w-full">Finalizar pedido</Link>
            <Link href="/tienda" className="btn-link mt-6 justify-center w-full">← Volver a la colección</Link>
          </aside>
        </div>
      )}
    </div>
  );
}
