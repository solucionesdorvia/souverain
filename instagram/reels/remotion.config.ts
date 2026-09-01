import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
// Instagram recomprime todo, así que conviene entregarle el archivo más limpio
// posible: si el reel ya entra degradado, la recompresión lo termina de romper.
Config.setCrf(16);
Config.overrideWebpackConfig((c) => c);
