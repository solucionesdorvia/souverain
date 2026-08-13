import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";

export const metadata: Metadata = {
  title: "Arte del Maridaje — Souverain",
  description:
    "Seis encuentros entre nuestras botellas y la gastronomía de nivel. Una guía editorial curada por el equipo Souverain.",
};

const PAIRINGS = [
  {
    numeral: "I",
    bottle: "The Macallan 18 Sherry Oak",
    slug: "macallan-18-sherry-oak",
    category: "Whisky · Speyside, Escocia",
    food: "Trufa negra Périgord y charcutería curada",
    foodImg: "https://images.unsplash.com/photo-1452195100486-9cc805987862?q=80&w=1200&auto=format&fit=crop",
    bottleImg: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop",
    quote: "La trufa y el whisky escocés comparten un idioma que solo el invierno conoce.",
    body: "El Macallan de 18 años, envejecido en jerez, despliega naranja confitada, clavo y chocolate amargo que amplifican el perfume terroso de la trufa negra. La grasa del hongo equilibra el tanino del roble europeo, alargando el final más de lo que cualquier maridaje convencional prometería.",
    tip: "Servirlo a 18°C en copa Glencairn, quince minutos antes del primer bocado.",
  },
  {
    numeral: "II",
    bottle: "Dom Pérignon Vintage 2013",
    slug: "dom-perignon-vintage-2013",
    category: "Champagne · Épernay, Francia",
    food: "Ostras finas de Bretaña con mignonette",
    foodImg: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
    bottleImg: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=800&auto=format&fit=crop",
    quote: "Las burbujas limpian. Las ostras responden.",
    body: "La acidez vertical del Dom Pérignon 2013 y su mousse fino funcionan como contrapunto exacto para la salinidad mineral de la ostra. El champagne abre el paladar, la ostra lo cierra. Es una de las pocas combinaciones donde cada elemento potencia al otro sin competir.",
    tip: "Temperatura ideal: 8°C. Copa tulipa para conservar la mousse durante el servicio.",
  },
  {
    numeral: "III",
    bottle: "Château Margaux 2015",
    slug: "chateau-margaux-2015",
    category: "Vino Tinto · Médoc, Burdeos, Francia",
    food: "Entrecôte madurado en cámara 60 días",
    foodImg: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    bottleImg: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?q=80&w=800&auto=format&fit=crop",
    quote: "El gran Médoc y la carne tienen una conversación que lleva siglos.",
    body: "El Margaux 2015, con taninos de terciopelo y notas de cassis, cedro y violeta, necesita proteínas para mostrarse en toda su extensión. El entrecôte dry-aged con su grasa marmolada templa los polifenoles y revela las capas más profundas del vino: tabaco rubio, grafito y tierra de jardín.",
    tip: "Decantar 90 minutos antes. Temperatura de servicio: 17°C.",
  },
  {
    numeral: "IV",
    bottle: "Krug Grande Cuvée 171ème Édition",
    slug: "krug-grande-cuvee-171",
    category: "Champagne · Reims, Francia",
    food: "Caviar Beluga con blinis y crème fraîche",
    foodImg: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?q=80&w=1200&auto=format&fit=crop",
    bottleImg: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=800&auto=format&fit=crop",
    quote: "Dos absolutos en una misma copa. Ninguno cede territorio.",
    body: "El Krug no es para acompañar: es para protagonizar. El caviar Beluga, con su untuosidad salina y sus notas de nuez, es uno de los pocos ingredientes capaces de pararse a la altura de este multivintage. La grasa del blinis actúa de puente, y la crème fraîche suaviza cualquier arista.",
    tip: "Cucharas de nácar o hueso. Nunca metal: oxida el caviar en segundos.",
  },
  {
    numeral: "V",
    bottle: "Hennessy Paradis Impérial",
    slug: "hennessy-paradis-imperial",
    category: "Cognac · Cognac, Francia",
    food: "Cigarro Cohiba Robustos",
    foodImg: "https://images.unsplash.com/photo-1559762729-b54a0d7bd05f?q=80&w=1200&auto=format&fit=crop",
    bottleImg: "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?q=80&w=800&auto=format&fit=crop",
    quote: "El cognac y el tabaco son primos que rara vez se reúnen. Cuando lo hacen, el tiempo se detiene.",
    body: "El Paradis Impérial evoluciona en copa mientras el Cohiba se consume: los taninos del tabaco y las notas de madera especiada del cognac se retroalimentan, sumando longitud al final de ambos. No es un maridaje de comida — es un ritual de cierre.",
    tip: "Servir después de cenar, con luz baja. Copa sniffer calentada con las manos.",
  },
  {
    numeral: "VI",
    bottle: "Lagavulin 16",
    slug: "lagavulin-16",
    category: "Whisky · Islay, Escocia",
    food: "Salmón ahumado escocés sobre blinis",
    foodImg: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1200&auto=format&fit=crop",
    bottleImg: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop",
    quote: "Humo sobre humo: cuando el terroir es el mismo en la copa y en el plato.",
    body: "La turba del Lagavulin no agrede cuando se encuentra con proteínas ahumadas. El salmón ahumado sobre blinis con crème fraîche crea un eco marino con el whisky que solo puede entenderse en la boca. El yodo del Islay y la grasa del salmón se funden en un final largo, dulce y marino.",
    tip: "Agregar un splash de agua fría al whisky para abrir los aromas antes del maridaje.",
  },
];

export default function MaridajesPage() {
  return (
    <div className="bg-background min-h-screen pb-14">
      {/* HERO fullscreen editorial */}
      <section className="relative h-screen flex flex-col justify-between overflow-hidden -mt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2400&auto=format&fit=crop"
            alt="Arte del Maridaje"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        </div>

        {/* Top eyebrow */}
        <div className="relative container-souv pt-28">
          <Reveal>
            <div className="eyebrow-gold">Guía editorial · Curada por Souverain</div>
          </Reveal>
        </div>

        {/* Center headline */}
        <div className="relative container-souv text-center">
          <Reveal delay={0.08}>
            <div className="font-display italic text-[clamp(4rem,12vw,11rem)] leading-none text-ink">
              El arte del
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="font-crest text-[clamp(2rem,7vw,6rem)] leading-tight tracking-widest text-gold">
              MARIDAJE
            </div>
          </Reveal>
        </div>

        {/* Bottom row */}
        <div className="relative container-souv pb-20 flex items-end justify-between">
          <Reveal delay={0.2}>
            <p className="text-ink/60 max-w-sm leading-relaxed">
              Seis encuentros entre nuestras botellas y la gastronomía de nivel.
              No son reglas — son puntos de partida.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <a href="#pairings" className="btn-ghost hidden md:inline-flex">
              Comenzar ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* Intro manifesto */}
      <section className="container-souv py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="font-display italic text-2xl md:text-4xl text-ink/60 leading-relaxed">
              "Un buen maridaje no anula: multiplica. La botella correcta con el
              plato correcto hace que ambos sean mejores de lo que serían solos."
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="eyebrow mt-8 text-mute">— Equipo Souverain</div>
          </Reveal>
        </div>
      </section>

      {/* PAIRINGS */}
      <div id="pairings">
        {PAIRINGS.map((p, i) => (
          <section key={p.numeral} className="relative hairline-t">
            {/* Numeral background art */}
            <div aria-hidden className="absolute inset-y-0 right-0 flex items-center pointer-events-none select-none overflow-hidden">
              <span className="font-display italic text-[25vw] leading-none text-ink/[0.025] pr-8">
                {p.numeral}
              </span>
            </div>

            <div className={`container-souv py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center relative ${i % 2 !== 0 ? "lg:[&>*:first-child]:order-last" : ""}`}>
              {/* Imagen del alimento */}
              <Reveal className="lg:col-span-7" delay={0.04}>
                <div className="relative aspect-[4/3] overflow-hidden hairline group">
                  <Image
                    src={p.foodImg}
                    alt={p.food}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/80 bg-abyss/70 backdrop-blur-sm px-3 py-1.5">
                      {p.food}
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Contenido editorial */}
              <Reveal className="lg:col-span-5" delay={0.1}>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-display italic text-6xl text-gold/30 leading-none">{p.numeral}</span>
                  <div className="flex-1 hairline-t" />
                </div>

                <div className="eyebrow-gold mb-3">{p.category}</div>
                <Link
                  href={`/producto/${p.slug}`}
                  className="font-display text-3xl md:text-4xl text-ink hover:text-gold transition-colors duration-500 block leading-tight mb-8"
                >
                  {p.bottle}
                </Link>

                <blockquote className="border-l-2 border-gold/40 pl-5 mb-6">
                  <p className="font-display italic text-xl text-ink/65 leading-relaxed">
                    "{p.quote}"
                  </p>
                </blockquote>

                <p className="text-ink/65 leading-relaxed text-sm mb-8">{p.body}</p>

                <div className="hairline p-4 bg-surface/40">
                  <div className="eyebrow mb-2 text-gold">Nota del sommelier</div>
                  <p className="text-mute text-sm leading-relaxed">{p.tip}</p>
                </div>

                <div className="mt-8 flex items-center gap-6">
                  <Link href={`/producto/${p.slug}`} className="btn-link text-sm">
                    Ver la botella →
                  </Link>
                  <Link href="/carrito" className="btn-ghost text-sm">
                    Agregar al carrito
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>
        ))}
      </div>

      {/* Break editorial intermedio */}
      <section className="relative h-72 overflow-hidden hairline-t">
        <Parallax offset={60}>
          <Image
            src="https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=2000&auto=format&fit=crop"
            alt="Champagne Souverain"
            fill
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </Parallax>
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal>
            <p className="font-crest text-2xl md:text-4xl text-gold tracking-widest text-center">
              DISTRIBUIDORA SOUVERAIN
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA final */}
      <section className="hairline-t">
        <div className="container-souv py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="eyebrow-gold mb-4">La colección espera</div>
            <h2 className="display-2 mb-6">
              Cada botella tiene<br />
              su <span className="italic">momento.</span>
            </h2>
            <p className="text-mute leading-relaxed max-w-sm mb-10">
              Explorá la colección completa o consultá a nuestro equipo para armar
              el maridaje perfecto para tu próximo evento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tienda" className="btn-primary">Explorar la colección</Link>
              <Link href="/contacto" className="btn-ghost">Consultar al equipo</Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[3/4] hairline overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=800&auto=format&fit=crop"
                alt="Whisky Souverain"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
