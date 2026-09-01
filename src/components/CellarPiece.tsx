"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { precioPublico } from "@/lib/utils";
import { AvisoAnada } from "@/components/AvisoAnada";

export type CellarPieceData = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  origin: string;
  price: number;
  imageUrl: string;
  tastingNotes: string;
  stock: number;
  categorySlug: string;
};

export function CellarPiece({ piece, index = 0 }: { piece: CellarPieceData; index?: number }) {
  const archiveNum = `CAV-${String(index + 1).padStart(3, "0")}`;
  const isOut = piece.stock === 0;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.04, 0.32) }}
      className="group relative break-inside-avoid mb-6 md:mb-8"
    >
      <Link href={`/producto/${piece.slug}`} className="block">
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="font-mono text-[9px] tracking-[0.45em] text-gold/40">{archiveNum}</span>
          {isOut && (
            <span className="text-[9px] tracking-[0.3em] text-mute/60 line-through">AGOTADO</span>
          )}
        </div>

        <div className={`relative overflow-hidden hairline ${isOut ? "grayscale opacity-40" : ""}`}>
          <Image
            src={piece.imageUrl}
            alt={piece.name}
            width={600}
            height={900}
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="w-full h-auto object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
          />

          {/* Museum hover overlay */}
          <div className="absolute inset-0 bg-abyss/92 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 ease-soft flex flex-col justify-end p-5 md:p-6">
            <div className="text-[9px] tracking-[0.35em] text-gold mb-2">{piece.brand}</div>
            <h3 className="font-display text-lg md:text-xl text-ink mb-2 leading-tight">{piece.name}</h3>
            <p className="text-mute text-xs mb-4 leading-relaxed line-clamp-3 font-display italic">
              {piece.tastingNotes}
            </p>
            <div className="flex items-center justify-between hairline-t pt-3">
              <span className="text-[10px] text-mute tracking-wide">{piece.origin}</span>
              <span className="text-sm text-gold tabular-nums">
                {precioPublico(piece.price) ?? "Consultar"}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 px-0.5">
          <div className="text-[9px] tracking-[0.3em] text-mute mb-1 uppercase">{piece.brand}</div>
          <h3 className="font-display text-base md:text-lg text-ink leading-tight">{piece.name}</h3>
          <AvisoAnada name={piece.name} imageUrl={piece.imageUrl} className="mt-1" />
        </div>
      </Link>
    </motion.article>
  );
}
