"use client";

import { useState } from "react";
import { CellarPiece, type CellarPieceData } from "@/components/CellarPiece";

type Category = { id: string; name: string; slug: string };

export function CellarGrid({
  products,
  categories,
}: {
  products: CellarPieceData[];
  categories: Category[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? products.filter(p => p.categorySlug === active) : products;

  return (
    <>
      {/* Archive filters */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-12 md:mb-16 hairline-b pb-8">
        <button
          onClick={() => setActive(null)}
          className={`text-[10px] uppercase tracking-[0.35em] transition-colors duration-300 ${
            active === null ? "text-gold underline underline-offset-4 decoration-gold/50" : "text-mute hover:text-ink"
          }`}
        >
          Toda la colección
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.slug)}
            className={`text-[10px] uppercase tracking-[0.35em] transition-colors duration-300 ${
              active === cat.slug ? "text-gold underline underline-offset-4 decoration-gold/50" : "text-mute hover:text-ink"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="eyebrow text-mute mb-8">
        {filtered.length} piezas en la colección permanente
      </div>

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-6 md:gap-8">
        {filtered.map((p, i) => (
          <CellarPiece key={p.id} piece={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-mute">Sin piezas en esta categoría actualmente.</p>
        </div>
      )}
    </>
  );
}
