# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Comprador final de alto poder adquisitivo.** Busca una botella puntual para
  regalar o para su cava. Le importa la pieza, no el precio unitario. Llega por
  Instagram o por recomendación, y cierra la compra conversando.
- **On premise**: bares, restaurantes y hoteles que compran para carta. No
  compran una botella sino una selección, y vuelven. Tienen su propia página y
  su propio formulario de alta.
- **Regalo corporativo**, sobre todo en fin de año — de ahí que la estuchería
  sea una categoría propia.

## Product Purpose

Es una tienda y a la vez una carta de presentación, pero **no cobra**: toda
venta se cierra por WhatsApp. El sitio existe para que la pieza se pueda ver,
entender y consultar; el cierre es siempre una conversación.

Éxito es que alguien llegue al catálogo, encuentre la botella (o entienda que
se la pueden conseguir) y escriba. Para on premise, que un salón pida abrir
cuenta.

## Positioning

No es una vinoteca ni un e-commerce de bebidas. Se presenta como **galería**:
cada botella es una "Pieza N.º", el catálogo es "La Colección", las exclusivas
son "Luxury Black". El tono es sobrio y seguro, sin exclamaciones ni urgencia
comercial. Nunca grita, nunca liquida.

Lo que un competidor no puede copiar de verdad es el acceso: buena parte del
catálogo son asignaciones cortas de bodegas boutique argentinas que no llegan a
la góndola. De ahí la modalidad "a consultar" — no es una limitación técnica,
es la forma real en que se venden esas piezas.

## Operating Context

- **El catálogo llega por WhatsApp.** Souverain manda capturas de listas de
  proveedor; de ahí salen nombres, códigos y modalidad. Van nueve tandas.
- **Las fotos llegan por Google Drive**, en carpetas del proveedor grande y de
  Ernesto Catena, y hay que cruzarlas contra la lista pedida.
- **Se vende por botella, no por caja**, aunque las listas de proveedor vengan
  expresadas en cajas.
- **La consulta se responde por WhatsApp** desde el número de la casa.
- **Entrega**: a todo el país. En CABA y GBA con entrega propia coordinada; al
  interior, por transporte.

## Capabilities and Constraints

- **323 piezas cargadas** en 13 categorías. El total sube con cada tanda: no es
  un número sobre el que se pueda construir un mensaje.
- **Sin precios.** No están cargados y no hay fecha. Todo se muestra como
  "Consultar".
- **Sin cobro online.** Decisión de producto, no un pendiente: el carrito, el
  checkout, la tabla de pedidos y la pasarela de pago que hay en el código
  quedaron de una etapa anterior y sobran.
- **Fotos**: no todas las añadas tienen packshot propio. De Cheval des Andes
  sólo circula la de 2017 y de Terrazas la de la cosecha vigente, así que 95 de
  las 323 piezas se muestran con la botella de otro año. Cuando pasa se aclara
  al lado de la imagen, en todas las superficies, en vez de disimularlo.
- **Venta de alcohol en Argentina**: control de edad obligatorio, botón de
  arrepentimiento y datos fiscales visibles.
- **Sin datos fiscales cargados**: razón social, CUIT y domicilio legal están
  pendientes y se muestran marcados como tales en las páginas legales.
- **El formulario de contacto no envía**: sin acceso SMTP, los mensajes se
  pierden. Las solicitudes On Premise sí se guardan y se ven en el panel.
- **Quién opera el panel día a día está sin definir.** Hasta que se resuelva no
  conviene decidir cuánto simplificarlo ni qué automatizar.

## Brand Commitments

- El logo es un **escudo**, no la palabra "Souverain" escrita. En ninguna pieza
  se reemplaza por el nombre en tipografía.
- Vocabulario propio: Pieza N.º, La Colección, Luxury Black, On Premise.
- No se usa el vocabulario del e-commerce masivo: nada de "oferta",
  "imperdible", "últimas unidades", ni cuenta regresiva.
- No se promociona el consumo. La venta tiene control de edad y el tono evita
  cualquier invitación a beber de más.
- No se compite por precio ni se muestran descuentos.

## Evidence on Hand

- **297 packshots propios** en `public/productos/`, todos a 1600×2133 sobre
  fondo oscuro. 64 además normalizados con alfa en `instagram/normal/`.
- **61 fotos pendientes** de que las mande Souverain. La lista está en
  `docs/pedido-gonzalo.md`.
- **Nueve tandas de catálogo** documentadas en `docs/productos-pendientes.md`,
  con códigos de proveedor donde los hay.
- **El cruce de las carpetas de Drive** contra lo pedido, en `docs/fotos-drive.md`.
- **La auditoría de añadas** en `docs/auditoria-anadas.md` y la tabla viva en
  `src/lib/anada-foto.ts`.
- **Diez publicaciones de Instagram** listas en `instagram/publicaciones/`.
- **No hay** testimonios, casos, métricas de venta, premios ni prensa. Nada de
  eso se puede inventar en una pieza.

## Product Principles

1. **La conversación es el cierre, no el carrito.** Cada superficie tiene que
   terminar en una consulta, no en un botón de pago.
2. **Ningún número del catálogo entra en un mensaje.** La cantidad de piezas
   cambia con cada tanda; lo que se comunica es qué clase de casa es, de dónde
   vienen las botellas y qué resuelven.
3. **Lo que no se sabe se dice.** Si la foto es de otra añada, si falta el
   precio, si falta el dato fiscal: se declara en el lugar donde el visitante lo
   miraría, no en una nota al pie.
4. **La pieza manda.** La botella es el contenido; la interfaz se corre.
5. **Nunca urgencia.** Ni escasez fabricada, ni descuentos, ni relojes. La
   rareza es real y se enuncia sin adjetivos.

## Accessibility & Inclusion

- Control de edad obligatorio antes de ver el catálogo (Ley 24.788). Mayores de
  18 años.
- Mobile-first en la práctica: la mayoría del tráfico llega desde Instagram en
  el teléfono.
