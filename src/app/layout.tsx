/* src/app/layout.tsx */
import Navbar from "@/components/Navbar";
import { LangProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "María González Herrero",
  description: "Portfolio de proyectos de software y ciberseguridad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-theme="dark">
      <head>
        {/* 👇 Bootstrap JS (necesario para el carrusel y el menú móvil) */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
      </head>

      <body id="top" className="code-background">
        <LangProvider>
          <Navbar />
          {children}
        </LangProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
