import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Distribuidora Souverain — casa de bebidas premium en Buenos Aires.",
};

export default function NosotrosPage() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden -mt-20">
        <Image
          src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2400&auto=format&fit=crop"
          alt="Cava Souverain"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="relative container-souv pb-16">
          <Reveal>
            <div className="eyebrow-gold mb-4">Desde 1998 · On Premise</div>
            <h1 className="display-1 max-w-4xl">
              La casa <span className="italic">Souverain.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="container-souv py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="eyebrow-gold mb-6">Nuestra historia</div>
            <h2 className="display-2 mb-8">
              Una distribuidora nacida en una <span className="italic">cava.</span>
            </h2>
          </Reveal>
          <div className="lg:col-span-7 space-y-6 text-ink/90 leading-relaxed">
            <Reveal>
              <p>
                Souverain comenzó como la cava personal de tres amigos obsesionados con el
                whisky escocés y los grandes champagnes. Lo que arrancó como un intercambio
                entre coleccionistas se convirtió, casi sin proponérselo, en distribuidora
                cuando un restaurante de Recoleta nos pidió ayuda para armar su carta.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p>
                Hoy nuestro foco es <span className="italic">On Premise</span> — la curaduría
                de cartas para hoteles, restaurantes, bares de autor y clubes privados del
                AMBA — con un servicio paralelo para coleccionistas y cavas particulares.
                Trabajamos sobre referencias que normalmente solo se encuentran en cavas
                privadas o subastas internacionales.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-mute">
                Trabajamos directo con bodegas, maisons y casas de licor. Cada botella que
                sale de nuestra distribución pasa por la misma pregunta: <span className="italic text-ink">¿merece estar
                en su cava?</span>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="hairline-t bg-surface/30">
        <div className="container-souv py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { n: "27", l: "Años en el rubro" },
              { n: "180+", l: "Referencias activas" },
              { n: "60+", l: "Hoteles y restaurantes atendidos" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 0.1}>
                <div className="font-display text-7xl md:text-8xl text-gold mb-3">{s.n}</div>
                <div className="eyebrow">{s.l}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-souv py-24 md:py-32 text-center">
        <Reveal>
          <div className="eyebrow-gold mb-6">La casa recibe</div>
          <h2 className="display-2 mb-6 max-w-3xl mx-auto">
            Las puertas están abiertas de lunes a viernes.
          </h2>
          <p className="text-mute mb-3">{SITE.address}</p>
          <p className="text-mute mb-10">{SITE.hours}</p>
          <Link href="/contacto" className="btn-primary">Cómo llegar</Link>
        </Reveal>
      </section>
    </>
  );
}
