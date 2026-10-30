/** @type {import('next').NextConfig} */
const nextConfig = {
  // Exportación estática completa requerida para GitHub Pages (carpeta out/)
  output: "export",

  // Las imágenes en GitHub Pages estático deben usar unoptimized: true
  images: {
    unoptimized: true,
  },

  // Genera carpetas con index.html para compatibilidad con servidores estáticos
  trailingSlash: true,

  // Soporta despliegue en raíz o subdirectorios de GitHub Pages (ej: /universal-system)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // Variables de entorno expuestas al cliente
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || "",
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "fc4QxiMiBJhDBwCbH",
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_gmail_jeta_us",
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_us",
  },

  // Política de avisos de actualización de seguridad asistida
  experimental: {
    agentUpgrade: "security",
  },

  // Reglas de Turbopack para procesar Tailwind CSS v4
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

module.exports = nextConfig;
