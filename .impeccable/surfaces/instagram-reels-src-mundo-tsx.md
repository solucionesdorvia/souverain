---
version: 1
slug: "instagram-reels-src-mundo-tsx"
primary_target: "instagram/reels/src/mundo.tsx"
related_targets: []
---

Reels verticales de Instagram, 1080×1920 a 30 fps, renderizados con Remotion.
Modo Persuade: el pulgar frena, el espectador entiende que Souverain elige y no
surte, y consulta por mensaje directo.

Audiencia: comprador final de alto poder adquisitivo y dueños de salón
(bares, restaurantes, hoteles). Acción: consultar por mensaje directo.

El mundo visual se hereda del sitio y de los carruseles sin reinterpretarlo:
negro #0A0A0A, oro #C9A24B, marfil #F2EFE9, Cormorant Garamond para display,
Cinzel para las casas, filetes de 1px y el escudo real al pie.

## El momento propio: el barrido de luz

Una botella en una sala oscura no aparece: la revela una luz que pasa por
encima. Es lo único que se anima además de la entrada, y hace el trabajo que
antes intentaban hacer cinco fundidos distintos. El degradado va enmascarado
con una silueta ajustada — no con el alfa del PNG, que incluye el halo de
estudio — para que el brillo caiga sobre el vidrio y no sobre el fondo.

Las máscaras se generan con apertura morfológica más componente conectado
mayor: umbralar el alfa a secas dejaba islas sueltas (reflejos del fondo cerca
del cuello) que el barrido iluminaba como si fueran parte de la pieza.

## Decisiones cerradas

- **Sin conteos de catálogo.** La primera versión abría contando piezas. El
  número se vence en cuanto entra una tanda y nadie sabe cuánto dura, así que
  el anzuelo pasó a ser una botella revelada por la luz y una frase que no
  caduca.
- **Ritmo.** 108 frames por pieza (3,6 s) y 126 por beat de On Premise (4,2 s).
  La versión anterior corría a 2,2 s y el texto competía con la botella por el
  mismo instante.
- **Nombre antes que origen.** Tener el origen arriba convertía la primera
  línea del cuadro en un rótulo colgado sobre el título.
- **Sin números 01–04** encabezando los beats: no aportaban nada que el propio
  orden no dijera y ocupaban el lugar más visible del cuadro.
- **Sin audio embebido.** La música se agrega desde Instagram para que el reel
  entre al catálogo de sonidos de la app.

## Sin resolver

- El dominio no está definido; los cierres dicen "consultas por mensaje
  directo" en su lugar.
- Varias botellas normalizadas no sirven a tamaño de reel: traen la caja al
  lado (Glenlivet, Chivas, Scapa Skiren) o son un recorte de etiqueta
  (Monkey 47). Hay que mirarlas a resolución real antes de sumarlas.
