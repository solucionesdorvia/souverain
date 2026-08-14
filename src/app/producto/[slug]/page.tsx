import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AddToCart } from "@/components/AddToCart";
import { GalleryPiece } from "@/components/GalleryPiece";
import { Reveal } from "@/components/Reveal";
import { formatPrice } from "@/lib/utils";
import { buildWhatsappUrl } from "@/lib/checkout-mode";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!p) return { title: "Pieza no encontrada" };
  return {
    title: p.name,
    description: p.description,
    openGraph: { title: p.name, description: p.description, images: [p.imageUrl] },
  };
}

export default async function ProductoPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const isConsultar = product.checkoutMode === "CONSULTAR";
  const lowStock = product.stock > 0 && product.stock <= 6;
  const consultarUrl = isConsultar
    ? `https://wa.me/${process.env.WHATSAPP_NUMBER ?? "5491157581269"}?text=${encodeURIComponent(`Hola Souverain, quiero consultar disponibilidad y precio de: ${product.name}`)}`
    : null;

  return (
    <div className="container-souv pt-12 pb-24">
      <nav className="label-souv mb-12">
        <Link href="/" className="hover:text-gold transition-colors duration-500">Inicio</Link>
        <span className="mx-3 text-hairline">/</span>
        <Link href="/tienda" className="hover:text-gold transition-colors duration-500">La Colección</Link>
        <span className="mx-3 text-hairline">/</span>
        <Link
          href={`/tienda?categoria=${product.category.slug}`}
          className="hover:text-gold transition-colors duration-500"
        >
          {product.category.name}
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <Reveal className="lg:col-span-7">
          <div className="relative aspect-[3/4] lg:aspect-[4/5] bg-surface hairline overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/40 via-transparent to-transparent" />
            {product.isExclusive && (
              <div className="absolute top-6 left-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold border border-gold/60 px-3 py-1.5 bg-abyss/60 backdrop-blur-sm">
                  Luxury Black
                </span>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <div className="eyebrow-gold mb-4">{product.brand}</div>
            <h1 className="font-display text-4xl md:text-5xl xl:text-6xl leading-[1.02] tracking-tightest mb-5">
              {product.name}
            </h1>
            <div className="caption mb-8">{product.origin}</div>

            {!isConsultar && (
              <div className="flex items-baseline gap-4 mb-10">
                <span className="font-display text-3xl text-gold">{formatPrice(product.price)}</span>
                {lowStock && (
                  <span className="label-souv text-bronze">
                    Últimas {product.stock} botellas
                  </span>
                )}
              </div>
            )}

            <div className="hairline-t hairline-b py-8 mb-10 space-y-7">
              <div>
                <div className="eyebrow mb-3">La pieza</div>
                <p className="text-ink/85 text-sm leading-relaxed">{product.description}</p>
              </div>
              <div>
                <div className="eyebrow mb-3">Notas de cata</div>
                <p className="font-display italic text-lg text-ink/80 leading-relaxed">
                  {product.tastingNotes}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-1">
                <div>
                  <div className="eyebrow mb-2">Origen</div>
                  <div className="text-sm text-ink/85">{product.origin}</div>
                </div>
                <div>
                  <div className="eyebrow mb-2">Disponibilidad</div>
                  <div className="text-sm text-ink/85">
                    {product.stock > 0 ? "En cava" : "Bajo pedido"}
                  </div>
                </div>
              </div>
            </div>

            {isConsultar ? (
              <div className="space-y-4">
                <a
                  href={consultarUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block"
                >
                  Consultar disponibilidad →
                </a>
                <p className="text-[11px] uppercase tracking-[0.25em] text-mute text-center">
                  Por WhatsApp · Sin compromiso
                </p>
              </div>
            ) : (
              <AddToCart
                productId={product.id}
                slug={product.slug}
                name={product.name}
                imageUrl={product.imageUrl}
                unitPrice={product.price}
                showWhatsapp={false}
              />
            )}

            <p className="caption mt-6">
              Entrega cuidada en CABA y GBA · Venta exclusiva a mayores de 18 años
            </p>
          </div>
        </Reveal>
      </div>

      {related.length > 0 && (
        <section className="mt-32 hairline-t pt-20">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="eyebrow-gold mb-3">De la misma colección</div>
              <h2 className="display-3">Otras piezas en {product.category.name}</h2>
            </div>
            <Link
              href={`/tienda?categoria=${product.category.slug}`}
              className="btn-link hidden md:inline-flex"
            >
              Ver la colección →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-10">
            {related.map((p, i) => (
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
        </section>
      )}
    </div>
  );
}
