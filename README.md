# Distribuidora Souverain

E-commerce premium de bebidas (Buenos Aires). Casa de licores, champagne y vinos
finos — boutique de lujo sobrio. Sección estrella: **Luxury Black Selection**.

## Stack

- **Next.js 14** App Router + TypeScript estricto
- **Tailwind CSS** + componentes propios, **Framer Motion** para animaciones
- **Prisma** ORM (SQLite en dev, PostgreSQL en prod)
- **Stripe** Checkout (modular: Stripe ↔ WhatsApp)
- **next/image** + Unsplash para fotos optimizadas

## Estructura

```
src/
├── app/                          (App Router)
│   ├── page.tsx                  — Home con hero, Luxury Black, categorías
│   ├── tienda/                   — Catálogo con filtros + búsqueda + orden
│   ├── producto/[slug]/          — Detalle con notas de cata + relacionados
│   ├── carrito/                  — Carrito con localStorage
│   ├── checkout/                 — Checkout (Stripe o WhatsApp según env)
│   │   ├── success/              — Confirmación
│   │   └── cancel/               — Cancelación
│   ├── nosotros/                 — Historia de la casa
│   ├── contacto/                 — Form + mapa + datos
│   ├── admin/                    — Panel (login + CRUD productos + pedidos)
│   └── api/                      — Routes: checkout, webhook, admin, contact
├── components/                   — UI compartida + sección admin
├── lib/                          — prisma, stripe, cart, checkout-mode, auth
prisma/
├── schema.prisma                 — Product, Category, Order, OrderItem
└── seed.ts                       — 15 botellas premium + 5 categorías
```

## Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales reales

# 3. Aplicar schema a la base local (SQLite por defecto)
npx prisma migrate dev --name init

# 4. Cargar productos de ejemplo
npm run prisma:seed

# 5. Levantar el dev server
npm run dev
# → http://localhost:3000

# Si el puerto 3000 está ocupado:
npm run dev -- -p 3030
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Conexión Prisma. Local: `file:./dev.db`. Prod: PostgreSQL. |
| `STRIPE_SECRET_KEY` | Clave secreta de Stripe (`sk_...`). |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clave pública (`pk_...`). |
| `STRIPE_WEBHOOK_SECRET` | Secret del endpoint webhook (`whsec_...`). |
| `CHECKOUT_MODE` | `stripe` (default) o `whatsapp`. |
| `WHATSAPP_NUMBER` | Número internacional sin `+`. Ej.: `5491157581269`. |
| `ADMIN_PASSWORD` | Password único para entrar al panel `/admin`. |
| `ADMIN_SESSION_SECRET` | Secret JWT para la cookie admin (≥32 chars). |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio. |
| `NEXT_PUBLIC_SITE_NAME` | Nombre del sitio. |

## Modo de checkout intercambiable

El flujo de cierre de pedido es modular. Una sola variable controla todo:

- `CHECKOUT_MODE=stripe` (V1 — actual): el usuario paga con tarjeta en una
  sesión segura de Stripe Checkout. El webhook marca el pedido como `PAID`.
- `CHECKOUT_MODE=whatsapp` (futuro): no cobra online. Persiste el pedido y
  redirige a `wa.me/<numero>?text=<pedido pre-armado>` para cerrar por chat.

El pedido se persiste en ambos casos (`Order.checkoutMethod = STRIPE | WHATSAPP`),
así migrar a futuro es solo cambiar la variable de entorno.

## Webhook de Stripe

En desarrollo, escuchar webhooks con el CLI de Stripe:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# Copiar el whsec_... que imprime a STRIPE_WEBHOOK_SECRET en .env
```

En producción: crear el endpoint en el dashboard de Stripe apuntando a
`https://tu-dominio/api/stripe/webhook` y suscribirse a:
- `checkout.session.completed`
- `checkout.session.expired`

## Panel admin

- URL: `/admin`
- Login: `/admin/login` (única password vía `ADMIN_PASSWORD`)
- Funciones:
  - Resumen con métricas (productos, pedidos, ingresos)
  - CRUD completo de productos (crear, editar, eliminar, marcar
    Featured / Luxury Black)
  - Listado de pedidos con detalle de items y notas

## Deploy en Railway

1. **Postgres**: crear servicio Postgres en Railway. Copiar `DATABASE_URL`
   privada.
2. **App**: nuevo servicio desde repo. Railway detecta Next.js automáticamente.
3. **Cambiar `prisma/schema.prisma`** — cambiar `provider = "sqlite"` por
   `provider = "postgresql"`.
4. **Variables de entorno**: cargar todas las del `.env.example` en Railway,
   apuntando `DATABASE_URL` al Postgres del paso 1 y poniendo claves reales de
   Stripe.
5. **Build command** (ya en `package.json`): `prisma generate && next build`.
   Railway lo corre solo.
6. **Migraciones**: en el servicio Postgres, abrir shell y ejecutar
   `npx prisma migrate deploy` después del primer deploy.
7. **Seed (opcional)**: `npm run prisma:seed` (solo si querés poblar la base
   con las 15 botellas de ejemplo).
8. **Webhook Stripe**: configurar el endpoint apuntando al dominio Railway.

## Scripts

```bash
npm run dev              # Dev server (puerto 3000 por default)
npm run build            # Build de producción (incluye prisma generate)
npm run start            # Start producción
npm run lint             # Lint Next.js
npm run prisma:generate  # Regenera el cliente Prisma
npm run prisma:migrate   # Crea una nueva migración en dev
npm run prisma:deploy    # Aplica migraciones en prod
npm run prisma:seed      # Corre el seed
npm run prisma:studio    # GUI para inspeccionar la base
```

## Diseño

Ver [`DESIGN.md`](./DESIGN.md). Resumen:
- Negro profundo `#0A0A0A`, surface `#141414`, dorado champagne `#C9A24B`.
- Display: Cormorant Garamond (serif). Sans: stack system (jamás Inter).
- Transiciones 400–1000ms, ease `cubic-bezier(0.22, 1, 0.36, 1)`.
- Mucho aire negativo. Hairlines `#262626` 1px.
- Prohibido: gradientes morados, glassmorphism, sombras de colores, emojis.

## Aviso legal

Venta exclusiva a mayores de 18 años. La aplicación incluye un Age Gate
obligatorio al primer ingreso (cookie + localStorage). Beber con moderación.
