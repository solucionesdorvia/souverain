"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { AvisoAnada } from "@/components/AvisoAnada";

export function CartDrawer() {
  const { isOpen, closeCart, items, total, setQuantity, remove } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-background/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[90] h-full w-full max-w-md bg-surface hairline-b flex flex-col"
          >
            <div className="flex items-center justify-between p-6 hairline-b">
              <div>
                <div className="eyebrow mb-1">Su selección</div>
                <h3 className="font-display text-2xl">Carrito</h3>
              </div>
              <button onClick={closeCart} aria-label="Cerrar" className="p-2 text-ink/70 hover:text-gold transition-colors">
                <X size={20} strokeWidth={1.2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-10 text-center">
                  <p className="text-mute text-sm mb-8">Su selección está vacía.</p>
                  <Link href="/tienda" onClick={closeCart} className="btn-ghost">
                    Explorar la colección
                  </Link>
                </div>
              ) : (
                <ul>
                  {items.map((it) => (
                    <li key={it.productId} className="flex gap-4 p-6 hairline-b">
                      <div className="relative w-20 h-28 bg-background hairline flex-shrink-0 overflow-hidden">
                        <Image src={it.imageUrl} alt={it.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/producto/${it.slug}`} onClick={closeCart} className="font-display text-lg leading-tight text-ink hover:text-gold transition-colors block mb-2">
                          {it.name}
                        </Link>
                        <AvisoAnada name={it.name} imageUrl={it.imageUrl} className="mb-1" />
                        <div className="text-sm text-mute mb-4">{formatPrice(it.unitPrice)}</div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center hairline">
                            <button
                              className="px-3 py-2 text-ink/70 hover:text-gold transition-colors"
                              onClick={() => setQuantity(it.productId, it.quantity - 1)}
                              aria-label="Restar"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-sm tabular-nums">{it.quantity}</span>
                            <button
                              className="px-3 py-2 text-ink/70 hover:text-gold transition-colors"
                              onClick={() => setQuantity(it.productId, it.quantity + 1)}
                              aria-label="Sumar"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            className="text-[11px] uppercase tracking-[0.25em] text-mute hover:text-gold transition-colors ml-auto"
                            onClick={() => remove(it.productId)}
                          >
                            Quitar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 hairline-t space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">Total</span>
                  <span className="font-display text-2xl text-gold">{formatPrice(total)}</span>
                </div>
                <Link href="/carrito" onClick={closeCart} className="btn-ghost w-full">
                  Ver la selección
                </Link>
                <Link href="/checkout" onClick={closeCart} className="btn-primary w-full">
                  Finalizar pedido
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
