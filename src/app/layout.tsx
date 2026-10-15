import type { Metadata, Viewport } from "next";
import "./globals.css";
import { appConfig } from "@/infrastructure/config/env";

export const viewport: Viewport = {
  themeColor: "#090a0d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jetaru.github.io/universal-system"),
  title: "Universal System | Tecnología Clara y Soporte de Precisión",
  description:
    "Acompañamiento tecnológico empático para adultos y familias, mentorías personalizadas de aprendizaje y laboratorio de soporte técnico de alta precisión. Porque aprender nunca fue tan fácil.",
  authors: [
    {
      name: appConfig.author.fullName,
      url: appConfig.author.github,
    },
  ],
  keywords: [
    "Universal System",
    "Soporte Técnico de Precisión",
    "Asesoría Tecnológica Adultos",
    "Clases Particulares Computación",
    "Aceleración SSD",
    "Limpieza Térmica",
    "Jorge Thompson",
    "Chile",
    "San Pedro de la Paz",
    "Concepción",
  ],
  icons: {
    icon: [
      { url: "favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "favicon.ico" },
    ],
    apple: [{ url: "apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Universal System | Tecnología Clara y Soporte de Precisión",
    description:
      "Acompañamiento tecnológico empático, clases 1 a 1 de ofimática e IA, y laboratorio de soporte informático de alta precisión.",
    siteName: "Universal System",
    type: "website",
    images: [
      {
        url: "assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Universal System — Tecnología Clara y Soporte de Precisión",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Universal System | Tecnología Clara y Soporte de Precisión",
    description: "Porque aprender nunca fue tan fácil. Asesoría, clases y soporte técnico.",
    images: ["assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* OWASP Security Headers (Static Export & Client Defense) */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https:; base-uri 'self'; form-action 'self' https://wa.me;"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="selection:bg-white selection:text-black min-h-screen bg-[#090a0d] text-[#f3f4f6]">
        {children}
      </body>
    </html>
  );
}
