"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/tienda", label: "La Colección" },
  { href: "/ediciones-limitadas", label: "Drops" },
  { href: "/on-premise", label: "On Premise" },
  { href: "/nosotros", label: "La Casa" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-soft",
          scrolled ? "bg-background/90 backdrop-blur-md hairline-b" : "bg-transparent",
        )}
      >
        <div className="container-souv flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center group text-ink" aria-label="Souverain — inicio">
            <Logo variant="header" />
          </Link>
          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map((n) => (
              <Link
                key={n.href + n.label}
                href={n.href}
                className="text-[11px] uppercase tracking-[0.25em] text-ink/80 hover:text-gold transition-colors duration-500"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/tienda"
              aria-label="Buscar"
              className="hidden md:inline-flex p-2 text-ink/70 hover:text-gold transition-colors duration-500"
            >
              <Search size={18} strokeWidth={1.2} />
            </Link>
            <button
              onClick={openCart}
              aria-label="Carrito"
              className="relative p-2 text-ink/80 hover:text-gold transition-colors duration-500"
            >
              <ShoppingBag size={20} strokeWidth={1.2} />
              {count > 0 && (
                <span className="absolute -top-0 -right-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center bg-gold text-background text-[10px] font-medium">
                  {count}
                </span>
              )}
            </button>
            <button
              className="lg:hidden p-2 text-ink"
              aria-label="Menú"
              onClick={() => setMobile(true)}
            >
              <Menu size={22} strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </header>
      <div className="h-20" aria-hidden />

      {/* Mobile drawer */}
      {mobile && (
        <div className="fixed inset-0 z-[60] bg-background animate-fade-in">
          <div className="container-souv flex h-20 items-center justify-between">
            <Logo variant="header" />
            <button onClick={() => setMobile(false)} aria-label="Cerrar" className="p-2">
              <X size={22} strokeWidth={1.2} />
            </button>
          </div>
          <nav className="container-souv flex flex-col gap-8 pt-16">
            {NAV.map((n) => (
              <Link
                key={n.href + n.label}
                href={n.href}
                onClick={() => setMobile(false)}
                className="font-display text-3xl text-ink hover:text-gold transition-colors duration-500"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
