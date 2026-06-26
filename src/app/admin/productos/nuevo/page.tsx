import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdmin();
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-3xl mb-10">Nuevo producto</h2>
      <ProductForm categories={categories} />
    </div>
  );
}
