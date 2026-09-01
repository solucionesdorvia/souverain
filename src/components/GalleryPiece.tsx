"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { AvisoAnada } from "@/components/AvisoAnada";

export type GalleryPieceData = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  origin: string;
  price: number;
  imageUrl: string;
  isExclusive?: boolean;
  checkoutMode?: string;
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
        {/* En 2 columnas de mobile no entran las dos etiquetas con el tracking
            completo: se acorta a "N.º 01" y se achica el interletrado. */}
        <div className="flex items-baseline justify-between gap-3 mb-4">
          <span className="label-souv tracking-[0.18em] sm:tracking-[0.3em] whitespace-nowrap">
            <span className="hidden sm:inline">Pieza </span>N.º {num}
          </span>
          {piece.isExclusive && (
            <span className="text-[9px] uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold whitespace-nowrap">
              Luxury Black
            </span>
          )}
        </div>
        {/* anchos reales de la tarjeta: 2 columnas hasta xl y 3 desde xl, con el
            contenedor topeado en 1400px (de ahí el valor fijo del último tramo) */}
        <div className="relative aspect-[3/4] bg-surface hairline overflow-hidden">
          <Image
            src={piece.imageUrl}
            alt={piece.name}
            fill
            sizes="(max-width: 1023px) 45vw, (max-width: 1279px) 30vw, 320px"
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
          <div className="caption line-clamp-1">{piece.origin}</div>
          <AvisoAnada name={piece.name} imageUrl={piece.imageUrl} className="mt-0.5" />
          <div className="mb-3" />
          {/* price 0 = todavía no cargaron la lista. Mostrar "$ 0" se lee como un
              error, así que hasta que haya precio la pieza va como consulta. */}
          {piece.checkoutMode === "CONSULTAR" || piece.price === 0 ? (
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold/80">Consultar →</span>
          ) : (
            <div className="text-sm text-ink/90 tracking-wide">{formatPrice(piece.price)}</div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
