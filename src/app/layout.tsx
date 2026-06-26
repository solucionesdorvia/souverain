import type { Metadata } from "next";
import { Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AgeGate } from "@/components/AgeGate";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SITE } from "@/lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Casa de bebidas premium`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Boutique de licores y bebidas de alta gama en Buenos Aires. Whisky, champagne, vinos finos y la Luxury Black Selection.",
  openGraph: {
    title: `${SITE.name} — Casa de bebidas premium`,
    description:
      "Boutique de licores y bebidas de alta gama en Buenos Aires. Luxury Black Selection.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: "Boutique de licores y bebidas de alta gama.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${cinzel.variable}`}>
      <body className="bg-background text-ink antialiased min-h-screen flex flex-col">
        <CartProvider>
          <AgeGate />
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
