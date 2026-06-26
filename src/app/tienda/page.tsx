import type { Metadata } from "next";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { GalleryPiece } from "@/components/GalleryPiece";
import { ShopFilters } from "@/components/ShopFilters";

export const metadata: Metadata = {
  title: "La Colección",
  description:
    "La colección Souverain: whisky, champagne, vinos finos y espirituosas de alta gama, curados pieza por pieza.",
};

export const dynamic = "force-dynamic";

type SP = {
  q?: string;
  categoria?: string;
  marca?: string;
  max?: string;
  orden?: string;
  exclusive?: string;
};

function buildOrderBy(orden?: string): Prisma.ProductOrderByWithRelationInput {
  switch (orden) {
    case "precio-asc":
      return { price: "asc" };
    case "precio-desc":
      return { price: "desc" };
    case "nombre":
      return { name: "asc" };
    case "novedades":
    default:
      return { createdAt: "desc" };
  }
}

export default async function TiendaPage({ searchParams }: { searchParams: SP }) {
  const where: Prisma.ProductWhereInput = {};
  if (searchParams.categoria) where.category = { slug: searchParams.categoria };
  if (searchParams.marca) where.brand = searchParams.marca;
  if (searchParams.exclusive === "1") where.isExclusive = true;
  if (searchParams.max) {
    const n = Number(searchParams.max);
    if (!Number.isNaN(n) && n > 0) where.price = { lte: n * 100 };
  }
  if (searchParams.q) {
    const q = searchParams.q;
    where.OR = [
      { name: { contains: q } },
      { brand: { contains: q } },
      { description: { contains: q } },
      { origin: { contains: q } },
    ];
  }

  const [products, categories, brandsRaw] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: buildOrderBy(searchParams.orden),
      include: { category: true },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.product.findMany({ select: { brand: true }, distinct: ["brand"], orderBy: { brand: "asc" } }),
  ]);

  const brands = brandsRaw.map((b) => b.brand);
  const isExclusive = searchParams.exclusive === "1";

  return (
    <div className="container-souv py-16 md:py-24">
      <header className="mb-16 md:mb-20 max-w-3xl">
        <div className="eyebrow-gold mb-4">
          {isExclusive ? "Luxury Black Selection" : "La colección"}
        </div>
        <h1 className="display-2 mb-6">
          {isExclusive ? (
            <>Las piezas que no se <span className="italic">exhiben.</span></>
          ) : (
            <>Cada botella, una <span className="italic">pieza.</span></>
          )}
        </h1>
        <p className="text-mute text-base md:text-lg leading-relaxed max-w-xl">
          {isExclusive
            ? "Asignaciones raras y botellas numeradas. Cada referencia se incorpora una sola vez."
            : "Recorra la colección por categoría, casa o precio. Si la botella que busca no figura, la conseguimos."}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16">
        <ShopFilters categories={categories} brands={brands} />

        <section>
          <div className="flex items-baseline justify-between mb-10 hairline-b pb-4">
            <span className="label-souv">
              {products.length} {products.length === 1 ? "pieza en exhibición" : "piezas en exhibición"}
            </span>
          </div>
          {products.length === 0 ? (
            <div className="hairline p-16 md:p-24 text-center">
              <div className="gallery-number mb-6">—</div>
              <p className="font-display text-2xl md:text-3xl mb-4">
                Ninguna pieza coincide con su búsqueda.
              </p>
              <p className="caption max-w-sm mx-auto mb-10">
                Lo que no está en exhibición muchas veces está en cava. Consulte
                por la botella que busca y la conseguimos.
              </p>
              <Link href="/contacto" className="btn-ghost">
                Hablar con un asesor
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-14 md:gap-x-10">
              {products.map((p, i) => (
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
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
