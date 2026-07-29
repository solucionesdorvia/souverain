import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { HeroCinematic } from "@/components/HeroCinematic";
import { ParallaxVideo } from "@/components/ParallaxVideo";

export const metadata: Metadata = {
  title: "Distribuidora Souverain — La Rural · Chandon · Pernod Ricard · Catena Zapata",
  description:
    "Distribución exclusiva de las mejores casas vitivinícolas y destilerías de Argentina y el mundo. La Rural, Chandon, Pernod Ricard, Catena Zapata.",
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

const LA_RURAL = {
  id: "la-rural",
  name: "La Rural",
  badge: "Familia Rutini · Est. 1885",
  country: "Mendoza, Argentina",
  tagline: "Ciento cuarenta años de viticultura en el corazón de Mendoza.",
  body: "La bodega más antigua de Mendoza en manos de su familia fundadora. Tres generaciones dedicadas a producir vinos que expresan la identidad profunda de la tierra argentina. Desde sus cepas de pie franco hasta los varietales más modernos, La Rural es la casa de la memoria vitivinícola mendocina.",
  heroImg: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2000&auto=format&fit=crop",
  products: [
    {
      name: "Rutini Cabernet Sauvignon",
      vintage: "2020",
      sub: "Cabernet Sauvignon · Valle de Uco",
      notes: "Taninos elegantes con notas de cassis, cedro y especias dulces. Final largo, mineral y persistente.",
      price: "$ 185.000",
      img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Felipe Rutini Blend",
      vintage: "2019",
      sub: "Cabernet · Malbec · Merlot · Luján de Cuyo",
      notes: "La expresión máxima de la casa. Tres varietales en armonía perfecta. Complejo, profundo y memorable.",
      price: "$ 420.000",
      img: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Trumpeter Malbec Reserva",
      vintage: "2021",
      sub: "Malbec · Mendoza",
      notes: "Frutas rojas maduras, violetas y roble sutil. Fresco, vibrante y de acceso inmediato.",
      price: "$ 98.000",
      img: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=600&auto=format&fit=crop",
    },
  ],
};

const CHANDON = {
  id: "chandon",
  name: "Chandon",
  badge: "Moët Hennessy · Est. 1959",
  country: "Agrelo, Mendoza",
  tagline: "El método tradicional hecho argentino.",
  body: "Pionera del espumante en Argentina y primera apuesta de Moët Hennessy fuera de Francia. Chandon redefinió los estándares del vino espumante nacional y los llevó al mundo. Su línea Baron B representa la cima del método tradicional en suelo mendocino.",
  heroImg: "https://images.unsplash.com/photo-1592978773738-a51e3c44ce6f?q=80&w=2000&auto=format&fit=crop",
  products: [
    {
      name: "Baron B Brut Nature",
      vintage: "Vintage 2021",
      sub: "Chardonnay · Pinot Noir · Agrelo",
      notes: "Burbuja fina y persistente. Cítricos frescos, brioche y mineralidad excepcional. La joya de la casa.",
      price: "$ 380.000",
      img: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Chandon Rosé",
      vintage: "Sin añada",
      sub: "Pinot Noir · Mendoza",
      notes: "Color salmón pálido. Fresas, pétalos de rosa y final vivaz. El espumante del brindis argentino.",
      price: "$ 125.000",
      img: "https://images.unsplash.com/photo-1528823872057-9c018a7a7553?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Chandon Extra Brut",
      vintage: "Sin añada",
      sub: "Chardonnay · Pinot Noir",
      notes: "Clásico y versátil. Manzana verde, levaduras y burbuja elegante. La bienvenida perfecta.",
      price: "$ 95.000",
      img: "https://images.unsplash.com/photo-1592978773738-a51e3c44ce6f?q=80&w=600&auto=format&fit=crop",
    },
  ],
};

const PERNOD = {
  id: "pernod-ricard",
  name: "Pernod Ricard",
  badge: "The Premium Spirits Co. · Global",
  country: "Escocia · Irlanda · Francia",
  tagline: "Destilados que miden el tiempo en décadas.",
  body: "El grupo detrás de los espirituosos más respetados del planeta. Cada botella es el resultado de años de maduración, tradición artesanal y la búsqueda permanente de la excelencia. Desde las Highlands escocesas hasta las orillas del Shannon, el tiempo es el ingrediente principal.",
  heroImg: "https://images.unsplash.com/photo-1582819509237-d6e4e2d18b34?q=80&w=2000&auto=format&fit=crop",
  products: [
    {
      name: "Chivas Regal 12 Años",
      vintage: "12 Year Old",
      sub: "Blended Scotch Whisky · Speyside",
      notes: "Miel de acacia, vainilla y manzanas maduras. Suave, redondo y perfectamente equilibrado.",
      price: "$ 320.000",
      img: "https://images.unsplash.com/photo-1504707748692-419802cf939d?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "The Glenlivet 12 Años",
      vintage: "12 Year Old",
      sub: "Single Malt Scotch · Speyside",
      notes: "Frutas tropicales, flores de primavera y miel. El single malt más seductor de Speyside.",
      price: "$ 450.000",
      img: "https://images.unsplash.com/photo-1582819509237-d6e4e2d18b34?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Jameson Irish Whiskey",
      vintage: "Triple Distilled",
      sub: "Blended Irish Whiskey · Cork",
      notes: "Madera suave, vainilla y especias leves. Triple destilado para una suavidad sin igual.",
      price: "$ 285.000",
      img: "https://images.unsplash.com/photo-1504707748692-419802cf939d?q=80&w=600&auto=format&fit=crop",
    },
  ],
};

const CATENA = {
  id: "catena-zapata",
  name: "Catena Zapata",
  badge: "Familia Catena · Est. 1902",
  country: "Adrianna Vineyard · 1.500 msnm · Gualtallary",
  tagline: "El Malbec que le enseñó al mundo qué es la altitud.",
  body: "Nicolás Catena Zapata transformó la historia del vino argentino llevando el Malbec más allá de sus límites conocidos. Sus viñedos de Adrianna, a 1.500 metros sobre el nivel del mar, producen hoy algunos de los vinos más cotizados del hemisferio sur. Cada botella es décadas de investigación, pasión y la convicción de que lo mejor siempre está más arriba.",
  heroImg: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=2000&auto=format&fit=crop",
  products: [
    {
      name: "Adrianna Vineyard Malbec",
      vintage: "2019 · River Stones",
      sub: "Malbec · Adrianna · 1.500 msnm · Gualtallary",
      notes: "Violetas, ciruelas oscuras, chocolate negro y una mineralidad de cuarzo que solo se alcanza a esta altitud.",
      price: "Consultar",
      img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop",
      exclusive: true,
    },
    {
      name: "Catena Alta Historic Rows",
      vintage: "2020 · Malbec",
      sub: "Malbec · Pie Franco · Luján de Cuyo · Est. 1930",
      notes: "De viñedos no injertados plantados en 1930. Concentración única, terruño eterno, la memoria más antigua del Malbec.",
      price: "$ 850.000",
      img: "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?q=80&w=600&auto=format&fit=crop",
      exclusive: true,
    },
    {
      name: "Adrianna White Bones",
      vintage: "2020 · Chardonnay",
      sub: "Chardonnay · Adrianna · 1.500 msnm",
      notes: "Cítricos puros, piedra caliza y acidez que lo hace inmortal. El Chardonnay de altitud más elegante de Argentina.",
      price: "$ 920.000",
      img: "https://images.unsplash.com/photo-1474722883778-792e7990302f?q=80&w=600&auto=format&fit=crop",
      exclusive: true,
    },
  ],
};

const BRANDS = [LA_RURAL, CHANDON, PERNOD, CATENA];

const PAIRINGS = [
  {
    n: "I",
    wine: "Catena Alta Malbec 2020",
    dish: "Costillar de cordero a la llama",
    note: "La intensidad del Malbec de altura se equilibra con la grasa profunda del cordero. La mineralidad limpia el paladar entre cada bocado.",
    temp: "Servir a 17°C",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "II",
    wine: "Baron B Brut Nature 2021",
    dish: "Tartar de salmón · Alcaparras · Blinis",
    note: "La mineralidad y la acidez viva del Baron B cortan la riqueza del salmón crudo. Un clásico parisino con alma argentina.",
    temp: "Servir a 8°C",
    img: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    n: "III",
    wine: "Chivas Regal 12 Años",
    dish: "Tabla de quesos curados · Almendras",
    note: "La miel de acacia y vainilla del Chivas dialoga de manera natural con los quesos añejos. Neat o con una única piedra de hielo.",
    temp: "Neat o con hielo",
    img: "https://images.unsplash.com/photo-1582819509237-d6e4e2d18b34?q=80&w=1200&auto=format&fit=crop",
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

export default function HomePage() {
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
            <div className="flex flex-wrap gap-x-8 gap-y-1 mb-12 text-[10px] uppercase tracking-[0.3em] text-gold/60">
              <span>La Rural</span>
              <span>·</span>
              <span>Chandon</span>
              <span>·</span>
              <span>Pernod Ricard</span>
              <span>·</span>
              <span>Catena Zapata</span>
            </div>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#la-rural" className="btn-primary">Explorar la selección</a>
              <a href="#asesoramiento" className="btn-ghost">Asesoramiento privado →</a>
            </div>
          </Reveal>
        </div>
      </HeroCinematic>

      {/* ══ 02 · CUATRO CASAS ══════════════════════════════════════════ */}
      <section id="cuatro-casas" className="hairline-t">
        <div className="container-souv py-20 md:py-28">
          <Reveal className="mb-16 text-center">
            <div className="eyebrow-gold mb-4">Cuatro casas · Un criterio</div>
            <h2 className="display-2">Las casas que representamos.</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-hairline hairline overflow-hidden">
            {BRANDS.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.08}>
                <a
                  href={`#${b.id}`}
                  className="group flex flex-col justify-between bg-background p-8 md:p-10 h-56 hover:bg-surface/40 transition-colors duration-500"
                >
                  <div>
                    <div className="label-souv mb-4">{b.badge}</div>
                    <div className="font-display text-2xl md:text-3xl leading-tight mb-2 group-hover:text-gold transition-colors duration-500">
                      {b.name}
                    </div>
                    <div className="caption">{b.country}</div>
                  </div>
                  <div className="label-souv text-gold/0 group-hover:text-gold/60 transition-colors duration-500 mt-4">
                    Ver la línea →
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 03 · LA RURAL ══════════════════════════════════════════════ */}
      <section id="la-rural" className="hairline-t">
        {/* Hero de marca */}
        <div className="relative h-[55vh] md:h-[70vh] overflow-hidden">
          <Image
            src={LA_RURAL.heroImg}
            alt="La Rural — Familia Rutini"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/60 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-souv pb-14 md:pb-20">
              <Reveal>
                <div className="eyebrow-gold mb-3">{LA_RURAL.badge}</div>
                <h2 className="display-1 max-w-2xl mb-2 text-ivory">{LA_RURAL.name}</h2>
                <p className="caption">{LA_RURAL.country}</p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Historia + productos */}
        <div className="container-souv py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start mb-20">
            <Reveal className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="font-display italic text-2xl md:text-3xl text-gold/80 leading-tight mb-6">
                "{LA_RURAL.tagline}"
              </div>
              <p className="text-ink/60 leading-relaxed text-sm mb-8">{LA_RURAL.body}</p>
              <div className="flex flex-col gap-3 text-[11px] uppercase tracking-[0.3em] text-mute">
                <span>✦ Fundada en 1885</span>
                <span>✦ Familia Rutini · 3ª generación</span>
                <span>✦ Mendoza · Luján de Cuyo · Valle de Uco</span>
              </div>
            </Reveal>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {LA_RURAL.products.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.1}>
                  <div className="group">
                    <div className="relative aspect-[3/4] bg-surface hairline overflow-hidden mb-5">
                      <Image src={p.img} alt={p.name} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-gold/80">{p.vintage}</span>
                      </div>
                    </div>
                    <div className="label-souv mb-2">{p.sub}</div>
                    <h3 className="font-display text-xl leading-tight mb-2">{p.name}</h3>
                    <p className="text-mute text-xs leading-relaxed mb-4">{p.notes}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gold">{p.price}</span>
                      <span className="label-souv text-ink/40 hover:text-gold transition-colors duration-300 cursor-pointer">
                        Consultar →
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 04 · CHANDON ═══════════════════════════════════════════════ */}
      <section id="chandon" className="hairline-t bg-surface/20">
        {/* Strip tipográfico */}
        <div className="overflow-hidden py-6 border-b border-hairline">
          <div className="flex gap-20 whitespace-nowrap text-[10px] uppercase tracking-[0.5em] text-gold/30 animate-[marquee_30s_linear_infinite]">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>Chandon · Baron B · Brut Nature · Rosé · Extra Brut · Méthode Traditionnelle · Agrelo · Mendoza ·&nbsp;</span>
            ))}
          </div>
        </div>

        {/* Hero de marca */}
        <div className="relative h-[55vh] md:h-[70vh] overflow-hidden">
          <Image
            src={CHANDON.heroImg}
            alt="Chandon — Moët Hennessy"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-abyss/50 to-abyss/90" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-souv pb-14 md:pb-20">
              <Reveal>
                <div className="eyebrow-gold mb-3">{CHANDON.badge}</div>
                <h2 className="display-1 max-w-2xl mb-2 text-ivory">{CHANDON.name}</h2>
                <p className="font-display italic text-xl md:text-2xl text-ivory/60">{CHANDON.tagline}</p>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Historia + productos */}
        <div className="container-souv py-20 md:py-28">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-ink/60 leading-relaxed">{CHANDON.body}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {CHANDON.products.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <div className="group hairline bg-background overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={p.img} alt={p.name} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
                    {i === 0 && (
                      <div className="absolute top-4 left-4">
                        <span className="text-[9px] uppercase tracking-[0.35em] text-gold border border-gold/60 px-3 py-1.5 bg-abyss/70 backdrop-blur-sm">
                          Baron B
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="label-souv mb-2">{p.vintage}</div>
                    <h3 className="font-display text-xl leading-tight mb-1">{p.name}</h3>
                    <div className="caption mb-3">{p.sub}</div>
                    <p className="text-mute text-xs leading-relaxed mb-5">{p.notes}</p>
                    <div className="flex items-center justify-between hairline-t pt-4">
                      <span className="text-sm text-gold">{p.price}</span>
                      <span className="label-souv text-ink/40 hover:text-gold transition-colors duration-300 cursor-pointer">
                        Consultar →
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 05 · PERNOD RICARD — SPIRITS ═══════════════════════════════ */}
      <section id="pernod-ricard" className="hairline-t">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Imagen */}
          <div className="relative h-[55vh] lg:h-auto lg:min-h-[700px] overflow-hidden">
            <Image
              src={PERNOD.heroImg}
              alt="Pernod Ricard — Spirits"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-abyss/30 lg:to-abyss" />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <div className="eyebrow-gold mb-2">{PERNOD.badge}</div>
              <div className="font-display italic text-2xl text-ivory/60">{PERNOD.tagline}</div>
            </div>
          </div>

          {/* Texto + productos */}
          <div className="bg-abyss p-10 md:p-14 lg:p-16 flex flex-col justify-center">
            <Reveal>
              <div className="eyebrow-gold mb-5">Espirituosos de colección</div>
              <h2 className="display-2 mb-6">{PERNOD.name}</h2>
              <p className="text-ink/55 leading-relaxed text-sm mb-12 max-w-md">{PERNOD.body}</p>
            </Reveal>

            <div className="space-y-0 divide-y divide-hairline">
              {PERNOD.products.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.1}>
                  <div className="group py-6 flex gap-5 items-start hover:bg-surface/20 -mx-4 px-4 transition-colors duration-300">
                    <div className="relative w-14 h-14 bg-surface hairline shrink-0 overflow-hidden">
                      <Image src={p.img} alt={p.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="label-souv mb-1">{p.vintage}</div>
                      <h3 className="font-display text-lg leading-tight mb-0.5">{p.name}</h3>
                      <div className="caption mb-2">{p.sub}</div>
                      <p className="text-mute text-xs leading-relaxed line-clamp-2">{p.notes}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm text-gold mb-1">{p.price}</div>
                      <div className="label-souv text-ink/30 group-hover:text-gold transition-colors duration-300 cursor-pointer">
                        Consultar →
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <a href="#asesoramiento" className="btn-ghost mt-10 self-start">
                Solicitar asesoramiento →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 06 · CATENA ZAPATA — PIEZA MÁXIMA ═════════════════════════ */}
      <section id="catena-zapata" className="hairline-t">
        {/* Hero máximo */}
        <div className="relative h-[75vh] md:h-[90vh] overflow-hidden">
          <Image
            src={CATENA.heroImg}
            alt="Catena Zapata — Adrianna Vineyard"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />

          {/* Copa central decorativa */}
          <div className="absolute inset-0 flex items-center justify-end pr-[5%] pointer-events-none">
            <CopaSVG className="w-32 md:w-52 text-gold/8" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 text-center px-6">
            <Reveal>
              <div className="eyebrow-gold mb-4">{CATENA.badge}</div>
              <h2 className="display-1 mb-3 text-ivory">{CATENA.name}</h2>
              <div className="caption mb-2">{CATENA.country}</div>
              <p className="font-display italic text-2xl md:text-3xl text-gold/70 max-w-2xl mx-auto mt-4">
                "{CATENA.tagline}"
              </p>
            </Reveal>
          </div>
        </div>

        {/* Historia */}
        <div className="container-souv py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <Reveal>
              <p className="text-ink/60 leading-relaxed text-base md:text-lg">{CATENA.body}</p>
            </Reveal>
          </div>

          {/* Productos — tratamiento de obras de arte */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-hairline hairline overflow-hidden">
            {CATENA.products.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.12}>
                <div className="group bg-background p-0 relative overflow-hidden">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="33vw"
                      className="object-cover transition-all duration-[1200ms] group-hover:scale-105 group-hover:grayscale-0 grayscale-[30%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />

                    {/* Exclusive badge */}
                    <div className="absolute top-5 left-5">
                      <span className="text-[9px] uppercase tracking-[0.4em] text-gold border border-gold/50 px-3 py-1.5 bg-abyss/80 backdrop-blur-sm">
                        Adrianna
                      </span>
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="font-mono text-[9px] tracking-[0.5em] text-gold/50 mb-4">
                      CAT-{String(i + 1).padStart(3, "0")} · {p.vintage}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl leading-tight mb-1">{p.name}</h3>
                    <div className="caption mb-4">{p.sub}</div>
                    <p className="text-mute text-xs leading-relaxed mb-6">{p.notes}</p>
                    <div className="hairline-t pt-5 flex items-center justify-between">
                      <span className={`text-sm ${p.price === "Consultar" ? "text-mute italic" : "text-gold"}`}>
                        {p.price}
                      </span>
                      <span className="label-souv text-ink/30 group-hover:text-gold transition-colors duration-300 cursor-pointer">
                        Solicitar →
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="flex justify-center mt-12">
              <a href="#asesoramiento" className="btn-primary">
                Solicitar asesoramiento Catena Zapata →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 07 · MARIDAJES EDITORIAL ═══════════════════════════════════ */}
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
                    <Image src={p.img} alt={p.dish} fill sizes="33vw" className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
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

      {/* ══ 08 · EXPERIENCIAS ══════════════════════════════════════════ */}
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

      {/* ══ 09 · ASESORAMIENTO (sin compra) ════════════════════════════ */}
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

      {/* ══ 10 · CIERRE ════════════════════════════════════════════════ */}
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
                <a href="#cuatro-casas" className="btn-primary">
                  Explorar las casas
                </a>
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
