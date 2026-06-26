"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

type Category = { id: string; name: string; slug: string };

export function ShopFilters({ categories, brands }: { categories: Category[]; brands: string[] }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const cat = sp.get("categoria") ?? "";
  const brand = sp.get("marca") ?? "";
  const order = sp.get("orden") ?? "novedades";
  const max = sp.get("max") ?? "";
  const exclusive = sp.get("exclusive") === "1";

  function update(patch: Record<string, string | null>) {
    const next = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") next.delete(k);
      else next.set(k, v);
    }
    router.push(`/tienda${next.toString() ? `?${next.toString()}` : ""}`, { scroll: false });
  }

  useEffect(() => {
    const t = setTimeout(() => {
      if ((sp.get("q") ?? "") !== q) update({ q: q || null });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <aside className="space-y-10">
      <div>
        <div className="eyebrow mb-3">Búsqueda</div>
        <div className="relative">
          <Search size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-mute" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Nombre, bodega…"
            className="input-souv pl-6"
          />
        </div>
      </div>

      <div>
        <div className="eyebrow mb-4">Categoría</div>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => update({ categoria: null })}
              className={`text-sm transition-colors ${!cat ? "text-gold" : "text-ink/80 hover:text-gold"}`}
            >
              Todas
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => update({ categoria: c.slug })}
                className={`text-sm transition-colors ${cat === c.slug ? "text-gold" : "text-ink/80 hover:text-gold"}`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="eyebrow mb-4">Marca</div>
        <ul className="space-y-2 max-h-56 overflow-y-auto pr-2">
          <li>
            <button
              onClick={() => update({ marca: null })}
              className={`text-sm transition-colors ${!brand ? "text-gold" : "text-ink/80 hover:text-gold"}`}
            >
              Todas
            </button>
          </li>
          {brands.map((b) => (
            <li key={b}>
              <button
                onClick={() => update({ marca: b })}
                className={`text-sm text-left transition-colors ${brand === b ? "text-gold" : "text-ink/80 hover:text-gold"}`}
              >
                {b}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="eyebrow mb-4">Precio máx. (ARS)</div>
        <input
          type="number"
          inputMode="numeric"
          placeholder="Ej. 500000"
          value={max}
          onChange={(e) => update({ max: e.target.value || null })}
          className="input-souv"
        />
      </div>

      <div>
        <div className="eyebrow mb-4">Orden</div>
        <select
          value={order}
          onChange={(e) => update({ orden: e.target.value })}
          className="input-souv appearance-none"
        >
          <option value="novedades" className="bg-surface">Novedades</option>
          <option value="precio-asc" className="bg-surface">Precio · menor a mayor</option>
          <option value="precio-desc" className="bg-surface">Precio · mayor a menor</option>
          <option value="nombre" className="bg-surface">Nombre A→Z</option>
        </select>
      </div>

      <div className="hairline-t pt-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={exclusive}
            onChange={(e) => update({ exclusive: e.target.checked ? "1" : null })}
            className="accent-gold w-4 h-4"
          />
          <span className="text-sm text-ink/90">Solo Luxury Black</span>
        </label>
      </div>
    </aside>
  );
}
