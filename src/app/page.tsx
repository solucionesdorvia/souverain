import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { HeroCinematic } from "@/components/HeroCinematic";
import { ParallaxVideo } from "@/components/ParallaxVideo";
import { GalleryPiece } from "@/components/GalleryPiece";
import { VariantSwitcher } from "@/components/VariantSwitcher";

export const revalidate = 60;

const CATEGORY_ART: Record<string, string> = {
  whisky:
    "https://images.unsplash.com/photo-1582819509237-d6e4e2d18b34?q=80&w=1400&auto=format&fit=crop",
  champagne:
    "https://images.unsplash.com/photo-1592978773738-a51e3c44ce6f?q=80&w=1400&auto=format&fit=crop",
  vinos:
    "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1400&auto=format&fit=crop",
  cognac:
    "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?q=80&w=1400&auto=format&fit=crop",
  espirituosas:
    "https://images.unsplash.com/photo-1620360289877-6f0eb451c9c6?q=80&w=1400&auto=format&fit=crop",
};

const PILLARS = [
  {
    number: "01",
    title: "Compra de lujo",
    text: "Cada botella llega de la mano de casas y bodegas con las que trabajamos en directo. Sin intermediarios, sin reediciones dudosas.",
  },
  {
    number: "02",
    title: "Beneficios premium",
    text: "Atención preferencial, condiciones especiales para tarjetas premium y un asesor dedicado para cada cava.",
  },
  {
    number: "03",
    title: "Acceso privado",
    text: "Lanzamientos anticipados, inventario que nunca llega a la tienda y experiencias reservadas para nuestros miembros.",
  },
];

const CLUB_BENEFITS = [
  "Acceso anticipado a cada lanzamiento",
  "Asignaciones raras e inventario oculto",
  "Precios reservados a miembros",
  "Eventos privados y catas guiadas",
  "Ofertas curadas según su cava",
  "Línea directa y personal por WhatsApp",
];

const STEPS = [
  { number: "I", title: "Descubrir", text: "Recorra la colección o consulte por etiquetas que no figuran en el catálogo." },
  { number: "II", title: "Reservar", text: "Asegure su botella con pago online o coordinación directa con su asesor." },
  { number: "III", title: "Recibir", text: "Entrega cuidada en CABA y GBA, con la botella en condiciones de cava." },
  { number: "IV", title: "Acceder a más", text: "Cada compra abre la puerta a asignaciones y experiencias reservadas." },
];

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    prisma.product.findMany({
      where: { featured: true },
      orderBy: [{ isExclusive: "desc" }, { createdAt: "desc" }],
      take: 7,
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const [headline, ...pieces] = featured;

  return (
    <>
      {/* ── 01 · HERO ─────────────────────────────────────────────── */}
      <HeroCinematic videoSrc="/videos/hero.mp4" posterSrc="/videos/hero-poster.jpg">
        <div className="container-souv pb-28 md:pb-36">
          <Reveal>
            <div className="eyebrow-gold mb-6">Distribuidora Souverain · Buenos Aires</div>
          </Reveal>
          <Reveal delay={0.15}>
            <h1 className="display-1 max-w-4xl text-ivory">
              Acceso a botellas que
              <br />
              no todos pueden <span className="italic">conseguir.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="body-lg mt-8 max-w-xl text-ivory/70">
              Etiquetas raras, lanzamientos privados y experiencias premium,
              curadas para coleccionistas y casas exigentes.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link href="/tienda" className="btn-primary">
                Explorar la colección
              </Link>
              <Link href="#black-club" className="btn-ghost">
                Souverain Black Club
              </Link>
            </div>
          </Reveal>
        </div>
      </HeroCinematic>

      {/* ── 02 · LUXURY BLACK SELECTION ───────────────────────────── */}
      <section className="container-souv py-28 md:py-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <Reveal>
            <div>
              <div className="eyebrow-gold mb-4">La selección privada</div>
              <h2 className="display-2 max-w-2xl">Luxury Black Selection</h2>
              <p className="caption mt-6 max-w-md">
                Piezas de colección, no productos. Cada referencia se incorpora
                una sola vez y en cantidades que rara vez superan la decena.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/tienda?exclusive=1" className="btn-link self-start md:self-end whitespace-nowrap">
              Ver la selección completa →
            </Link>
          </Reveal>
        </div>

        {/* Pieza destacada — tratamiento de obra principal */}
        {headline && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-24 items-center">
            <Reveal className="lg:col-span-7">
              <Link href={`/producto/${headline.slug}`} className="group block relative aspect-[4/3] hairline overflow-hidden">
                <Image
                  src={headline.imageUrl}
                  alt={headline.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover transition-transform duration-[1400ms] ease-soft group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/60 to-transparent" />
                <span className="absolute top-6 left-6 label-souv text-ivory/80">
                  Pieza principal
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-5">
              <div>
                <div className="gallery-number mb-6">N.º 01</div>
                <div className="label-souv mb-3">{headline.brand}</div>
                <h3 className="display-3 mb-4">{headline.name}</h3>
                <p className="caption mb-2">{headline.origin}</p>
                <p className="text-ink/70 text-sm leading-relaxed mb-8 max-w-md">
                  {headline.description}
                </p>
                <Link href={`/producto/${headline.slug}`} className="btn-ghost">
                  Consultar disponibilidad
                </Link>
              </div>
            </Reveal>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 md:gap-x-10">
          {pieces.map((p, i) => (
            <GalleryPiece
              key={p.id}
              number={i + 2}
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
              }}
            />
          ))}
        </div>
      </section>

      {/* ── 03 · LA EXPERIENCIA SOUVERAIN ─────────────────────────── */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <ParallaxVideo src="/videos/experience.mp4" poster="/videos/experience-poster.jpg" />
        <div className="absolute inset-0 bg-abyss/80" />
        <div className="relative container-souv">
          <Reveal>
            <div className="eyebrow-gold mb-4 text-center">La experiencia Souverain</div>
            <h2 className="display-2 text-center max-w-3xl mx-auto mb-24">
              Más que botellas.
              <br />
              Una forma de <span className="italic">pertenecer.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.number} delay={i * 0.12}>
                <div className="border-t border-gold/30 pt-8">
                  <div className="gallery-number mb-6">{pillar.number}</div>
                  <h3 className="font-display text-2xl md:text-3xl mb-4">{pillar.title}</h3>
                  <p className="text-ivory/60 text-sm leading-relaxed max-w-xs">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 · BENEFICIOS PREMIUM ───────────────────────────────── */}
      <section className="hairline-t">
        <div className="container-souv py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-5">
              <div>
                <div className="eyebrow-gold mb-4">Beneficios</div>
                <h2 className="display-2 mb-6">
                  Condiciones a la altura de su <span className="italic">tarjeta.</span>
                </h2>
                <p className="text-mute text-sm leading-relaxed max-w-md">
                  Trabajamos con los principales emisores premium del país para
                  ofrecer condiciones preferenciales en cada compra.
                </p>
              </div>
            </Reveal>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-hairline hairline">
              {[
                { name: "American Express", detail: "Atención preferencial Platinum y Centurion" },
                { name: "Visa Signature", detail: "Beneficios exclusivos en la colección" },
                { name: "Bancos premium", detail: "Convenios con banca privada seleccionada" },
                { name: "Cuotas", detail: "Planes de financiación en etiquetas seleccionadas" },
              ].map((b, i) => (
                <Reveal key={b.name} delay={i * 0.08} className="bg-background">
                  <div className="p-8 md:p-10 h-full">
                    <div className="font-display text-xl md:text-2xl mb-3">{b.name}</div>
                    <p className="caption">{b.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 · SOUVERAIN BLACK CLUB ─────────────────────────────── */}
      <section id="black-club" className="relative py-32 md:py-48 overflow-hidden hairline-t">
        <ParallaxVideo src="/videos/club.mp4" poster="/videos/club-poster.jpg" kenburns travel={150} />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/85 to-abyss/40" />
        <div className="relative container-souv">
          <div className="max-w-2xl">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <span className="eyebrow-gold">Souverain Black Club</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/50 border border-ivory/20 px-3 py-1">
                  Membresía privada
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-2 mb-8">
                Lo mejor de la casa
                <br />
                nunca llega a la <span className="italic">tienda.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="body-lg text-ivory/70 mb-12 max-w-lg">
                Una membresía silenciosa para quienes entienden que las grandes
                botellas no se compran: se acceden.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 mb-14">
                {CLUB_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-4 text-sm text-ivory/80">
                    <span className="mt-[9px] block h-px w-6 shrink-0 bg-gold/60" aria-hidden />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link href="/contacto" className="btn-primary">
                  Solicitar invitación
                </Link>
                <span className="caption sm:self-center">
                  Cupos limitados · Admisión por referencia o historial de compra
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 06 · COLECCIONES ──────────────────────────────────────── */}
      <section className="hairline-t bg-surface/20">
        <div className="container-souv py-28 md:py-40">
          <Reveal>
            <div className="eyebrow-gold mb-4">Colecciones</div>
            <h2 className="display-2 mb-20 max-w-2xl">
              Cada categoría,
              <br />
              una puerta <span className="italic">distinta.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.06}>
                <Link
                  href={`/tienda?categoria=${c.slug}`}
                  className="group block relative aspect-[4/5] hairline overflow-hidden"
                >
                  <Image
                    src={CATEGORY_ART[c.slug] ?? CATEGORY_ART.whisky}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-105 opacity-70 group-hover:opacity-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <div className="label-souv mb-2">Colección</div>
                    <div className="font-display text-3xl md:text-4xl text-ivory group-hover:text-gold transition-colors duration-500">
                      {c.name}
                    </div>
                    <div className="label-souv mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Explorar →
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={categories.length * 0.06}>
              <Link
                href="/tienda?exclusive=1"
                className="group flex flex-col justify-between relative aspect-[4/5] hairline bg-abyss p-8 overflow-hidden"
              >
                <div className="label-souv">Solo por invitación</div>
                <div>
                  <div className="font-display text-3xl md:text-4xl text-gold mb-3">
                    Ediciones limitadas
                  </div>
                  <p className="caption max-w-[220px] mb-6">
                    Asignaciones únicas y botellas numeradas. Disponibilidad
                    sujeta a consulta.
                  </p>
                  <span className="label-souv text-ivory/70 group-hover:text-gold transition-colors duration-500">
                    Consultar →
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 07 · CÓMO FUNCIONA ────────────────────────────────────── */}
      <section className="hairline-t">
        <div className="container-souv py-28 md:py-36">
          <Reveal>
            <div className="eyebrow-gold mb-4 text-center">El recorrido</div>
            <h2 className="display-2 text-center mb-24">Simple, como debe ser.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="font-display italic text-4xl text-gold/60 mb-6">{step.number}</div>
                  <h3 className="font-display text-2xl mb-3">{step.title}</h3>
                  <p className="caption max-w-[260px] mx-auto md:mx-0">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 08 · CIERRE ───────────────────────────────────────────── */}
      <section className="relative py-40 md:py-56 overflow-hidden hairline-t">
        <ParallaxVideo src="/videos/cta.mp4" poster="/videos/cta-poster.jpg" travel={150} />
        <div className="absolute inset-0 bg-abyss/75" />
        <div className="relative container-souv text-center">
          <Parallax offset={24}>
            <Reveal>
              <div className="eyebrow-gold mb-8">Souverain</div>
              <h2 className="display-1 max-w-4xl mx-auto mb-12">
                No todas las botellas deberían estar al alcance de <span className="italic">todos.</span>
              </h2>
              <Link href="/tienda" className="btn-primary">
                Ingresar a Souverain
              </Link>
            </Reveal>
          </Parallax>
        </div>
      </section>

      <VariantSwitcher />
    </>
  );
}
