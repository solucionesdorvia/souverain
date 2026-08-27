import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/Reveal";
import { precioPublico } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ediciones Limitadas — Drops Exclusivos · Souverain",
  description:
    "Acceso anticipado a referencias que no existen en canales convencionales. Stock real. Sin reserva previa. Cuando se acaba, se acaba.",
};

// Antes esta lista apuntaba al stock de ejemplo (Macallan 18, Château Margaux,
// Hennessy Paradis), ninguno de los cuales quedó en el catálogo: la página
// mostraba "0 drops activos" y todos sus enlaces daban 404. Ahora son piezas
// reales, y se sacaron las unidades, los estados y la cuenta regresiva, que
// eran inventados. Lo que se cuenta de cada botella es verificable.
const DROPS_CONFIG: { slug: string; edition: string; story: string }[] = [
  {
    slug: "dom-perignon-p2-vintage-2004-4467",
    edition: "Deuxième Plénitude",
    story: "La segunda plenitud del 2004: dieciséis años sobre lías antes del degüelle. Dom Pérignon sostiene cada añada hasta que llega a una de sus tres ventanas de expresión, y la P2 es la del medio.",
  },
  {
    slug: "krug-grande-cuvee-173eme-edition-4751",
    edition: "173ème Édition",
    story: "Cada Grande Cuvée es un ensamblaje de más de cien vinos de una docena de añadas distintas, algunos con quince años de reserva. La edición 173 parte de la cosecha 2017.",
  },
  {
    slug: "perrier-jouet-belle-epoque-12765",
    edition: "Cuvée Belle Époque",
    story: "La anémona japonesa que recorre la botella la dibujó Émile Gallé en 1902 y se esmalta a mano sobre el vidrio. La casa recuperó el diseño recién en 1964, para la primera Belle Époque.",
  },
  {
    slug: "royal-salute-21-yo-78",
    edition: "The Signature Blend",
    story: "Creado en 1953 para la coronación de Isabel II y bautizado por las veintiún salvas de cañón del saludo real. Se presenta en un frasco de porcelana, no en vidrio.",
  },
  {
    slug: "hennessy-x-o-4643",
    edition: "The Original",
    story: "Maurice Hennessy lo creó en 1870 para su círculo cercano y terminó dándole nombre a toda una categoría: antes del X.O. no existía la denominación.",
  },
  {
    slug: "cheval-des-andes-2022-4683",
    edition: "Château Cheval Blanc · Terrazas de los Andes",
    story: "El corte de malbec y cabernet que nace del trabajo entre Cheval Blanc, de Saint-Émilion, y Terrazas de los Andes. Estructura de gran Médoc con la fruta de los viñedos de altura del Valle de Uco.",
  },
];

export default async function EdicionesLimitadasPage() {
  const products = await prisma.product.findMany({
    where: { slug: { in: DROPS_CONFIG.map(d => d.slug) } },
    include: { category: true },
  });

  const elegidas = DROPS_CONFIG.map(config => ({
    ...config,
    product: products.find(p => p.slug === config.slug),
  })).filter(d => d.product);

  // Respaldo: si un slug deja de existir (recarga del catálogo, producto dado de
  // baja) la página se completa con piezas Luxury Black de la base en vez de
  // quedar vacía, que es exactamente lo que venía pasando.
  const faltan = 6 - elegidas.length;
  const relleno = faltan <= 0 ? [] : (await prisma.product.findMany({
    where: { isExclusive: true, slug: { notIn: elegidas.map(d => d.slug) } },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: faltan,
  })).map(product => ({
    slug: product.slug,
    edition: product.category.name,
    story: product.description,
    product,
  }));

  const drops = [...elegidas, ...relleno];

  return (
    <div className="bg-abyss min-h-screen pb-14">
      {/* HERO — fullscreen drop announcement */}
      <section className="relative h-screen flex flex-col justify-between overflow-hidden -mt-20">
        <div className="absolute inset-0">
          <Image
            src="/heros/drops.jpg"
            alt="Ediciones Limitadas Souverain"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/80 to-abyss/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-abyss/60 to-transparent" />
        </div>

        {/* Top status bar */}
        <div className="relative container-souv pt-28 flex items-center justify-between">
          <Reveal>
            <div className="font-mono text-[9px] tracking-[0.6em] text-gold/50 uppercase">
              Acceso prioritario · Solo Souverain
            </div>
          </Reveal>
          <Reveal>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] tracking-[0.4em] text-emerald-400 uppercase">
                {drops.length} piezas en esta selección
              </span>
            </div>
          </Reveal>
        </div>

        {/* Main headline — brutal, large */}
        <div className="relative container-souv">
          <Reveal delay={0.06}>
            <div className="eyebrow text-mute mb-6">No está en ninguna vinoteca.</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-crest text-[clamp(3rem,11vw,10rem)] leading-none tracking-tight text-ink mb-4">
              Ediciones
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <h1 className="font-display italic text-[clamp(2.5rem,9vw,8rem)] leading-none text-gold mb-10">
              Limitadas.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-ink/55 text-lg max-w-lg leading-relaxed mb-10">
              Referencias que no se consiguen en canales convencionales.
              Stock real. Cuando se acaba, se acaba.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#drops" className="btn-primary">Ver la selección</a>
              <Link href="/contacto" className="btn-ghost">Recibir notificaciones</Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom stats */}
        <div className="relative container-souv pb-12">
          <Reveal delay={0.3}>
            <div className="flex gap-10 hairline-t pt-8">
              {[
                { n: `${drops.length}`, l: "piezas en la selección" },
              ].map(s => (
                <div key={s.l}>
                  <div className="font-display text-3xl text-gold mb-1">{s.n}</div>
                  <div className="text-[9px] tracking-[0.3em] text-mute uppercase">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="hairline-t hairline-b border-gold/10">
        <div className="container-souv py-16 md:py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <p className="font-display italic text-2xl md:text-3xl text-ink/60 leading-relaxed">
              "Las mejores referencias del mundo tienen asignaciones anuales fijas.
              Quien tiene el acceso, tiene la botella. Nosotros tenemos el acceso."
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="eyebrow mt-6 text-mute">— Distribuidora Souverain</div>
          </Reveal>
        </div>
      </section>

      {/* DROPS — scroll snap */}
      <div id="drops" className="snap-y snap-mandatory overflow-y-scroll h-screen">
        {drops.map((drop, i) => {
          if (!drop.product) return null;
          const product = drop.product;

          return (
            <section
              key={drop.slug}
              className="snap-start h-screen flex items-center relative border-t border-hairline"
            >
              <div className="absolute inset-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="100vw"
                  className="object-cover scale-105 opacity-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/95 to-abyss/60" />
              </div>

              <div className="relative container-souv grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
                <div className="lg:col-span-6 xl:col-span-5">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-[9px] tracking-[0.5em] text-mute">
                      DROP {String(i + 1).padStart(2, "0")} / {String(drops.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="eyebrow-gold mb-3">
                    {product.category.name} · {product.origin}
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl xl:text-6xl text-ink leading-[1.02] tracking-tight mb-3">
                    {product.name}
                  </h2>
                  <div className="eyebrow text-mute mb-8">{drop.edition}</div>

                  <p className="text-ink/60 leading-relaxed mb-10 max-w-md">{drop.story}</p>

                  <div className="flex items-center gap-6">
                    <Link href={`/producto/${product.slug}`} className="btn-primary">
                      Ver la pieza
                    </Link>
                    <div className="font-display text-2xl text-gold tabular-nums">
                      {precioPublico(product.price) ?? "Consultar"}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex lg:col-span-5 lg:col-start-8 justify-center">
                  <div className="relative w-56 xl:w-72 aspect-[2/3] hairline overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 1280px) 224px, 288px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {i < drops.length - 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
                  <span className="text-[9px] tracking-[0.4em] text-mute uppercase">Siguiente</span>
                  <div className="w-px h-8 bg-mute" />
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* Próximos drops + waitlist */}
      <section className="hairline-t">
        <div className="container-souv py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="eyebrow-gold mb-4">Próximos drops</div>
            <h2 className="display-3 mb-6">
              No todas las referencias<br />
              se <span className="italic">publican.</span>
            </h2>
            <p className="text-mute leading-relaxed mb-8 max-w-sm">
              Las más raras se notifican primero a los contactos directos y cuentas
              On Premise, antes de cualquier publicación pública.
            </p>
            <Link href="/on-premise" className="btn-primary">Abrir cuenta On Premise</Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="hairline p-8 md:p-10 space-y-6">
              <div className="eyebrow mb-2">Notificación anticipada</div>
              <p className="text-mute text-sm leading-relaxed">
                Escribinos al WhatsApp o dejá tu email en contacto para ser de los
                primeros en saber cuándo entra un drop nuevo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contacto" className="btn-ghost">Dejar mi contacto</Link>
                <a
                  href="https://wa.me/5491157581269"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-link"
                >
                  WhatsApp directo →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
