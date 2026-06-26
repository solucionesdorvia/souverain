"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    setLoading(true);
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setLoading(false);
    if (res.ok) router.refresh();
    else alert("Error al eliminar");
  }

  return (
    <button
      onClick={onDelete}
      disabled={loading}
      className="text-mute hover:text-gold transition-colors"
    >
      {loading ? "…" : "Eliminar"}
    </button>
  );
}
