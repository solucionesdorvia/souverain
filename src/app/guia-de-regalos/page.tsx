import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { GiftGuideClient } from "@/components/GiftGuideClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Guía de Regalos — Souverain",
  description:
    "La botella perfecta para cada ocasión. Selección curada por precio, momento y personalidad. Entrega con packaging de regalo sin cargo.",
};

const REASONS = [
  {
    n: "01",
    title: "El regalo que no se olvida",
    body: "Una botella excepcional deja una impresión que un voucher o un sobre nunca podrían. Es tangible, es personal y tiene historia.",
  },
  {
    n: "02",
    title: "Packaging incluido",
    body: "Caja Souverain, papel de seda y tarjeta escrita a mano. Sin costo adicional en cada pedido de regalo.",
  },
  {
    n: "03",
    title: "Entrega en fecha exacta",
    body: "CABA y GBA en 24–48 horas. Coordinamos la entrega el día del evento, en el lugar indicado.",
  },
  {
    n: "04",
    title: "Asesoría sin compromiso",
    body: "No sabés qué elegir. Escribinos con el contexto y un sommelier te da la recomendación en el día.",
  },
];

export default async function GuiaRegalosPage() {
  const products = await prisma.product.findMany({
    orderBy: { price: "asc" },
    select: {
      id: true, slug: true, name: true, brand: true, price: true, imageUrl: true,
      isExclusive: true, category: { select: { slug: true } },
    },
  });

  return (
    <div className="bg-background min-h-screen pb-14">
      {/* HERO — fullscreen lookbook */}
      <section className="relative h-screen flex flex-col overflow-hidden -mt-20">
        {/* Grid de imágenes de fondo */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-1">
          <div className="relative col-span-2">
            <Image
              src="https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1600&auto=format&fit=crop"
              alt="Regalo de lujo"
              fill
              priority
              sizes="66vw"
              className="object-cover"
            />
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop"
              alt="Whisky de regalo"
              fill
              sizes="34vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />

        {/* Top nav line */}
        <div className="relative container-souv pt-28">
          <Reveal>
            <div className="eyebrow-gold">Curación Souverain · Regalo de alto impacto</div>
          </Reveal>
        </div>

        {/* Headline centrada */}
        <div className="relative flex-1 flex flex-col items-start justify-center container-souv">
          <Reveal delay={0.06}>
            <h1 className="font-display text-[clamp(3rem,9vw,8rem)] italic leading-[0.92] text-ink max-w-3xl mb-6">
              El regalo perfecto existe.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-ink/60 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
              Una botella bien elegida dice más que cualquier tarjeta.
              Seleccioná la ocasión y el presupuesto — nosotros hacemos el resto.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#guia" className="btn-primary">Explorar la guía</a>
              <Link href="/contacto" className="btn-ghost">Pedir asesoramiento</Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom strip */}
        <div className="relative container-souv pb-8">
          <Reveal delay={0.28}>
            <div className="flex gap-8 text-[10px] tracking-[0.3em] text-mute uppercase">
              <span>Packaging incluido</span>
              <span>·</span>
              <span>Entrega coordinada</span>
              <span>·</span>
              <span>Asesor disponible</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Por qué regalar una botella */}
      <section className="hairline-t bg-surface/30">
        <div className="container-souv py-20 md:py-28">
          <Reveal className="mb-16">
            <div className="eyebrow-gold mb-4">Cuatro razones</div>
            <h2 className="display-2 max-w-xl">
              Por qué una botella es el mejor <span className="italic">regalo.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {REASONS.map((r, i) => (
              <Reveal key={r.n} delay={i * 0.08}>
                <div>
                  <div className="font-mono text-[9px] tracking-[0.5em] text-gold/50 mb-5">{r.n}</div>
                  <div className="eyebrow mb-3">{r.title}</div>
                  <p className="text-mute text-sm leading-relaxed">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax editorial */}
      <section className="relative h-52 md:h-64 overflow-hidden hairline-t">
        <Parallax offset={50}>
          <Image
            src="https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?q=80&w=2000&auto=format&fit=crop"
            alt="Vino de regalo"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </Parallax>
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal>
            <p className="font-display italic text-2xl md:text-4xl text-ink/70 text-center px-6">
              "Las mejores botellas no necesitan excusa."
            </p>
          </Reveal>
        </div>
      </section>

      {/* GUÍA DE REGALOS — tabs por ocasión */}
      <section id="guia" className="container-souv py-20 md:py-28">
        <Reveal className="mb-12">
          <div className="eyebrow-gold mb-4">Seleccioná la ocasión</div>
          <h2 className="display-3 max-w-xl">
            La selección perfecta para cada <span className="italic">momento.</span>
          </h2>
        </Reveal>
        <GiftGuideClient products={products} />
      </section>

      {/* Servicio de regalos */}
      <section className="hairline-t">
        <div className="container-souv py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-video lg:aspect-square hairline overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1200&auto=format&fit=crop"
                alt="Packaging Souverain"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <div className="eyebrow-gold mb-1">Packaging de regalo</div>
                <p className="text-ink/70 text-sm">Incluido sin cargo en cada pedido</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <div className="eyebrow-gold mb-5">El servicio completo</div>
              <h2 className="display-3 mb-8">
                Del pedido a la <span className="italic">puerta.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { step: "1.", text: "Seleccionás la botella por ocasión y presupuesto." },
                  { step: "2.", text: "La preparamos en caja de regalo con tarjeta personalizada." },
                  { step: "3.", text: "Coordinamos la entrega en la fecha y lugar exacto." },
                  { step: "4.", text: "El destinatario recibe algo que va a recordar." },
                ].map(s => (
                  <div key={s.step} className="flex gap-5 items-start">
                    <span className="font-display text-gold text-xl shrink-0">{s.step}</span>
                    <p className="text-ink/70 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/tienda" className="btn-primary">Ver toda la colección</Link>
                <Link href="/contacto" className="btn-ghost">Necesito ayuda para elegir</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
