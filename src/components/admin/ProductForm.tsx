"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Category = { id: string; name: string; slug: string };

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  tastingNotes: string;
  origin: string;
  brand: string;
  categoryId: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured: boolean;
  isExclusive: boolean;
};

export function ProductForm({ categories, product }: { categories: Category[]; product?: Product }) {
  const router = useRouter();
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    tastingNotes: product?.tastingNotes ?? "",
    origin: product?.origin ?? "",
    brand: product?.brand ?? "",
    categoryId: product?.categoryId ?? categories[0]?.id ?? "",
    // El admin escribe el precio en pesos enteros; lo convertimos a centavos al guardar.
    price: product ? (product.price / 100).toString() : "",
    stock: product ? product.stock.toString() : "0",
    imageUrl: product?.imageUrl ?? "",
    featured: product?.featured ?? false,
    isExclusive: product?.isExclusive ?? false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...form,
      price: Math.round(Number(form.price) * 100),
      stock: Number(form.stock),
    };

    try {
      const res = await fetch(
        isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Error al guardar");
      router.push("/admin/productos");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="eyebrow block mb-2">Nombre *</label>
          <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input-souv" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Slug *</label>
          <input required value={form.slug} onChange={(e) => update("slug", e.target.value)} className="input-souv" placeholder="ej. macallan-18" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Marca *</label>
          <input required value={form.brand} onChange={(e) => update("brand", e.target.value)} className="input-souv" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Categoría *</label>
          <select required value={form.categoryId} onChange={(e) => update("categoryId", e.target.value)} className="input-souv">
            {categories.map((c) => (
              <option key={c.id} value={c.id} className="bg-surface">{c.name}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="eyebrow block mb-2">Origen *</label>
          <input required value={form.origin} onChange={(e) => update("origin", e.target.value)} className="input-souv" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Precio (ARS) *</label>
          <input required type="number" min="0" step="1" value={form.price} onChange={(e) => update("price", e.target.value)} className="input-souv" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Stock *</label>
          <input required type="number" min="0" step="1" value={form.stock} onChange={(e) => update("stock", e.target.value)} className="input-souv" />
        </div>
        <div className="md:col-span-2">
          <label className="eyebrow block mb-2">URL imagen *</label>
          <input required type="url" value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} className="input-souv" />
        </div>
        <div className="md:col-span-2">
          <label className="eyebrow block mb-2">Descripción *</label>
          <textarea required rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} className="input-souv resize-none" />
        </div>
        <div className="md:col-span-2">
          <label className="eyebrow block mb-2">Notas de cata *</label>
          <textarea required rows={3} value={form.tastingNotes} onChange={(e) => update("tastingNotes", e.target.value)} className="input-souv resize-none" />
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="accent-gold w-4 h-4" />
          <span className="text-sm">Destacado en home</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.isExclusive} onChange={(e) => update("isExclusive", e.target.checked)} className="accent-gold w-4 h-4" />
          <span className="text-sm">Luxury Black Selection</span>
        </label>
      </div>

      {error && <p className="text-sm text-gold">{error}</p>}

      <div className="flex gap-4">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Guardando…" : isEdit ? "Actualizar" : "Crear producto"}
        </button>
        <button type="button" onClick={() => router.back()} className="btn-ghost">
          Cancelar
        </button>
      </div>
    </form>
  );
}
