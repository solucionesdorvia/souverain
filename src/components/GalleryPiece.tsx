"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export type GalleryPieceData = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  origin: string;
  price: number;
  imageUrl: string;
  isExclusive?: boolean;
};

/**
 * Tratamiento de galería / casa de subastas: cada producto es una "pieza"
 * numerada, con marco hairline, ficha técnica y precio discreto.
 */
export function GalleryPiece({
  piece,
  number,
  index = 0,
  className,
}: {
  piece: GalleryPieceData;
  number: number;
  index?: number;
  className?: string;
}) {
  const num = String(number).padStart(2, "0");
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.08, 0.32) }}
      className={cn("group", className)}
    >
      <Link href={`/producto/${piece.slug}`} className="block">
        <div className="flex items-baseline justify-between mb-4">
          <span className="label-souv">Pieza N.º {num}</span>
          {piece.isExclusive && (
            <span className="text-[9px] uppercase tracking-[0.3em] text-gold">
              Luxury Black
            </span>
          )}
        </div>
        <div className="relative aspect-[3/4] bg-surface hairline overflow-hidden">
          <Image
            src={piece.imageUrl}
            alt={piece.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-soft">
            <span className="inline-block w-full text-center text-[10px] uppercase tracking-[0.3em] text-ivory bg-abyss/80 backdrop-blur-sm hairline px-4 py-3">
              Ver la pieza
            </span>
          </div>
        </div>
        <div className="pt-5">
          <div className="label-souv mb-2">{piece.brand}</div>
          <h3 className="font-display text-xl md:text-2xl leading-tight text-ink mb-1">
            {piece.name}
          </h3>
          <div className="caption mb-3 line-clamp-1">{piece.origin}</div>
          <div className="text-sm text-ink/90 tracking-wide">{formatPrice(piece.price)}</div>
        </div>
      </Link>
    </motion.article>
  );
}
