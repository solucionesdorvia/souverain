import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/site";

// El sitemap se resolvía en el build, cuando la base todavía no responde, y el
// `.catch(() => [])` devolvía la lista vacía sin avisar: en producción salían
// cuatro URLs y ninguna ficha de producto. Al ser dinámico se arma con cada
// pedido, así que refleja el catálogo real.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await prisma.product
    .findMany({ select: { slug: true, updatedAt: true } })
    .catch(() => []);

  const base = SITE.url;
  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/tienda`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/la-cava`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/ediciones-limitadas`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/maridajes`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guia-de-regalos`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/on-premise`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contacto`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/terminos`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/arrepentimiento`, changeFrequency: "yearly", priority: 0.3 },
  ];
  const productUrls: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/producto/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  return [...staticUrls, ...productUrls];
}
