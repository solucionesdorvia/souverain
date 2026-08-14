import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Imágenes placeholder por categoría ───────────────────────────────────────
const IMG = {
  whisky:    "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1200&auto=format&fit=crop",
  champagne: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1200&auto=format&fit=crop",
  cognac:    "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1200&auto=format&fit=crop",
  gin:       "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=1200&auto=format&fit=crop",
  ron:       "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=1200&auto=format&fit=crop",
  vodka:     "https://images.unsplash.com/photo-1598952966317-5d5af38b5ee6?q=80&w=1200&auto=format&fit=crop",
  vino:      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop",
};

const categories = [
  { name: "Whisky",    slug: "whisky" },
  { name: "Champagne", slug: "champagne" },
  { name: "Cognac",    slug: "cognac" },
  { name: "Gin",       slug: "gin" },
  { name: "Ron",       slug: "ron" },
  { name: "Vodka",     slug: "vodka" },
  { name: "Vinos",     slug: "vinos" },
];

type ProductInput = {
  name: string;
  sku: string;
  brand: string;
  origin: string;
  categorySlug: string;
  checkoutMode: "WEB" | "CONSULTAR";
  featured?: boolean;
  isExclusive?: boolean;
};

// slug seguro desde nombre + SKU
function toSlug(name: string, sku: string) {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") + "-" + sku;
}

const products: ProductInput[] = [
  // ─── WHISKY ────────────────────────────────────────────────────────────────
  { name: "Chivas Regal 18 YO", sku: "52554", brand: "Chivas Regal", origin: "Escocia", categorySlug: "whisky", checkoutMode: "WEB" },
  { name: "Chivas Regal Ultis", sku: "52556", brand: "Chivas Regal", origin: "Escocia", categorySlug: "whisky", checkoutMode: "WEB" },
  { name: "Royal Salute 21 YO", sku: "78", brand: "Royal Salute", origin: "Escocia", categorySlug: "whisky", checkoutMode: "WEB" },
  { name: "The Glenlivet 18 YO", sku: "50689", brand: "The Glenlivet", origin: "Speyside, Escocia", categorySlug: "whisky", checkoutMode: "WEB" },
  { name: "Longmorn Distiller's Choice", sku: "14974", brand: "Longmorn", origin: "Speyside, Escocia", categorySlug: "whisky", checkoutMode: "WEB" },
  { name: "Scapa Skiren", sku: "14975", brand: "Scapa", origin: "Orkney, Escocia", categorySlug: "whisky", checkoutMode: "WEB" },
  { name: "Aberlour 12 YO (caja 3)", sku: "14973", brand: "Aberlour", origin: "Speyside, Escocia", categorySlug: "whisky", checkoutMode: "WEB" },
  { name: "Aberlour 12 YO", sku: "54783", brand: "Aberlour", origin: "Speyside, Escocia", categorySlug: "whisky", checkoutMode: "WEB" },
  { name: "Scapa Glansa", sku: "52219", brand: "Scapa", origin: "Orkney, Escocia", categorySlug: "whisky", checkoutMode: "WEB" },

  // ─── GIN ───────────────────────────────────────────────────────────────────
  { name: "Monkey 47 Dry Gin", sku: "50246", brand: "Monkey 47", origin: "Selva Negra, Alemania", categorySlug: "gin", checkoutMode: "WEB" },
  { name: "Gin Malfy Original", sku: "53208", brand: "Malfy", origin: "Torino, Italia", categorySlug: "gin", checkoutMode: "WEB" },
  { name: "Gin Malfy Limone", sku: "53210", brand: "Malfy", origin: "Torino, Italia", categorySlug: "gin", checkoutMode: "WEB" },
  { name: "Gin Malfy Pink", sku: "53209", brand: "Malfy", origin: "Torino, Italia", categorySlug: "gin", checkoutMode: "WEB" },

  // ─── RON ───────────────────────────────────────────────────────────────────
  { name: "Havana Club Selección de Maestros", sku: "11329", brand: "Havana Club", origin: "Cuba", categorySlug: "ron", checkoutMode: "WEB" },

  // ─── VODKA ─────────────────────────────────────────────────────────────────
  { name: "Absolut Elyx", sku: "12778", brand: "Absolut", origin: "Åhus, Suecia", categorySlug: "vodka", checkoutMode: "WEB" },

  // ─── CHAMPAGNE — Perrier-Jouët & GH Mumm ──────────────────────────────────
  { name: "Perrier-Jouët Grand Brut", sku: "51818", brand: "Perrier-Jouët", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Perrier-Jouët Blanc de Blancs", sku: "52143", brand: "Perrier-Jouët", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Perrier-Jouët Belle Époque", sku: "12765", brand: "Perrier-Jouët", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB", isExclusive: true },
  { name: "GH Mumm Cordon Rouge", sku: "51816", brand: "GH Mumm", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "GH Mumm Grand Cordon Rosé", sku: "51517", brand: "GH Mumm", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "GH Mumm Olympe Demi Sec", sku: "52142", brand: "GH Mumm", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB" },

  // ─── CHAMPAGNE — Dom Pérignon ──────────────────────────────────────────────
  { name: "Dom Pérignon Blanc Vintage 2017", sku: "4787", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB", featured: true },
  { name: "Dom Pérignon Blanc Vintage 2015", sku: "4633", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Dom Pérignon Blanc Vintage 2013", sku: "4438", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Dom Pérignon Luminous Label 2015", sku: "4655", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  // CONSULTAR
  { name: "Dom Pérignon Luminous Label 2013", sku: "4466", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Dom Pérignon Blanc Vintage 2012 Magnum", sku: "4541", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Dom Pérignon Blanc Vintage 2010 Magnum", sku: "4309", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Dom Pérignon Blanc Vintage 2008 Magnum", sku: "4120", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Dom Pérignon Rosé Vintage 2009", sku: "4680", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Dom Pérignon Rosé Vintage 2008", sku: "4308", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Dom Pérignon Rosé Vintage 2006", sku: "4194", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Dom Pérignon P2 Vintage 2004", sku: "4467", brand: "Dom Pérignon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },

  // ─── CHAMPAGNE — Moët & Chandon ────────────────────────────────────────────
  { name: "Moët & Chandon Nectar Impérial", sku: "4623", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Moët & Chandon Brut Impérial", sku: "65", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Moët & Chandon Brut Imperial Golden", sku: "4121", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Moët & Chandon Ice Impérial", sku: "4639", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Moët & Chandon Grand Vintage Brut 2016", sku: "4749", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Moët & Chandon MCIII", sku: "3615", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB", isExclusive: true },
  { name: "Moët & Chandon Brut Rosé", sku: "4637", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Moët & Chandon Rosé Impérial", sku: "2721", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Moët & Chandon Grand Vintage Rosé 2015", sku: "4470", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Moët & Chandon Grand Vintage Rosé 2013", sku: "4305", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Moët & Chandon Rosé Imperial EOY21", sku: "4285", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  // CONSULTAR
  { name: "Moët & Chandon Grand Vintage Brut 2015", sku: "4468", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Moët & Chandon Grand Vintage Brut 2013", sku: "4304", brand: "Moët & Chandon", origin: "Épernay, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },

  // ─── COGNAC — Hennessy ─────────────────────────────────────────────────────
  { name: "Hennessy V.S.", sku: "88", brand: "Hennessy", origin: "Cognac, Francia", categorySlug: "cognac", checkoutMode: "WEB" },
  { name: "Hennessy V.S. Luminous 2022", sku: "4414", brand: "Hennessy", origin: "Cognac, Francia", categorySlug: "cognac", checkoutMode: "WEB" },
  { name: "Hennessy V.S. Magnum", sku: "4396", brand: "Hennessy", origin: "Cognac, Francia", categorySlug: "cognac", checkoutMode: "WEB" },
  { name: "Hennessy V.S.O.P.", sku: "91", brand: "Hennessy", origin: "Cognac, Francia", categorySlug: "cognac", checkoutMode: "WEB" },
  { name: "Hennessy X.O.", sku: "4643", brand: "Hennessy", origin: "Cognac, Francia", categorySlug: "cognac", checkoutMode: "WEB", isExclusive: true },
  // CONSULTAR
  { name: "Hennessy V.S. 20cl", sku: "3782", brand: "Hennessy", origin: "Cognac, Francia", categorySlug: "cognac", checkoutMode: "CONSULTAR" },

  // ─── CHAMPAGNE — Veuve Clicquot ────────────────────────────────────────────
  { name: "Veuve Clicquot Yellow Label Brut", sku: "4380", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Veuve Clicquot Yellow Label Brut Magnum", sku: "4642", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Veuve Clicquot Brut Rosé", sku: "4499", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Veuve Clicquot Rich On Ice", sku: "4616", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  { name: "Veuve Clicquot La Grande Dame Brut", sku: "4538", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB", isExclusive: true },
  { name: "Veuve Clicquot La Grande Dame Rosé", sku: "4522", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB", isExclusive: true },
  { name: "Veuve Clicquot Rich Rosé On Ice", sku: "4697", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "WEB" },
  // CONSULTAR
  { name: "Veuve Clicquot Extra Brut Extra Old", sku: "4306", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Veuve Clicquot Vintage 2012 Rosé", sku: "4021", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Veuve Clicquot Vintage Reserve 2015", sku: "4537", brand: "Veuve Clicquot", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },

  // ─── CHAMPAGNE — Krug ──────────────────────────────────────────────────────
  { name: "Krug Grande Cuvée 173ème Édition", sku: "4751", brand: "Krug", origin: "Reims, Francia", categorySlug: "champagne", checkoutMode: "CONSULTAR", isExclusive: true },

  // ─── VINOS — Cheval des Andes ──────────────────────────────────────────────
  { name: "Cheval des Andes 2022", sku: "4683", brand: "Cheval des Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB", featured: true },
  { name: "Cheval des Andes 2022 Magnum", sku: "4684", brand: "Cheval des Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Cheval des Andes 2021", sku: "4583", brand: "Cheval des Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  // CONSULTAR
  { name: "Cheval des Andes 2020", sku: "4475", brand: "Cheval des Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Cheval des Andes 2019", sku: "4379", brand: "Cheval des Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Cheval des Andes 2018", sku: "4242", brand: "Cheval des Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },

  // ─── VINOS — Terrazas de los Andes ─────────────────────────────────────────
  { name: "Terrazas Grand Malbec 2022", sku: "4712", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Terrazas Grand Cabernet Sauvignon 2022", sku: "4713", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Terrazas Grand Chardonnay 2023", sku: "4711", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Terrazas Grand Chardonnay 2021", sku: "4368", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Terrazas Petit Manseng 2021", sku: "4648", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Terrazas Origen Chardonnay 2025", sku: "4682", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Terrazas Origen Altamira MB/CS 2022", sku: "4520", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Terrazas Origen Los Chacayes MB 2022", sku: "4519", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Terrazas Origen Las Compuertas MB 2022", sku: "4518", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  { name: "Terrazas Origen Caja Combinada", sku: "4531", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB" },
  // CONSULTAR
  { name: "Terrazas Grand Malbec 2021", sku: "4485", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Terrazas Grand Malbec 2020", sku: "4412", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Terrazas Grand Cabernet Sauvignon 2021", sku: "4484", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Terrazas Grand Cabernet Sauvignon 2020", sku: "4413", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Terrazas Grand Chardonnay 2022", sku: "4483", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Terrazas Petit Manseng 2020", sku: "4488", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Terrazas Origen Las Compuertas MB 2021", sku: "4350", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Terrazas Origen Los Chacayes MB 2021", sku: "4393", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },
  { name: "Terrazas Origen Paraje Altamira MB/CS 2021", sku: "4394", brand: "Terrazas de los Andes", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "CONSULTAR", isExclusive: true },

  // ─── VINOS — Cosechas Históricas ───────────────────────────────────────────
  { name: "Arnaldo B 3 Litros", sku: "51913", brand: "Arnaldo B", origin: "Mendoza, Argentina", categorySlug: "vinos", checkoutMode: "WEB", isExclusive: true },
  { name: "Etchart Cosecha 92", sku: "51914", brand: "Etchart", origin: "Salta, Argentina", categorySlug: "vinos", checkoutMode: "WEB", isExclusive: true },
];

async function main() {
  console.log("Limpiando datos anteriores...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("Creando categorías...");
  const catMap: Record<string, string> = {};
  for (const cat of categories) {
    const c = await prisma.category.create({ data: cat });
    catMap[cat.slug] = c.id;
  }

  console.log(`Creando ${products.length} productos...`);
  for (const p of products) {
    const imageUrl = IMG[p.categorySlug as keyof typeof IMG] ?? IMG.whisky;
    await prisma.product.create({
      data: {
        name: p.name,
        slug: toSlug(p.name, p.sku),
        sku: p.sku,
        description: `${p.brand} — ${p.name}. Disponible para distribución exclusiva.`,
        tastingNotes: "Consultar con nuestro equipo para notas de cata detalladas.",
        origin: p.origin,
        brand: p.brand,
        categoryId: catMap[p.categorySlug],
        price: 0,
        stock: p.checkoutMode === "CONSULTAR" ? 1 : 6,
        imageUrl,
        checkoutMode: p.checkoutMode,
        featured: p.featured ?? false,
        isExclusive: p.isExclusive ?? false,
      },
    });
  }

  console.log(`✓ ${products.length} productos creados.`);
  console.log(`  WEB: ${products.filter(p => p.checkoutMode === "WEB").length}`);
  console.log(`  CONSULTAR: ${products.filter(p => p.checkoutMode === "CONSULTAR").length}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
