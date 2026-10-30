import type { Metadata, Viewport } from "next";
import "./globals.css";
import { appConfig } from "@/infrastructure/config/env";
import { LanguageProvider } from "@/presentation/context/LanguageContext";

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
  creator: appConfig.author.name,
  publisher: appConfig.brand.name,
  alternates: {
    canonical: "https://jetaru.github.io/universal-system",
    languages: {
      "es-CL": "https://jetaru.github.io/universal-system?lang=es",
      "en-US": "https://jetaru.github.io/universal-system?lang=en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
    "Clean Architecture",
    "Next.js 16",
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
    url: "https://jetaru.github.io/universal-system",
    type: "website",
    locale: "es_CL",
    alternateLocale: ["en_US"],
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
    creator: "@jetaru",
    images: ["assets/og-image.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://jetaru.github.io/universal-system/#organization",
      name: "Universal System",
      legalName: "Universal System — Tecnología Clara y Soporte de Precisión",
      url: "https://jetaru.github.io/universal-system",
      logo: "https://jetaru.github.io/universal-system/assets/universal-system-logo.png",
      image: "https://jetaru.github.io/universal-system/assets/og-image.png",
      description:
        "Acompañamiento tecnológico empático para adultos y familias, mentorías personalizadas de aprendizaje y laboratorio de soporte técnico de alta precisión.",
      telephone: "+56953332870",
      email: "a.thompson.jorge@gmail.com",
      founder: {
        "@type": "Person",
        name: "Jorge Thompson",
        jobTitle: "Senior Software Engineer & Systems Architect",
        url: "https://github.com/jetaru",
        sameAs: [
          "https://linkedin.com/in/jorge-e-thompson-alvarado",
          "https://github.com/jetaru",
        ],
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Pedro de la Paz",
        addressRegion: "Biobío",
        addressCountry: "CL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -36.845,
        longitude: -73.108,
      },
      priceRange: "$$",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "19:00",
        },
      ],
      areaServed: [
        "San Pedro de la Paz",
        "Concepción",
        "Chile",
        "Global Remote",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de Universal System",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Asesoría Tecnológica Humana",
              description:
                "Acompañamiento paciente para adultos mayores, home banking seguro y smartphones.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Clases de Nivelación & Productividad",
              description:
                "Mentorías 1 a 1 de Excel, herramientas digitales e Inteligencia Artificial aplicada.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Soporte de Precisión & Laboratorio Hardware",
              description:
                "Diagnóstico, optimización térmica profunda y aceleración mediante discos SSD.",
            },
          },
        ],
      },
    },
  ],
};

/**
 * Serializa JSON-LD escapando `<`, `>` y `&` (y separadores de línea Unicode) para que ningún
 * valor pueda cerrar la etiqueta <script> (`</script>`) ni inyectar HTML: defensa en profundidad
 * aunque hoy el contenido sea estático.
 */
function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * Content-Security-Policy para exportación estática (se entrega vía <meta>, pues GitHub Pages
 * no permite cabeceras HTTP). Se retiró el comodín `https:` de `script-src` y `connect-src`
 * (permitía cargar/enviar a cualquier origen HTTPS) y se limitó al único servicio externo
 * de datos (EmailJS). En desarrollo se relaja para HMR/React Refresh de Turbopack.
 */
const isProd = process.env.NODE_ENV === "production";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https: blob:",
  `connect-src 'self' https://api.emailjs.com${isProd ? "" : " ws://localhost:* http://localhost:*"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://wa.me",
].join("; ");

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
          content={contentSecurityPolicy}
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          httpEquiv="Permissions-Policy"
          content="camera=(), microphone=(), geolocation=()"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Structured Data (Schema.org JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      </head>
      <body className="selection:bg-white selection:text-black min-h-screen bg-[#090a0d] text-[#f3f4f6]">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
