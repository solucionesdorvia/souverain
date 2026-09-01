#!/bin/bash
# Exporta cada slide de carruseles.html a PNG de 1080x1350.
#
# El HTML numera las slides de corrido sobre todas las series, así que el índice
# global de cada una se calcula antes de pedirla con ?slide=N. Chrome headless
# se usa en vez de una captura de pantalla porque respeta el tamaño exacto del
# lienzo: un PNG de 1081px lo recomprime Instagram y se nota en la tipografía.
set -e
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
AQUI="$(cd "$(dirname "$0")" && pwd)"
SALIDA="$AQUI/png"
mkdir -p "$SALIDA"

node -e '
global.window={}; require("'"$AQUI"'/datos.js");
let i = 0;
window.CARRUSELES.forEach((c, n) => {
  const total = c.entradas.length + 2;
  for (let k = 0; k < total; k++) {
    console.log([i, n + 1, c.id, String(k + 1).padStart(2, "0")].join(" "));
    i++;
  }
});' | while read -r idx serie id nro; do
  archivo="$SALIDA/$serie-$id-$nro.png"
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1080,1350 \
    --screenshot="$archivo" \
    --default-background-color=0A0A0AFF \
    --virtual-time-budget=2500 \
    "file://$AQUI/carruseles.html?slide=$idx" >/dev/null 2>&1
  echo "  $archivo"
done
