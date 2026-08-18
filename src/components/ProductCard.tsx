"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { precioPublico } from "@/lib/utils";

export type ProductCardData = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  origin: string;
  price: number;
  imageUrl: string;
  isExclusive?: boolean;
};

export function ProductCard({ product, index = 0 }: { product: ProductCardData; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.05, 0.3) }}
      className="group"
    >
      <Link href={`/producto/${product.slug}`} className="block">
        <div className="relative aspect-[3/4] bg-surface hairline overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-1000 ease-soft group-hover:scale-[1.04]"
          />
          {product.isExclusive && (
            <div className="absolute top-4 left-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold border border-gold/60 px-2 py-1 bg-background/50 backdrop-blur-sm">
                Luxury Black
              </span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-soft">
            <div className="bg-background/85 backdrop-blur-sm hairline px-4 py-3 text-center">
              <span className="text-[11px] uppercase tracking-[0.3em] text-gold">
                Ver detalle
              </span>
            </div>
          </div>
        </div>
        <div className="pt-5 pb-2">
          <div className="text-[11px] uppercase tracking-[0.25em] text-mute mb-2">
            {product.brand}
          </div>
          <h3 className="font-display text-xl md:text-2xl leading-tight text-ink mb-1">
            {product.name}
          </h3>
          <div className="text-xs text-mute mb-3 line-clamp-1">{product.origin}</div>
          {precioPublico(product.price) ? (
            <div className="text-sm text-ink/90 tracking-wide">{precioPublico(product.price)}</div>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Consultar &rarr;</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
