"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { precioPublico } from "@/lib/utils";

type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  isExclusive: boolean;
  category: { slug: string } | null;
};

type Occasion = {
  key: string;
  label: string;
  description: string;
  /** Categorías que se muestran en esta ocasión. Vacío = todo el catálogo. */
  categorias: string[];
};

// Las solapas de ocasión cambiaban una frase y nada más: la grilla mostraba
// siempre lo mismo. Ahora cada una acota el catálogo por categoría.
const OCCASIONS: Occasion[] = [
  { key: "cumpleanos", label: "Cumpleaños", description: "La botella que hace memorable cualquier celebración.", categorias: ["champagne", "whisky"] },
  { key: "aniversario", label: "Aniversario", description: "Un momento que merece una selección a la altura.", categorias: ["champagne", "vinos"] },
  { key: "corporativo", label: "Corporativo", description: "El regalo que habla por usted antes de abrir la boca.", categorias: ["whisky", "cognac"] },
  { key: "navidad", label: "Navidad", description: "La maison, la bodega, el momento exacto del año.", categorias: ["champagne", "cognac", "vinos"] },
  { key: "sin-motivo", label: "Sin motivo", description: "Las mejores botellas no necesitan excusa.", categorias: [] },
];

const TIERS = [
  { key: "esencial", label: "Esencial", range: "Hasta $100.000", max: 10_000_000, min: 0 },
  { key: "premium", label: "Premium", range: "$100.000 – $300.000", max: 30_000_000, min: 10_000_000 },
  { key: "excepcional", label: "Excepcional", range: "Más de $300.000", max: Infinity, min: 30_000_000 },
];

export function GiftGuideClient({ products }: { products: Product[] }) {
  const [occasion, setOccasion] = useState("cumpleanos");
  const [tier, setTier] = useState("esencial");

  // Mientras no haya lista de precios cargada, todas las piezas valen 0 y el
  // filtro por presupuesto dejaba dos de las tres solapas vacías. Se muestra
  // sólo cuando hay precios de verdad.
  const hayPrecios = products.some(p => p.price > 0);
  const activeTier = TIERS.find(t => t.key === tier)!;
  const activeOcc = OCCASIONS.find(o => o.key === occasion)!;

  const candidatas = products
    .filter(p => !activeOcc.categorias.length || activeOcc.categorias.includes(p.category?.slug ?? ""))
    .filter(p => !hayPrecios || (p.price >= activeTier.min && p.price < activeTier.max))
    .sort((a, b) => Number(b.isExclusive) - Number(a.isExclusive));

  // Ordenar sólo por exclusividad devolvía seis Dom Pérignon seguidos. Se toma
  // de a una casa por vuelta, así las seis piezas son de marcas distintas
  // mientras el catálogo lo permita.
  const filtered: Product[] = [];
  const porCasa = new Map<string, Product[]>();
  for (const p of candidatas) {
    const cola = porCasa.get(p.brand) ?? [];
    cola.push(p);
    porCasa.set(p.brand, cola);
  }
  while (filtered.length < 6) {
    let entroAlguna = false;
    for (const cola of porCasa.values()) {
      const p = cola.shift();
      if (!p) continue;
      filtered.push(p);
      entroAlguna = true;
      if (filtered.length === 6) break;
    }
    if (!entroAlguna) break;
  }

  return (
    <div>
      {/* Occasion tabs */}
      <div className="flex flex-wrap gap-2 md:gap-0 mb-16 hairline-b border-hairline">
        {OCCASIONS.map(occ => (
          <button
            key={occ.key}
            onClick={() => setOccasion(occ.key)}
            className={`px-5 md:px-8 py-4 text-[11px] uppercase tracking-[0.25em] border-b-2 transition-all duration-300 -mb-px ${
              occasion === occ.key
                ? "border-gold text-gold"
                : "border-transparent text-mute hover:text-ink"
            }`}
          >
            {occ.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={occasion}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Occasion description */}
          <p className="font-display italic text-2xl md:text-3xl text-ink/70 mb-12 max-w-xl">
            {activeOcc.description}
          </p>

          {/* Price tier selector */}
          {hayPrecios && (
          <div className="grid grid-cols-3 gap-3 md:gap-4 mb-12 max-w-2xl">
            {TIERS.map(t => (
              <button
                key={t.key}
                onClick={() => setTier(t.key)}
                className={`hairline p-4 md:p-5 text-left transition-all duration-300 ${
                  tier === t.key ? "border-gold/60 bg-gold/5" : "hover:border-mute/50"
                }`}
              >
                <div className={`text-[10px] uppercase tracking-[0.3em] mb-2 ${tier === t.key ? "text-gold" : "text-mute"}`}>
                  {t.label}
                </div>
                <div className="font-display text-sm text-ink/60">{t.range}</div>
              </button>
            ))}
          </div>
          )}

          {/* Product grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-10">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <Link href={`/producto/${product.slug}`} className="block">
                    <div className="relative aspect-[3/4] bg-surface hairline overflow-hidden mb-4">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 ease-soft group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-background/90 backdrop-blur-sm hairline px-4 py-3 text-center">
                          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">Ver detalle</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] tracking-[0.25em] text-mute uppercase mb-1">{product.brand}</div>
                    <h3 className="font-display text-lg text-ink leading-tight mb-2">{product.name}</h3>
                    <div className="text-sm text-gold tabular-nums">
                      {precioPublico(product.price) ?? "Consultar"}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="hairline p-16 text-center max-w-md">
              <p className="text-mute mb-4">No hay piezas disponibles en este rango actualmente.</p>
              <Link href="/tienda" className="btn-link">Ver toda la colección →</Link>
            </div>
          )}

          <div className="mt-12">
            <Link href="/tienda" className="btn-ghost">Ver la colección completa</Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
