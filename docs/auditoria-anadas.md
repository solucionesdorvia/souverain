# Auditoría de añadas: foto contra nombre de producto

Revisadas **358 fotos, el 100%**: las 64 cargadas en la web, las 222 de la
carpeta del proveedor y las 72 de Ernesto Catena.

## Cómo se hizo

Se leyó la etiqueta de cada foto con el OCR nativo de macOS (framework Vision) y
se comparó el año leído contra el que declara el nombre del producto. **El OCR no
se tomó como palabra final**: tiene una falla conocida con los números
estilizados, donde confunde el último dígito. Aparecieron tres casos y los tres
se verificaron mirando la etiqueta ampliada:

| Foto | Leyó | Dice en realidad |
|---|---|---|
| moet-gvr-2013 | 2023 | **2013** |
| moet-gvr-2015 | 2025 | **2015** |
| Siesta Malbec | 2010 | **2019** |

Por eso todo desajuste cuya diferencia es de un solo dígito se verificó a ojo
antes de darlo por bueno.

## Catálogo cargado — 23 desajustes sobre 45 piezas con añada

De los 90 productos en la base, 45 declaran una añada en el nombre. De ésos:
**15 coinciden con la etiqueta, 23 no, y 7 tienen foto sin año** (ahí no hay
contradicción posible).

| Foto | Etiqueta | Nombres que la usan |
|---|---|---|
| cheval | 2017 | Cheval des Andes 2018, 2019, 2020, 2021, 2022 y 2022 Magnum |
| terr-grand-cab | 2023 | Terrazas Grand Cabernet 2020, 2021, 2022 |
| terr-grand-malbec | 2023 | Terrazas Grand Malbec 2020, 2021, 2022 |
| terr-grand-chard | 2024 | Terrazas Grand Chardonnay 2021, 2022, 2023 |
| terr-petit-manseng | 2023 | Terrazas Petit Manseng 2020, 2021 |
| terr-altamira | 2021 | Terrazas Origen Altamira 2022 |
| terr-chacayes | 2021 | Terrazas Origen Los Chacayes 2022 |
| dp-vintage | 2015 | Dom Pérignon Blanc Vintage 2010 Magnum |
| moet-gv | 2016 | Moët Grand Vintage Brut 2015 |
| vc-vintage-rose | 2008 | Veuve Clicquot Vintage 2012 Rosé |
| etchart | 2022 | Etchart Cosecha 92 |

Además hay **4 al revés**: el nombre no declara añada pero la etiqueta sí muestra
una — Perrier-Jouët Belle Époque (2018), Veuve La Grande Dame Brut (2018),
La Grande Dame Rosé (2015) y Terrazas Origen Caja Combinada (2021).

Sin año en la etiqueta, así que no hay nada que aclarar: dp-luminous,
hennessy-vs-lum, terr-compuertas, dp-rose-2008 y moet-gv.

## Fotos nuevas de Drive

### Matervini — casi toda la línea con otra añada
| Producto pedido | Etiqueta de la foto |
|---|---|
| Piedras Viejas Terrazas 2022 | **2014** |
| Piedras Viejas Ladera 2022 | **2018** |
| Alteza 2022 | **2017** |
| Calcha 2022 | **2017** |
| Viña Canota 2022 | **2017** |
| Finca 2022 | **2017** |
| Blanco 2023 | **2018** |
| Pedregal 2020 | **2019** |

### Alma Mater
| Producto pedido | Etiqueta |
|---|---|
| GSM 2019 | **2017** (verificado a ojo) |
| Chardonnay 2019 | **2017** (verificado a ojo) |
| Pinot Noir 2020 | **2017** |
| Malbec 2021 | **2022** |
| Cabernet Franc–Cabernet Sauvignon 2022 | 2022 ✓ |
| Semillón 2024 | 2024 ✓ |

### Viña Cobos
| Producto pedido | Etiqueta |
|---|---|
| Bramare Luján Malbec 2023 | **2022** |
| Bramare Luján Cabernet 2021 | **2020** |
| Bramare Valle de Uco Chardonnay 2024 | **2023** |
| Chañares Malbec 2021 | **2022** |
| Bramare Valle de Uco Malbec 2022 | 2022 ✓ |
| Chañares Cabernet Franc 2022 | 2022 ✓ |
| Hobbs Malbec y Cabernet 2022 | 2022 ✓ |
| Zingaretti Malbec 2022 | 2022 ✓ |
| Cocodrilo Corte 2023 | 2023 ✓ |
| Volturno 2022 | 2022 ✓ |

### Los Vascos
| Producto pedido | Etiqueta |
|---|---|
| Las Huertas Cabernet Sauvignon 2023 | **2022** |
| Las Huertas Chardonnay 2025 | **2024** |
| Las Huertas Sauvignon Blanc 2025 | **2024** |
| Le Dix 2021 | 2021 ✓ |

### CARO
Hay fotos de Caro 2018, 2019, 2020 y 2021, y de Aruma 2021 y 2022.
El **Aruma 2023** que pide la lista no tiene foto de esa añada.

### Ribera del Cuarzo
Sólo tres de sus fotos muestran año. El **Especial Malbec** dice **2020** y la
lista pide 2023.

### Siesta
| Producto pedido | Etiqueta |
|---|---|
| Malbec Single Vineyard 2020 | **2019** (verificado a ojo) |
| Lost by Siesta 2018 | 2018 ✓ |
| Doble Magnum Gran Siesta 2017 | 2017 ✓ |
| Adobe Magnum Gran Siesta 2019 | 2019 ✓ |

### On The Road
Patagonia Malbec, Merlot y Pinot Noir: etiqueta **2020**, igual que la lista ✓.
Los toscanos (SR69, E80, Pian dei Marroni) no muestran año.

## Las que no tienen ningún problema

**Stella Crinita, Radical Imagination, Mara de Uco, AlmaNegra y Cuchillo de Palo
no llevan añada impresa en la etiqueta.** Son las mejores para la web: nunca va a
haber contradicción entre la foto y el nombre, sin importar qué cosecha se venda.
