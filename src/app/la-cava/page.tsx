import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CellarGrid } from "@/components/CellarGrid";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { VariantSwitcher } from "@/components/VariantSwitcher";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "La Cava — Colección Permanente · Souverain",
  description:
    "El archivo completo de Distribuidora Souverain. Cada pieza seleccionada, catalogada y disponible para su cava privada.",
};

export default async function LaCavaPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      include: { category: true },
      orderBy: [{ isExclusive: "desc" }, { price: "desc" }],
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const mapped = products.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    origin: p.origin,
    price: p.price,
    imageUrl: p.imageUrl,
    tastingNotes: p.tastingNotes,
    stock: p.stock,
    categorySlug: p.category.slug,
  }));

  return (
    <div className="bg-background min-h-screen pb-14">
      {/* HERO — fullscreen archivístico */}
      <section className="relative h-screen flex flex-col justify-end overflow-hidden -mt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2400&auto=format&fit=crop"
            alt="La Cava Souverain"
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
        </div>

        {/* Archive metadata — top */}
        <div className="absolute top-24 left-0 right-0">
          <div className="container-souv">
            <Reveal>
              <div className="font-mono text-[9px] tracking-[0.6em] text-gold/50 uppercase">
                Distribuidora Souverain · Archivo General · Colección Permanente
              </div>
            </Reveal>
          </div>
        </div>

        {/* Headline — bottom */}
        <div className="relative container-souv pb-20 md:pb-28">
          <Reveal delay={0.06}>
            <div className="font-mono text-[9px] tracking-[0.5em] text-mute mb-6 uppercase">
              {products.length} piezas catalogadas · {categories.length} categorías
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-crest text-[clamp(3.5rem,10vw,9rem)] leading-none tracking-tight text-ink mb-6 max-w-4xl">
              La Cava
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-ink/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              No todas las botellas están en una vinoteca. Las que importan
              están aquí — documentadas, guardadas, disponibles.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#coleccion" className="btn-primary">Explorar la colección</a>
              <Link href="/on-premise" className="btn-ghost">Abrir cuenta On Premise</Link>
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-10 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[8px] tracking-[0.5em] text-mute uppercase rotate-90 mb-4">Scroll</span>
          <div className="w-px h-12 bg-mute/60" />
        </div>
      </section>

      {/* Stats band */}
      <section className="hairline-b bg-surface/40">
        <div className="container-souv py-10">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-hairline">
              {[
                { n: `${products.length}`, l: "Piezas en el archivo" },
                { n: `${products.filter(p => p.isExclusive).length}`, l: "Luxury Black" },
                { n: `${products.filter(p => p.stock > 0).length}`, l: "Disponibles ahora" },
                { n: "180+", l: "Referencias anuales" },
              ].map(s => (
                <div key={s.l} className="md:pl-8 first:pl-0">
                  <div className="font-display text-4xl text-gold mb-1">{s.n}</div>
                  <div className="text-[10px] tracking-[0.25em] text-mute uppercase">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Manifesto */}
      <section className="container-souv py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <div className="eyebrow-gold mb-5">El criterio Souverain</div>
            <h2 className="display-2 mb-0">
              No cuantificamos.<br />
              <span className="italic">Calificamos.</span>
            </h2>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-ink/70 leading-relaxed">
            <Reveal>
              <p>
                Cada botella que entra a nuestra cava pasa por la misma pregunta:
                ¿merece el espacio que ocupa? No trabajamos con volumen. Trabajamos
                con criterio. Eso significa que el catálogo es deliberadamente pequeño
                y permanentemente actualizado.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <p>
                Bodegas, maisons y casas de licor con las que tenemos acceso directo.
                Sin importadores intermediarios para las referencias que más importan.
                El resultado: botellas que no se consiguen en canales convencionales.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-display italic text-xl text-ink/50">
                "Una cava sin criterio es solo un depósito."
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Parallax break */}
      <section className="relative h-64 md:h-80 overflow-hidden hairline-y">
        <Parallax offset={60}>
          <Image
            src="https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?q=80&w=2000&auto=format&fit=crop"
            alt="Colección Souverain"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </Parallax>
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal>
            <p className="font-display italic text-3xl md:text-5xl text-ink text-center max-w-2xl px-6">
              "Solo entra lo que quisiéramos tener en nuestra propia cava."
            </p>
          </Reveal>
        </div>
      </section>

      {/* COLECCIÓN — masonry archive */}
      <section id="coleccion" className="container-souv py-20 md:py-28">
        <Reveal className="mb-12">
          <div className="flex items-end justify-between">
            <div>
              <div className="eyebrow-gold mb-3">Archivo general</div>
              <h2 className="display-3">Toda la colección</h2>
            </div>
            <div className="font-mono text-[9px] tracking-[0.4em] text-mute hidden md:block">
              Hover sobre cada pieza para ver la ficha completa
            </div>
          </div>
        </Reveal>
        <CellarGrid products={mapped} categories={categories} />
      </section>

      {/* CTA final */}
      <section className="hairline-t">
        <div className="container-souv py-24 md:py-32 text-center">
          <Reveal>
            <div className="eyebrow-gold mb-5">¿Buscás algo en particular?</div>
            <h2 className="display-2 mb-6 max-w-2xl mx-auto">
              Si no lo ves aquí,<br />
              <span className="italic">lo conseguimos.</span>
            </h2>
            <p className="text-mute max-w-md mx-auto mb-10 leading-relaxed">
              Trabajamos sobre pedido para referencias fuera del catálogo.
              Contanos qué estás buscando.
            </p>
            <Link href="/contacto" className="btn-primary">Consultar disponibilidad</Link>
          </Reveal>
        </div>
      </section>

      <VariantSwitcher />
    </div>
  );
}
