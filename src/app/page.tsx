import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { HeroCinematic } from "@/components/HeroCinematic";
import { ParallaxVideo } from "@/components/ParallaxVideo";
import { GalleryPiece } from "@/components/GalleryPiece";
import { prisma } from "@/lib/prisma";
import { separarFotosRepetidas } from "@/lib/orden-catalogo";

// Lee el catálogo en cada request, igual que /tienda.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Distribuidora Souverain — Casa de bebidas premium",
  description:
    "Distribución exclusiva de bebidas premium: Dom Pérignon, Veuve Clicquot, Krug, Hennessy, Chivas Regal, Terrazas de los Andes y Cheval des Andes, entre otras casas.",
};

// ─── Copa SVG decorativa ───────────────────────────────────────────────────────
function CopaSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14 6 L86 6 C86 6 100 64 76 92 C64 106 50 111 50 111 C50 111 36 106 24 92 C0 64 14 6 14 6 Z"
        stroke="currentColor" strokeWidth="1" fill="none"
      />
      <line x1="50" y1="111" x2="50" y2="150" stroke="currentColor" strokeWidth="1" />
      <path d="M16 150 Q16 161 50 161 Q84 161 84 150" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────────


const PAIRINGS = [
  {
    n: "I",
    wine: "Terrazas Grand Malbec",
    dish: "Costillar de cordero a la llama",
    note: "La intensidad del Malbec de altura se equilibra con la grasa profunda del cordero. La mineralidad limpia el paladar entre cada bocado.",
    temp: "Servir a 17°C",
    img: "/productos/terr-grand-malbec.jpg",
  },
  {
    n: "II",
    wine: "Moët & Chandon Brut Impérial",
    dish: "Tartar de salmón · Alcaparras · Blinis",
    note: "La acidez viva y la burbuja fina cortan la riqueza del salmón crudo. Un clásico de Épernay que nunca falla.",
    temp: "Servir a 8°C",
    img: "/productos/moet-brut.jpg",
  },
  {
    n: "III",
    wine: "Chivas Regal 18 Años",
    dish: "Tabla de quesos curados · Almendras",
    note: "La miel de acacia y vainilla del Chivas 18 dialoga de manera natural con los quesos añejos. Neat o con una única piedra de hielo.",
    temp: "Neat o con hielo",
    img: "/productos/chivas-18.jpg",
  },
];

const EXPERIENCES = [
  {
    n: "01",
    title: "Cata Privada",
    sub: "2 a 8 personas",
    body: "Sesión guiada de hora y media con nuestro sommelier. Selección personalizada según sus preferencias y nivel.",
  },
  {
    n: "02",
    title: "Maridaje de Autor",
    sub: "Con menú degustación",
    body: "Colaboramos con chefs selectos para construir experiencias donde cada vino es el hilo conductor del menú.",
  },
  {
    n: "03",
    title: "Armado de Cava",
    sub: "Asesoramiento personalizado",
    body: "Analizamos el espacio, las condiciones y el presupuesto para diseñar una colección que crezca con el tiempo.",
  },
  {
    n: "04",
    title: "Evento Corporativo",
    sub: "Desde 20 personas",
    body: "Coctelería de autor, barra de vinos y presentaciones de producto para eventos de alto nivel en CABA y GBA.",
  },
];

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  // Manda lo que Souverain marcó como insignia. Si algún día son menos de seis,
  // se completa con Luxury Black sin repetir casa, para que el home nunca quede
  // corto ni muestre seis veces la misma bodega.
  const [insignia, exclusivas] = await Promise.all([
    prisma.product.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({ where: { isExclusive: true }, orderBy: { createdAt: "desc" } }),
  ]);
  const casas = new Set(insignia.map((p) => p.brand));
  const relleno = [];
  for (const p of exclusivas) {
    if (casas.has(p.brand)) continue;
    casas.add(p.brand);
    relleno.push(p);
  }
  // separarFotosRepetidas evita tarjetas gemelas: las añadas de una etiqueta
  // comparten packshot y son justo estas piezas las que más se repiten.
  const destacadas = separarFotosRepetidas([...insignia, ...relleno]).slice(0, 6);

  return (
    <>
      {/* ══ 01 · HERO ══════════════════════════════════════════════════ */}
      <HeroCinematic videoSrc="/videos/hero.mp4" posterSrc="/videos/hero-poster.jpg">
        <div className="container-souv pb-28 md:pb-40 relative">

          {/* Copa SVG watermark */}
          <CopaSVG className="absolute right-8 md:right-16 bottom-8 w-28 md:w-40 text-gold/10 pointer-events-none" />

          <Reveal>
            <div className="flex items-center gap-3 mb-7">
              <CopaSVG className="w-5 text-gold/70" />
              <span className="eyebrow-gold tracking-[0.45em]">Buenos Aires · Argentina</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display text-[clamp(3.5rem,11vw,9.5rem)] tracking-[0.07em] leading-[0.93] uppercase text-ivory mb-6">
              Souverain
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-ivory/55 text-base md:text-lg leading-relaxed mb-3 max-w-md">
              Casa de bebidas premium. Distribución exclusiva de las mejores casas vitivinícolas y destilerías.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="flex flex-wrap gap-x-7 gap-y-2 mb-12 text-[10px] uppercase tracking-[0.3em] text-gold/60">
              <span>Dom Pérignon</span>
              <span>Veuve Clicquot</span>
              <span>Hennessy</span>
              <span>Chivas Regal</span>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#destacadas" className="btn-primary">Explorar la selección</a>
              <a href="#asesoramiento" className="btn-ghost">Asesoramiento privado →</a>
            </div>
          </Reveal>
        </div>
      </HeroCinematic>

      {/* ══ 02 · PIEZAS DESTACADAS ═════════════════════════════════════ */}
      <section id="destacadas" className="hairline-t">
        <div className="container-souv py-24 md:py-36">
          <Reveal className="mb-16">
            <div className="eyebrow-gold mb-4">La selección de la casa</div>
            <h2 className="display-2 max-w-xl">
              Seis piezas que<br />
              <span className="italic">nos representan.</span>
            </h2>
            <p className="text-mute text-base md:text-lg leading-relaxed max-w-xl mt-6">
              Champagne, cognac, whisky y vinos de altura. Un recorte de las
              casas que distribuimos; la colección completa está en la tienda.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-10">
            {destacadas.map((p, i) => (
              <GalleryPiece
                key={p.id}
                number={i + 1}
                index={i}
                piece={{
                  id: p.id,
                  slug: p.slug,
                  name: p.name,
                  brand: p.brand,
                  origin: p.origin,
                  price: p.price,
                  imageUrl: p.imageUrl,
                  isExclusive: p.isExclusive,
                  checkoutMode: p.checkoutMode,
                }}
              />
            ))}
          </div>

          <Reveal className="mt-16">
            <Link href="/tienda" className="btn-link">
              Ver la colección completa →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 03 · MARIDAJES EDITORIAL ═══════════════════════════════════ */}
      <section className="relative py-32 md:py-44 overflow-hidden hairline-t">
        <ParallaxVideo src="/videos/experience.mp4" poster="/videos/experience-poster.jpg" />
        <div className="absolute inset-0 bg-abyss/85" />
        <div className="relative container-souv">
          <Reveal className="mb-20 text-center">
            <div className="eyebrow-gold mb-4">Arte del maridaje</div>
            <h2 className="display-2 max-w-2xl mx-auto">
              La copa correcta cambia<br />
              <span className="italic">todo lo que hay en el plato.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-hairline hairline overflow-hidden">
            {PAIRINGS.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.12}>
                <div className="relative overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={p.img} alt={p.wine} fill sizes="33vw" className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-abyss/60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display italic text-[5rem] text-gold/20 leading-none">{p.n}</span>
                    </div>
                  </div>
                  <div className="p-7 md:p-8 bg-surface/30 backdrop-blur-sm">
                    <div className="eyebrow-gold mb-2">{p.wine}</div>
                    <h3 className="font-display text-lg md:text-xl leading-tight mb-3">{p.dish}</h3>
                    <p className="text-mute text-xs leading-relaxed mb-4">{p.note}</p>
                    <div className="label-souv text-gold/50">{p.temp}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 04 · EXPERIENCIAS ══════════════════════════════════════════ */}
      <section id="experiencias" className="hairline-t">
        <div className="container-souv py-24 md:py-36">
          <Reveal className="mb-16">
            <div className="eyebrow-gold mb-4">Experiencias privadas</div>
            <h2 className="display-2 max-w-xl">
              Más que una botella.<br />
              <span className="italic">Un momento.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline hairline overflow-hidden">
            {EXPERIENCES.map((e, i) => (
              <Reveal key={e.n} delay={i * 0.08}>
                <div className="group bg-background p-8 md:p-10 h-full hover:bg-surface/30 transition-colors duration-500">
                  <div className="font-mono text-[9px] tracking-[0.5em] text-gold/40 mb-5">{e.n}</div>
                  <h3 className="font-display text-2xl leading-tight mb-1 group-hover:text-gold transition-colors duration-500">
                    {e.title}
                  </h3>
                  <div className="label-souv mb-5">{e.sub}</div>
                  <p className="text-mute text-sm leading-relaxed">{e.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 05 · ASESORAMIENTO (sin compra) ════════════════════════════ */}
      <section id="asesoramiento" className="relative py-32 md:py-44 overflow-hidden hairline-t">
        <ParallaxVideo src="/videos/club.mp4" poster="/videos/club-poster.jpg" kenburns travel={120} />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/70 via-abyss/85 to-abyss" />
        <div className="relative container-souv">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-7">
                  <CopaSVG className="w-5 text-gold/70" />
                  <span className="eyebrow-gold tracking-[0.4em]">Asesoramiento privado</span>
                </div>
                <h2 className="display-2 mb-6 text-ivory">
                  No vendemos.<br />
                  <span className="italic">Curadamos.</span>
                </h2>
                <p className="text-ivory/55 leading-relaxed mb-10 max-w-md">
                  Cada consulta es personalizada. Contanos qué buscás — ya sea una botella para una ocasión especial, comenzar una cava o incorporar nuestra selección a tu establecimiento — y nuestro sommelier te asesora sin compromiso.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/5491100000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary justify-center"
                  >
                    WhatsApp →
                  </a>
                  <a href="mailto:hola@souverain.com.ar" className="btn-ghost justify-center">
                    Escribirnos
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="space-y-0 divide-y divide-white/10 hairline overflow-hidden">
                {[
                  { q: "¿Qué incluye el asesoramiento?", a: "Una conversación de 20 minutos con nuestro sommelier. Sin costo, sin compromiso." },
                  { q: "¿Hacen entregas?", a: "CABA y GBA en 24–48 horas. Interior del país vía encomienda refrigerada." },
                  { q: "¿Se puede armar una caja regalo?", a: "Sí. Packaging de regalo incluido en todos los pedidos, con tarjeta personalizada." },
                  { q: "¿Tienen precios mayoristas?", a: "Sí. Escribinos por WhatsApp para conocer las condiciones del programa On Premise." },
                ].map((item, i) => (
                  <div key={i} className="py-5">
                    <div className="text-sm text-ivory/80 font-medium mb-1">{item.q}</div>
                    <div className="text-xs text-ivory/40 leading-relaxed">{item.a}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 06 · CIERRE ════════════════════════════════════════════════ */}
      <section className="relative py-44 md:py-60 overflow-hidden hairline-t">
        <ParallaxVideo src="/videos/cta.mp4" poster="/videos/cta-poster.jpg" travel={140} />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/75 to-abyss/40" />
        <div className="relative container-souv text-center">
          <Parallax offset={20}>
            <Reveal>
              <CopaSVG className="w-12 mx-auto mb-8 text-gold/50" />
              <div className="eyebrow-gold mb-6">Distribuidora Souverain · Buenos Aires</div>
              <h2 className="display-1 max-w-4xl mx-auto mb-10 text-ivory">
                Las mejores botellas no se compran:<br />
                <span className="italic">se acceden.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/tienda" className="btn-primary">
                  Ver la colección
                </Link>
                <a href="#asesoramiento" className="btn-ghost">
                  Hablar con un sommelier
                </a>
              </div>
            </Reveal>
          </Parallax>
        </div>
      </section>

    </>
  );
}
