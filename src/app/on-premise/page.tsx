import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Star, Clock, BookOpen, Truck, ShieldCheck, Users,
  CheckCircle2, XCircle, ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";
import { OnPremiseForm } from "@/components/OnPremiseForm";
import { SITE } from "@/lib/site";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "On Premise — Programa para Establecimientos · Souverain",
  description:
    "Distribución exclusiva para restaurantes, hoteles, bares y clubes. Carta curada, asesor dedicado y acceso prioritario a referencias que no llegan a los canales convencionales.",
};

const FEATURES = [
  { icon: Star, title: "Acceso prioritario", body: "Primero en recibir nuevas referencias antes de la venta general. Las asignaciones más raras son para cuentas On Premise." },
  { icon: Users, title: "Asesor dedicado", body: "Un sommelier Souverain asignado a su cuenta. Contacto directo, sin tiempos de espera." },
  { icon: BookOpen, title: "Carta curada", body: "Diseñamos y actualizamos su carta de bebidas según la identidad y el ticket promedio de su establecimiento." },
  { icon: Truck, title: "Logística controlada", body: "Entregas programadas en CABA y GBA con control de temperatura para referencias sensibles." },
  { icon: ShieldCheck, title: "Precios On Premise", body: "Estructura especial por volumen. Acuerdo de confidencialidad sobre nuestras condiciones comerciales." },
  { icon: Clock, title: "Formación de personal", body: "Capacitaciones para el equipo de sala: maridaje, argumentario de venta y conocimiento de producto." },
];

const TIMELINE = [
  { n: "01", title: "Solicitud", body: "Completás el formulario. Sin compromiso ni costo." },
  { n: "02", title: "Consulta", body: "Un asesor te contacta en 24 hs para conocer tu establecimiento." },
  { n: "03", title: "Propuesta", body: "Diseñamos una selección personalizada para tu servicio." },
  { n: "04", title: "Activación", body: "Tu cuenta queda activa. Primer pedido, asesor asignado." },
];

const SEGMENTS = [
  { label: "Restaurantes", desc: "Gastronómicos, bistrós, omakase", img: "/heros/seg-restaurantes.jpg" },
  { label: "Bares", desc: "Speakeasy, rooftop, coctelería de autor", img: "/heros/seg-bares.jpg" },
  { label: "Hoteles", desc: "Boutique, de lujo, lounge", img: "/heros/seg-hoteles.jpg" },
  { label: "Clubes & Eventos", desc: "Privados, corporativos, catering", img: "/heros/seg-eventos.jpg" },
];

const PLAN_ROWS = [
  { feature: "Acceso al catálogo completo", essential: true, platinum: true },
  { feature: "Asesor Souverain dedicado", essential: true, platinum: true },
  { feature: "Pedidos mínimos mensuales", essential: "12 botellas", platinum: "30 botellas" },
  { feature: "Precios On Premise", essential: true, platinum: true },
  { feature: "Entrega prioritaria", essential: false, platinum: true },
  { feature: "Diseño de carta bebidas", essential: false, platinum: true },
  { feature: "Formación de personal", essential: false, platinum: true },
  { feature: "Almacenamiento en cava", essential: false, platinum: true },
  { feature: "Acceso a drops exclusivos", essential: false, platinum: true },
];

export const dynamic = "force-dynamic";

export default async function OnPremisePage() {
  // "60+ establecimientos activos", "27 años de experiencia" y "24h de
  // respuesta garantizada" no tenían respaldo. Van datos del catálogo, que es
  // lo que efectivamente se le ofrece a un salón.
  const [piezas, casas, categorias] = await Promise.all([
    prisma.product.count(),
    prisma.product.findMany({ select: { brand: true }, distinct: ["brand"] }).then((r) => r.length),
    prisma.category.count(),
  ]);
  return (
    <div className="bg-surface min-h-screen pb-14">
      {/* HERO — fullscreen B2B impact */}
      <section className="relative h-screen flex flex-col justify-between overflow-hidden -mt-20">
        <div className="absolute inset-0">
          <Image
            src="/heros/onpremise.jpg"
            alt="Establecimiento On Premise Souverain"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-surface/40 to-transparent" />
        </div>

        {/* Top eyebrow */}
        <div className="relative container-souv pt-28">
          <Reveal>
            <div className="eyebrow-gold">Distribuidora Souverain · Programa Profesional</div>
          </Reveal>
        </div>

        {/* Headline */}
        <div className="relative container-souv">
          <Reveal delay={0.06}>
            <div className="eyebrow text-mute mb-4">Su carta, nuestra cava.</div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="display-1 max-w-3xl mb-6">
              Las botellas que su carta<br />
              <span className="italic">merece tener.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-ink/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              Programa exclusivo de distribución para restaurantes, hoteles, bares
              y clubes del AMBA. Asesor dedicado, acceso prioritario y logística
              adaptada al ritmo de su servicio.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#formulario" className="btn-primary">Solicitar cuenta On Premise</a>
              <a href="#como-funciona" className="btn-ghost">Cómo funciona</a>
            </div>
          </Reveal>
        </div>

        {/* Bottom — social proof */}
        <div className="relative container-souv pb-12">
          <Reveal delay={0.3}>
            <div className="flex gap-10 hairline-t pt-8">
              {[
                { n: `${piezas}`, l: "Piezas en la colección" },
                { n: `${casas}`, l: "Casas representadas" },
                { n: `${categorias}`, l: "Categorías" },
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

      {/* Para quién es */}
      <section className="hairline-t bg-background">
        <div className="container-souv py-20 md:py-28">
          <Reveal className="mb-14">
            <div className="eyebrow-gold mb-4">¿Para quién es?</div>
            <h2 className="display-2 max-w-xl">
              Cualquier espacio donde<br />
              la botella <span className="italic">importa.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {SEGMENTS.map((seg, i) => (
              <Reveal key={seg.label} delay={i * 0.08}>
                <div className="group relative aspect-[3/4] overflow-hidden hairline">
                  <Image
                    src={seg.img}
                    alt={seg.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-1000 ease-soft group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/30 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="font-display text-xl text-ink mb-1">{seg.label}</div>
                    <div className="text-[10px] tracking-[0.25em] text-mute uppercase">{seg.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="hairline-t">
        <div className="container-souv py-20 md:py-28">
          <Reveal className="mb-14">
            <div className="eyebrow-gold mb-4">Lo que incluye</div>
            <h2 className="display-2">
              Una cuenta<br />
              <span className="italic">On Premise.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="hairline p-7 h-full group hover:border-gold/30 transition-colors duration-500 bg-background/30">
                  <f.icon size={22} strokeWidth={1.2} className="text-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <div className="eyebrow mb-3">{f.title}</div>
                  <p className="text-mute text-sm leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax break */}
      <section className="relative h-64 overflow-hidden hairline-t">
        <Parallax offset={50}>
          <Image
            src="/heros/cava.jpg"
            alt="Cava On Premise"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
          />
        </Parallax>
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal>
            <p className="font-display italic text-2xl md:text-4xl text-ink text-center px-6 max-w-2xl">
              "La carta de bebidas es el primer lujo que un cliente percibe."
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cómo funciona — timeline */}
      <section id="como-funciona" className="hairline-t bg-background">
        <div className="container-souv py-20 md:py-28">
          <Reveal className="mb-16">
            <div className="eyebrow-gold mb-4">El proceso</div>
            <h2 className="display-2">
              Cuatro pasos para<br />
              <span className="italic">activar su cuenta.</span>
            </h2>
          </Reveal>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-hairline" aria-hidden />
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 md:gap-12">
              {TIMELINE.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.1}>
                  <div className="relative">
                    <div className="w-16 h-16 hairline flex items-center justify-center mb-6 bg-background relative z-10">
                      <span className="font-mono text-gold text-lg">{step.n}</span>
                    </div>
                    <div className="eyebrow mb-3">{step.title}</div>
                    <p className="text-mute text-sm leading-relaxed">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de planes */}
      <section className="hairline-t">
        <div className="container-souv py-20 md:py-28">
          <Reveal className="mb-14">
            <div className="eyebrow-gold mb-4">Planes</div>
            <h2 className="display-2">
              Dos niveles de <span className="italic">servicio.</span>
            </h2>
          </Reveal>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="hairline-b">
                  <th className="text-left pb-6 pr-8 font-normal text-mute text-[11px] uppercase tracking-[0.25em]">Característica</th>
                  <th className="pb-6 px-8 text-center">
                    <div className="eyebrow mb-1">Essential</div>
                    <div className="text-[10px] text-mute tracking-wide">Desde 12 bot/mes</div>
                  </th>
                  <th className="pb-6 px-8 text-center">
                    <div className="eyebrow-gold mb-1">Platinum</div>
                    <div className="text-[10px] text-mute tracking-wide">Desde 30 bot/mes</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {PLAN_ROWS.map(row => (
                  <tr key={row.feature} className="hover:bg-background/30 transition-colors">
                    <td className="py-4 pr-8 text-sm text-ink/80">{row.feature}</td>
                    <td className="py-4 px-8 text-center">
                      {typeof row.essential === "boolean" ? (
                        row.essential
                          ? <CheckCircle2 size={16} className="text-emerald-500 mx-auto" strokeWidth={1.5} />
                          : <XCircle size={16} className="text-mute/40 mx-auto" strokeWidth={1.5} />
                      ) : (
                        <span className="text-[11px] text-mute tracking-wide">{row.essential}</span>
                      )}
                    </td>
                    <td className="py-4 px-8 text-center">
                      {typeof row.platinum === "boolean" ? (
                        row.platinum
                          ? <CheckCircle2 size={16} className="text-gold mx-auto" strokeWidth={1.5} />
                          : <XCircle size={16} className="text-mute/40 mx-auto" strokeWidth={1.5} />
                      ) : (
                        <span className="text-[11px] text-mute tracking-wide">{row.platinum}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-mute mt-6 tracking-wide">
            * El plan se define en la consulta inicial según volumen y tipo de establecimiento.
          </p>
        </div>
      </section>

      {/* FORMULARIO */}
      <section id="formulario" className="hairline-t bg-background">
        <div className="container-souv py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <div className="eyebrow-gold mb-4">Solicitud de cuenta</div>
              <h2 className="display-3 mb-6">
                Abrí su cuenta<br />
                <span className="italic">On Premise.</span>
              </h2>
              <p className="text-mute leading-relaxed mb-8">
                Sin compromiso inicial. La consulta es gratuita y confidencial.
                Un asesor se comunica dentro de 24 horas hábiles.
              </p>
              <div className="hairline p-6 space-y-5">
                <div>
                  <div className="eyebrow mb-1">Teléfono directo</div>
                  <a href={`tel:${SITE.phone}`} className="text-sm text-ink/80 hover:text-gold transition-colors flex items-center gap-2">
                    {SITE.phone} <ArrowRight size={12} />
                  </a>
                </div>
                <div>
                  <div className="eyebrow mb-1">Email</div>
                  <a href={`mailto:${SITE.email}`} className="text-sm text-ink/80 hover:text-gold transition-colors">
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <div className="eyebrow mb-1">Horario</div>
                  <p className="text-sm text-mute">{SITE.hours}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-8">
              <OnPremiseForm />
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
