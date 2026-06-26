export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductosPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-3xl">Productos ({products.length})</h2>
        <Link href="/admin/productos/nuevo" className="btn-primary">+ Nuevo</Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-mute uppercase tracking-widest text-[10px]">
            <tr className="hairline-b">
              <th className="text-left py-3 pr-4">Producto</th>
              <th className="text-left py-3 pr-4">Categoría</th>
              <th className="text-left py-3 pr-4">Stock</th>
              <th className="text-left py-3 pr-4">Flags</th>
              <th className="text-right py-3 pr-4">Precio</th>
              <th className="text-right py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hairline-b">
                <td className="py-4 pr-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-16 bg-surface hairline overflow-hidden flex-shrink-0">
                      <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <div className="font-display text-lg leading-tight">{p.name}</div>
                      <div className="text-mute text-xs">{p.brand}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4 text-mute">{p.category.name}</td>
                <td className="py-4 pr-4 tabular-nums">{p.stock}</td>
                <td className="py-4 pr-4">
                  <div className="flex gap-2 flex-wrap text-[10px] uppercase tracking-widest">
                    {p.featured && <span className="border border-gold/60 text-gold px-2 py-0.5">Featured</span>}
                    {p.isExclusive && <span className="border border-hairline px-2 py-0.5">Luxury</span>}
                  </div>
                </td>
                <td className="py-4 pr-4 text-right tabular-nums">{formatPrice(p.price)}</td>
                <td className="py-4 text-right">
                  <div className="flex justify-end gap-3 text-[11px] uppercase tracking-[0.25em]">
                    <Link href={`/admin/productos/${p.id}`} className="text-ink/80 hover:text-gold">Editar</Link>
                    <DeleteProductButton id={p.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
