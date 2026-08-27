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

// Las seis piezas salen del catálogo real. La versión anterior destacaba
// Macallan 18, Château Margaux, Krug 171, Hennessy Paradis y Lagavulin 16, que
// eran del stock de ejemplo: sus fichas daban 404 desde que se cargó el
// catálogo de Souverain. Las fotos de botella ahora son los packshots propios.
const PAIRINGS = [
  {
    numeral: "I",
    bottle: "The Glenlivet 18 Años",
    slug: "the-glenlivet-18-yo-50689",
    category: "Whisky · Speyside, Escocia",
    food: "Trufa negra Périgord y charcutería curada",
    bottleImg: "/productos/glenlivet-18.jpg",
    quote: "La trufa y el whisky escocés comparten un idioma que sólo el invierno conoce.",
    body: "Dieciocho años entre roble americano y europeo le dan al Glenlivet una capa de fruta seca, naranja y especia dulce que amplifica el perfume terroso de la trufa negra. La grasa del hongo templa el tanino del roble y alarga el final más de lo que promete cualquier maridaje convencional.",
    tip: "Servirlo a 18°C en copa Glencairn, quince minutos antes del primer bocado.",
  },
  {
    numeral: "II",
    bottle: "Dom Pérignon Blanc Vintage 2013",
    slug: "dom-perignon-blanc-vintage-2013-4438",
    category: "Champagne · Épernay, Francia",
    food: "Ostras finas de Bretaña con mignonette",
    bottleImg: "/productos/dp-2013.jpg",
    quote: "Las burbujas limpian. Las ostras responden.",
    body: "La acidez vertical del 2013 y su mousse fino funcionan como contrapunto exacto de la salinidad mineral de la ostra. El champagne abre el paladar, la ostra lo cierra. Es una de las pocas combinaciones donde cada elemento potencia al otro sin competir.",
    tip: "Temperatura ideal: 8°C. Copa tulipa para conservar la mousse durante el servicio.",
  },
  {
    numeral: "III",
    bottle: "Cheval des Andes 2022",
    slug: "cheval-des-andes-2022-4683",
    category: "Vino Tinto · Valle de Uco, Mendoza",
    food: "Entrecôte madurado en cámara 60 días",
    bottleImg: "/productos/cheval.jpg",
    quote: "Château Cheval Blanc cruzó el Atlántico y encontró malbec esperándolo.",
    body: "El corte de malbec y cabernet que nace del trabajo entre Cheval Blanc y Terrazas de los Andes tiene la estructura floral de un gran Médoc con la fruta de altura mendocina. Necesita proteína para mostrarse entero: el entrecôte madurado, con su grasa marmolada, ablanda los polifenoles y deja aparecer el tabaco y el grafito.",
    tip: "Decantar 90 minutos antes. Temperatura de servicio: 17°C.",
  },
  {
    numeral: "IV",
    bottle: "Krug Grande Cuvée 173ème Édition",
    slug: "krug-grande-cuvee-173eme-edition-4751",
    category: "Champagne · Reims, Francia",
    food: "Caviar Beluga con blinis y crème fraîche",
    bottleImg: "/productos/krug-gc.jpg",
    quote: "Dos absolutos en una misma copa. Ninguno cede territorio.",
    body: "El Krug no es para acompañar: es para protagonizar. El caviar Beluga, con su untuosidad salina y sus notas de nuez, es uno de los pocos ingredientes capaces de pararse a la altura de un ensamblaje de más de cien vinos. La grasa del blinis hace de puente y la crème fraîche suaviza cualquier arista.",
    tip: "Cucharas de nácar o hueso. Nunca metal: oxida el caviar en segundos.",
  },
  {
    numeral: "V",
    bottle: "Hennessy X.O.",
    slug: "hennessy-x-o-4643",
    category: "Cognac · Cognac, Francia",
    food: "Chocolate amargo 70% y cigarro",
    bottleImg: "/productos/hennessy-xo.jpg",
    quote: "El cognac y el tabaco son primos que rara vez se reúnen. Cuando lo hacen, el tiempo se detiene.",
    body: "El X.O., creado en 1870 y origen de toda la categoría, evoluciona en copa mientras el cigarro se consume: los taninos del tabaco y la fruta confitada del cognac se retroalimentan y suman longitud al final de ambos. El amargor del cacao levanta las notas de especia. No es un maridaje de comida, es un ritual de cierre.",
    tip: "Servir después de cenar, con luz baja. Copa sniffer calentada con las manos.",
  },
  {
    numeral: "VI",
    bottle: "Scapa Glansa",
    slug: "scapa-glansa-52219",
    category: "Whisky · Orkney, Escocia",
    food: "Salmón ahumado escocés sobre blinis",
    bottleImg: "/productos/scapa-glansa.jpg",
    quote: "Humo sobre humo: cuando el terroir es el mismo en la copa y en el plato.",
    body: "El Glansa termina su crianza en barricas que guardaron whisky turbado, así que el humo llega sin la agresión de un Islay. El salmón ahumado sobre blinis con crème fraîche crea un eco marino que sólo se entiende en la boca: el yodo de las islas y la grasa del pescado se funden en un final largo, dulce y salino.",
    tip: "Agregar un chorrito de agua fría al whisky para abrir los aromas antes del maridaje.",
  },
];

export default function MaridajesPage() {
  return (
    <div className="bg-background min-h-screen pb-14">
      {/* HERO fullscreen editorial */}
      <section className="relative h-screen flex flex-col justify-between overflow-hidden -mt-20">
        <div className="absolute inset-0">
          <Image
            src="/heros/maridajes.jpg"
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
                <div className="relative aspect-[4/3] overflow-hidden hairline group bg-abyss">
                  <Image
                    src={p.bottleImg}
                    alt={p.bottle}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-contain p-6 md:p-10 transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.03]"
                  />
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
            src="/heros/vert-champagne.jpg"
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
                src="/heros/vert-whisky.jpg"
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
