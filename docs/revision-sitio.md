# Revisión completa del sitio en producción

Recorridas las 20 rutas, los 109 enlaces internos, las imágenes de cada página y
el comportamiento en desktop y mobile.

## Rompe

### 1. La página de Drops está vacía y está en el menú
`/ediciones-limitadas` muestra **"0 drops activos · 0 esta temporada · 0
disponibles ahora"**. La página trae una lista de productos escrita a mano que
apunta al stock viejo que se borró (Dom Pérignon Vintage 2013, Macallan 18,
Château Margaux 2015, Hennessy Paradis), y como ninguno existe en la base, no
renderiza nada. El menú principal la enlaza como **DROPS**.

### 2. Maridajes ofrece agregar al carrito productos que no existen
`/maridajes` destaca seis botellas: **Macallan 18, Dom Pérignon Vintage 2013,
Château Margaux 2015, Krug 171ème, Hennessy Paradis Impérial y Lagavulin 16**.
Ninguna está en el catálogo. Cada una tiene "Ver la botella →", que da **404**, y
"Agregar al carrito", que en realidad es un enlace a `/carrito` y **no agrega
nada**: te deja en un carrito vacío.

### 3. Seis enlaces rotos
`/producto/chateau-margaux-2015`, `/producto/dom-perignon-vintage-2013`,
`/producto/hennessy-paradis-imperial`, `/producto/krug-grande-cuvee-171`,
`/producto/lagavulin-16` y `/producto/macallan-18-sherry-oak`.

### 4. Dos de las tres solapas de presupuesto de la guía de regalos no muestran nada
`GiftGuideClient` filtra por `p.price >= tier.min`. Con todos los precios en 0,
**Premium ($100.000–$300.000) y Excepcional (más de $300.000) devuelven cero
productos**. Además las cinco solapas de ocasión (Cumpleaños, Aniversario,
Corporativo, Navidad, Sin motivo) **no filtran nada**: sólo cambian una frase.

### 5. El checkout crea la orden y después falla
`CHECKOUT_MODE` cae por defecto en `stripe` y la clave es de prueba: se guarda un
pedido en la base y el cliente ve un error.

### 6. El formulario de contacto pierde los mensajes
`src/app/api/contact/route.ts` hace `console.log` y devuelve ok.

### 7. El admin sigue con la contraseña de ejemplo
`ADMIN_PASSWORD` es `cambiar-en-produccion` y `ADMIN_SESSION_SECRET` tiene
fallback `dev-secret-please-change`.

## Dice cosas que no sabemos si son ciertas

| Dónde | Qué afirma |
|---|---|
| /nosotros y /on-premise | **27 años en el rubro** |
| /nosotros y /la-cava | **180+ referencias activas** — la web muestra 90 |
| /nosotros y /on-premise | **60+ hoteles y restaurantes atendidos** |
| /on-premise | **24h de respuesta garantizada** |
| /ediciones-limitadas | **24h de duración promedio** de un drop |

Ninguna sale de la base: están escritas en el código. Hay que confirmarlas o
sacarlas, sobre todo las dos primeras, que un cliente puede verificar.

## Contenido prestado

**25 fotos de Unsplash** repartidas: 15 en maridajes, 6 en on-premise, 4 en la
guía de regalos, 3 en la home, 2 en la cava y 1 en nosotros y en ediciones.
La portada de `/ediciones-limitadas` usa una foto de **Johnnie Walker Black
Label**, una marca que Souverain no distribuye.

## SEO

- **`/2` a `/6` son re-exports literales** de La Cava, Maridajes, Guía de
  Regalos, Ediciones Limitadas y On Premise: mismo `<title>`, mismo contenido.
  Contenido duplicado, y `robots.txt` los deja indexar.
- **El sitemap declara sólo 4 páginas** (`/`, `/tienda`, `/nosotros`,
  `/contacto`). Faltan las cinco secciones editoriales y **las 90 fichas de
  producto**, que son el catálogo entero.

## Lo que está bien

- Las 20 rutas responden 200 y ninguna imagen del catálogo está rota.
- Sin errores en consola.
- **Sin desborde horizontal en mobile** en ninguna página.
- El control de edad funciona y está montado en el layout.
- Las 103 fichas de producto enlazadas desde la tienda resuelven bien.

## Menor

La home carga **4 videos, 4,7 MB en total**. En una conexión móvil argentina eso
es medio segundo largo de espera antes de que el hero se mueva.
