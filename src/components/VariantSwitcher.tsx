"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANTS = [
  { href: "/", label: "Home", style: "Original · Dark Luxury" },
  { href: "/la-cava", label: "La Cava", style: "Archivo · Museo" },
  { href: "/maridajes", label: "Maridajes", style: "Editorial · Magazine" },
  { href: "/guia-de-regalos", label: "Regalos", style: "Lookbook · Ocasiones" },
  { href: "/ediciones-limitadas", label: "Drops", style: "Hype · Scarcity" },
  { href: "/on-premise", label: "On Premise", style: "B2B · Corporate" },
];

export function VariantSwitcher() {
  const pathname = usePathname();
  const current = VARIANTS.findIndex(v => v.href === pathname);
  if (current === -1) return null;

  const prev = current > 0 ? VARIANTS[current - 1] : null;
  const next = current < VARIANTS.length - 1 ? VARIANTS[current + 1] : null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-abyss/95 backdrop-blur-md border-t border-hairline">
      <div className="container-souv h-14 flex items-center justify-between gap-4">

        {/* Prev */}
        <div className="w-28 flex justify-start">
          {prev ? (
            <Link
              href={prev.href}
              className="flex items-center gap-1.5 text-mute hover:text-gold transition-colors duration-300 group"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-[10px] uppercase tracking-[0.25em] hidden sm:block">{prev.label}</span>
            </Link>
          ) : <span />}
        </div>

        {/* Dots + current info */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            {VARIANTS.map((v, i) => (
              <Link key={v.href} href={v.href} title={`Variante ${i + 1}: ${v.label}`}>
                <div className={cn(
                  "transition-all duration-300",
                  i === current
                    ? "w-6 h-1.5 bg-gold"
                    : "w-1.5 h-1.5 bg-mute/40 hover:bg-mute rounded-full"
                )} />
              </Link>
            ))}
          </div>
          <div className="text-[9px] tracking-[0.4em] text-mute uppercase">
            Variante {current + 1} de {VARIANTS.length} · {VARIANTS[current].style}
          </div>
        </div>

        {/* Next */}
        <div className="w-28 flex justify-end">
          {next ? (
            <Link
              href={next.href}
              className="flex items-center gap-1.5 text-mute hover:text-gold transition-colors duration-300 group"
            >
              <span className="text-[10px] uppercase tracking-[0.25em] hidden sm:block">{next.label}</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : <span />}
        </div>

      </div>
    </div>
  );
}
