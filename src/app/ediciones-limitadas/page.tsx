import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/StatusBadge";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import { formatPrice } from "@/lib/utils";
import { VariantSwitcher } from "@/components/VariantSwitcher";

export const metadata: Metadata = {
  title: "Ediciones Limitadas — Drops Exclusivos · Souverain",
  description:
    "Acceso anticipado a referencias que no existen en canales convencionales. Stock real. Sin reserva previa. Cuando se acaba, se acaba.",
};

type DropStatus = "DISPONIBLE" | "PREVENTA" | "AGOTADO";

const DROPS_CONFIG: {
  slug: string;
  status: DropStatus;
  countdown: string | null;
  edition: string;
  units: number;
  story: string;
}[] = [
  {
    slug: "dom-perignon-vintage-2013",
    status: "PREVENTA",
    countdown: "2026-12-31T23:59:59",
    edition: "Vintage Prestige 2013",
    units: 12,
    story: "La añada 2013 de Dom Pérignon es la primera cosecha firmada en exclusiva por Vincent Chaperon. Un champagne de tensión y mineralidad excepcionales que solo está disponible mediante preventa en canales seleccionados.",
  },
  {
    slug: "macallan-18-sherry-oak",
    status: "DISPONIBLE",
    countdown: null,
    edition: "Sherry Oak — Asignación Otoño 2026",
    units: 6,
    story: "La expresión más buscada de The Macallan. Dieciocho años en barricas de roble europeo curadas con jerez. Esta asignación es la última disponible en Argentina hasta la próxima importación, sin fecha confirmada.",
  },
  {
    slug: "chateau-margaux-2015",
    status: "DISPONIBLE",
    countdown: null,
    edition: "Premier Grand Cru Classé · Parker 99 pts",
    units: 2,
    story: "Una de las últimas 2 botellas de la añada 2015 disponibles en Argentina. Considerada una de las diez mejores añadas del siglo en Burdeos. Sin reservas.",
  },
  {
    slug: "hennessy-paradis-imperial",
    status: "AGOTADO",
    countdown: null,
    edition: "Cuvée Privée — Edición 2025",
    units: 0,
    story: "La edición más rara del Paradis Impérial, distribuida únicamente a cuentas On Premise y coleccionistas registrados. Esta asignación se cerró en menos de 24 horas.",
  },
];

export default async function EdicionesLimitadasPage() {
  const slugs = DROPS_CONFIG.map(d => d.slug);
  const products = await prisma.product.findMany({
    where: { slug: { in: slugs } },
    include: { category: true },
  });

  const drops = DROPS_CONFIG.map(config => ({
    ...config,
    product: products.find(p => p.slug === config.slug),
  })).filter(d => d.product);

  return (
    <div className="bg-abyss min-h-screen pb-14">
      {/* HERO — fullscreen drop announcement */}
      <section className="relative h-screen flex flex-col justify-between overflow-hidden -mt-20">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=2400&auto=format&fit=crop"
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
                {drops.filter(d => d.status === "DISPONIBLE").length} drops activos
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
              <a href="#drops" className="btn-primary">Ver los drops activos</a>
              <Link href="/contacto" className="btn-ghost">Recibir notificaciones</Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom stats */}
        <div className="relative container-souv pb-12">
          <Reveal delay={0.3}>
            <div className="flex gap-10 hairline-t pt-8">
              {[
                { n: `${drops.length}`, l: "drops esta temporada" },
                { n: `${drops.filter(d => d.status === "DISPONIBLE").length}`, l: "disponibles ahora" },
                { n: "24h", l: "duración promedio" },
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
          const isAgotado = drop.status === "AGOTADO";

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
                  className={`object-cover scale-105 ${isAgotado ? "grayscale opacity-10" : "opacity-10"}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/95 to-abyss/60" />
              </div>

              <div className="relative container-souv grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12">
                <div className="lg:col-span-6 xl:col-span-5">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-mono text-[9px] tracking-[0.5em] text-mute">
                      DROP {String(i + 1).padStart(2, "0")} / {String(drops.length).padStart(2, "0")}
                    </span>
                    <StatusBadge status={drop.status} />
                  </div>

                  <div className="eyebrow-gold mb-3">
                    {product.category.name} · {product.origin}
                  </div>
                  <h2 className="font-display text-4xl md:text-5xl xl:text-6xl text-ink leading-[1.02] tracking-tight mb-3">
                    {product.name}
                  </h2>
                  <div className="eyebrow text-mute mb-8">{drop.edition}</div>

                  <p className="text-ink/60 leading-relaxed mb-10 max-w-md">{drop.story}</p>

                  {drop.countdown && drop.status === "PREVENTA" && (
                    <div className="mb-10">
                      <div className="eyebrow text-mute mb-5">Lanzamiento en</div>
                      <Countdown target={drop.countdown} />
                    </div>
                  )}

                  {!isAgotado && drop.units > 0 && (
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] tracking-[0.3em] text-emerald-400 uppercase">
                        {drop.units} {drop.units === 1 ? "unidad disponible" : "unidades disponibles"}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-6">
                    {isAgotado ? (
                      <button disabled className="btn-ghost opacity-30 cursor-not-allowed">Agotado</button>
                    ) : (
                      <Link href={`/producto/${product.slug}`} className="btn-primary">
                        {drop.status === "PREVENTA" ? "Reservar lugar" : "Ver la pieza"}
                      </Link>
                    )}
                    <div className="font-display text-2xl text-gold tabular-nums">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex lg:col-span-5 lg:col-start-8 justify-center">
                  <div className={`relative w-56 xl:w-72 aspect-[2/3] hairline overflow-hidden ${isAgotado ? "grayscale opacity-30" : ""}`}>
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

      <VariantSwitcher />
    </div>
  );
}
