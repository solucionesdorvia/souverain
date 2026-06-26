import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Whisky", slug: "whisky" },
  { name: "Champagne", slug: "champagne" },
  { name: "Vinos", slug: "vinos" },
  { name: "Cognac", slug: "cognac" },
  { name: "Espirituosas", slug: "espirituosas" },
];

// Precios en centavos ARS.
const products: Array<{
  name: string;
  slug: string;
  description: string;
  tastingNotes: string;
  origin: string;
  brand: string;
  categorySlug: string;
  price: number;
  stock: number;
  imageUrl: string;
  featured?: boolean;
  isExclusive?: boolean;
}> = [
  {
    name: "Macallan 18 Sherry Oak",
    slug: "macallan-18-sherry-oak",
    description:
      "Single malt madurado dieciocho años en barricas de roble europeo curadas con jerez. Equilibrio entre fruta seca, especias y madera noble.",
    tastingNotes:
      "Naranja confitada, pasas, clavo de olor, chocolate amargo y un final largo a roble tostado.",
    origin: "Speyside, Escocia",
    brand: "The Macallan",
    categorySlug: "whisky",
    price: 78000000,
    stock: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    isExclusive: true,
  },
  {
    name: "Dom Pérignon Vintage 2013",
    slug: "dom-perignon-vintage-2013",
    description:
      "Champagne de añada elaborado solo en cosechas excepcionales. Burbuja fina y persistente, estructura cremosa.",
    tastingNotes:
      "Brioche tostado, almendra, cítricos confitados, mineral salino, final largo y vertical.",
    origin: "Épernay, Champagne, Francia",
    brand: "Dom Pérignon",
    categorySlug: "champagne",
    price: 42000000,
    stock: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    isExclusive: true,
  },
  {
    name: "Catena Zapata Adrianna River Stones Malbec 2019",
    slug: "catena-zapata-river-stones-malbec",
    description:
      "Parcela única del viñedo Adrianna en Gualtallary. Uno de los Malbec más laureados de Argentina.",
    tastingNotes:
      "Violetas, frutos negros, hierbas frescas, grafito y una acidez tensa que sostiene un final mineral.",
    origin: "Gualtallary, Mendoza, Argentina",
    brand: "Catena Zapata",
    categorySlug: "vinos",
    price: 18500000,
    stock: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Hennessy Paradis Impérial",
    slug: "hennessy-paradis-imperial",
    description:
      "Assemblage de eaux-de-vie raras del corazón de Cognac. Encarna la esencia de la maison Hennessy.",
    tastingNotes:
      "Pétalos de jazmín, miel, naranja sanguina, especias dulces y madera muy fina.",
    origin: "Cognac, Francia",
    brand: "Hennessy",
    categorySlug: "cognac",
    price: 95000000,
    stock: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    isExclusive: true,
  },
  {
    name: "Johnnie Walker Blue Label",
    slug: "johnnie-walker-blue-label",
    description:
      "Blend escocés ultra premium. Selección de barricas raras con un perfil sedoso y profundo.",
    tastingNotes:
      "Miel, frutas rojas maduras, humo delicado, especias y un final amielado.",
    origin: "Escocia",
    brand: "Johnnie Walker",
    categorySlug: "whisky",
    price: 32000000,
    stock: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
  {
    name: "Krug Grande Cuvée 171ème Édition",
    slug: "krug-grande-cuvee-171",
    description:
      "Multivintage de más de 140 vinos. La expresión más completa del estilo Krug.",
    tastingNotes:
      "Avellana tostada, mazapán, manzana cocida, jengibre y una sal mineral muy elegante.",
    origin: "Reims, Champagne, Francia",
    brand: "Krug",
    categorySlug: "champagne",
    price: 38000000,
    stock: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1200&auto=format&fit=crop",
    featured: false,
  },
  {
    name: "Glenfiddich 21 Gran Reserva",
    slug: "glenfiddich-21-gran-reserva",
    description:
      "Single malt terminado en barricas de ron caribeño. Carácter cálido y especiado.",
    tastingNotes:
      "Banana asada, toffee, nuez moscada, jengibre confitado y roble tostado.",
    origin: "Dufftown, Speyside, Escocia",
    brand: "Glenfiddich",
    categorySlug: "whisky",
    price: 24500000,
    stock: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Château Margaux 2015",
    slug: "chateau-margaux-2015",
    description:
      "Primer Cru Classé del Médoc. Una añada histórica de Burdeos, equilibrio perfecto entre potencia y elegancia.",
    tastingNotes:
      "Grosella negra, violetas, cedro, tabaco rubio, taninos finísimos y final infinito.",
    origin: "Margaux, Burdeos, Francia",
    brand: "Château Margaux",
    categorySlug: "vinos",
    price: 165000000,
    stock: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1568213816046-0ee1c42bd559?q=80&w=1200&auto=format&fit=crop",
    isExclusive: true,
    featured: true,
  },
  {
    name: "Rémy Martin XO",
    slug: "remy-martin-xo",
    description:
      "Assemblage de hasta 400 eaux-de-vie de Grande y Petite Champagne. Cognac generoso y opulento.",
    tastingNotes:
      "Ciruela madura, higo, canela, jazmín, avellana y madera dulce.",
    origin: "Cognac, Francia",
    brand: "Rémy Martin",
    categorySlug: "cognac",
    price: 22000000,
    stock: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Grey Goose Magnum 1.75L",
    slug: "grey-goose-magnum",
    description:
      "Vodka francés de trigo suave y agua de Gensac. Edición magnum para mesa.",
    tastingNotes:
      "Limpia, sedosa, leve dulzor a cereal, final fresco.",
    origin: "Cognac, Francia",
    brand: "Grey Goose",
    categorySlug: "espirituosas",
    price: 9800000,
    stock: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Tanqueray No. TEN",
    slug: "tanqueray-no-ten",
    description:
      "Gin small-batch destilado con cítricos enteros frescos. Referente para el Martini.",
    tastingNotes:
      "Pomelo rosado, lima, enebro, manzanilla y un final brillante.",
    origin: "Escocia",
    brand: "Tanqueray",
    categorySlug: "espirituosas",
    price: 4200000,
    stock: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Veuve Clicquot La Grande Dame 2015",
    slug: "veuve-clicquot-la-grande-dame-2015",
    description:
      "Cuvée de prestigio de la maison. Pinot Noir dominante de grandes crus.",
    tastingNotes:
      "Pera williams, pan tostado, almendra, flor blanca y un final saliniano.",
    origin: "Reims, Champagne, Francia",
    brand: "Veuve Clicquot",
    categorySlug: "champagne",
    price: 28500000,
    stock: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Lagavulin 16",
    slug: "lagavulin-16",
    description:
      "Single malt de Islay, ícono ahumado. Dieciséis años de maduración.",
    tastingNotes:
      "Turba, alquitrán, yodo marino, fruta seca y un final largo, ahumado y dulce.",
    origin: "Islay, Escocia",
    brand: "Lagavulin",
    categorySlug: "whisky",
    price: 16500000,
    stock: 11,
    imageUrl:
      "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Don Julio 1942",
    slug: "don-julio-1942",
    description:
      "Tequila añejo Reserva. Mínimo dos años y medio en barrica de roble americano.",
    tastingNotes:
      "Vainilla, caramelo, chocolate, agave cocido y un final cálido y sedoso.",
    origin: "Jalisco, México",
    brand: "Don Julio",
    categorySlug: "espirituosas",
    price: 19800000,
    stock: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?q=80&w=1200&auto=format&fit=crop",
    featured: false,
  },
  {
    name: "Bodega Chacra Treinta y Dos Pinot Noir 2021",
    slug: "chacra-treinta-y-dos-pinot-noir",
    description:
      "Pinot Noir biodinámico de viñas de 1932 en Río Negro. Una de las grandes joyas patagónicas.",
    tastingNotes:
      "Frutilla silvestre, hierbas frescas, té negro, mineral y una textura sedosa.",
    origin: "Mainqué, Río Negro, Patagonia, Argentina",
    brand: "Bodega Chacra",
    categorySlug: "vinos",
    price: 14500000,
    stock: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1547595628-c61a29f496f0?q=80&w=1200&auto=format&fit=crop",
    featured: true,
  },
];

async function main() {
  console.log("→ Limpiando datos previos…");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("→ Creando categorías…");
  const categoryMap: Record<string, string> = {};
  for (const c of categories) {
    const created = await prisma.category.create({ data: c });
    categoryMap[c.slug] = created.id;
  }

  console.log("→ Creando productos…");
  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        tastingNotes: p.tastingNotes,
        origin: p.origin,
        brand: p.brand,
        categoryId: categoryMap[p.categorySlug],
        price: p.price,
        stock: p.stock,
        imageUrl: p.imageUrl,
        featured: !!p.featured,
        isExclusive: !!p.isExclusive,
      },
    });
  }

  console.log(`✓ Seed completo: ${categories.length} categorías, ${products.length} productos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
