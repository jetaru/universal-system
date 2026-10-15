# Universal System — Tecnología Clara y Soporte de Precisión

Sitio web oficial y plataforma de atención de **Universal System**, desarrollado con **Next.js 16**, **React 19**, **Tailwind CSS v4** y **Clean Architecture**, optimizado para exportación estática y despliegue automático en **GitHub Pages**.

> *"Porque aprender nunca fue tan fácil."*

---

## 🏛️ Arquitectura del Proyecto (Clean Architecture)

El proyecto sigue los principios de separación de responsabilidades para garantizar mantenibilidad, testabilidad y escalabilidad:

```
src/
├── core/                           # Capa de Dominio y Casos de Uso
│   ├── domain/
│   │   ├── entities/               # Modelos y entidades puras (contact, content)
│   │   └── repositories/           # Interfaces abstractas de repositorios
│   └── usecases/                   # Lógica de negocio (send-contact.usecase)
│
├── infrastructure/                 # Capa de Infraestructura
│   ├── config/                     # Variables de entorno y datos de contacto oficiales
│   ├── repositories/               # Implementación concreta (MockContactRepository con WhatsApp)
│   └── container.ts                # Contenedor de Inyección de Dependencias
│
├── presentation/                   # Capa de Presentación (UI & UX)
│   ├── components/
│   │   ├── layout/                 # Navbar con menú responsive y Footer editorial
│   │   ├── sections/               # Secciones completas de la Landing Page
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PillarsSection.tsx
│   │   │   ├── LaboratorySection.tsx
│   │   │   ├── MethodologySection.tsx
│   │   │   ├── SolutionSelectorSection.tsx
│   │   │   └── TestimonialsSection.tsx
│   │   └── ui/                     # Primitivas de UI e iconografía SVG
│   └── hooks/                      # Hooks interactivos (ScrollReveal, Cursor Flashlight, Selector)
│
└── app/                            # Next.js App Router (Páginas, Layout y globals.css)
```

---

## ✨ Características y Animaciones Inmersivas

- **Efecto Linterna de Cursor (Flashlight Sheen):** Las tarjetas interactivas (`interactive-card`) reaccionan a la posición del cursor mediante gradientes radiales dinámicos `--mouse-x` y `--mouse-y`.
- **Efecto Respiración y Halo Shimmer:** El cuadro del logotipo en el Hero (`logo-hero-frame`) cuenta con una animación continua `pulseGlow`, esquinas editoriales expandibles en `:hover` y destellos de fondo.
- **Scroll Reveal System:** Animación de entrada suave con `IntersectionObserver` para cada sección a medida que el usuario hace scroll.
- **Micro-interacciones en Botones:** Botones de lujo con barrido de luz reflectante (`luxury-btn::before`).
- **Checklist Interactivo de Laboratorio:** Elementos con toggle táctil y soporte completo de accesibilidad (`aria-pressed`, `Enter`, `Espacio`) con estado esmeralda activo.
- **Selector Dinámico de Soluciones:** Formulario interactivo con tarjetas de opción tipo radio, validación y redirección directa hacia WhatsApp (`wa.me`) y correo con ticket de atención generado.

---

## 📞 Canales de Contacto Directo

Configurados de acuerdo al perfil oficial de **Jorge Thompson (Jorge Eduardo Thompson Alvarado)**:

- **WhatsApp Directo:** [+56 9 8245 6154](https://wa.me/56982456154)
- **Correo Electrónico:** [a.thompson.jorge@gmail.com](mailto:a.thompson.jorge@gmail.com)
- **LinkedIn:** [jorge-e-thompson-alvarado](https://linkedin.com/in/jorge-e-thompson-alvarado)
- **GitHub:** [jetaru](https://github.com/jetaru)
- **Ubicación:** San Pedro de la Paz / Concepción, Chile (Atención presencial en laboratorio y soporte remoto global).

---

## 🚀 Despliegue en GitHub Pages

El proyecto incluye soporte nativo para exportación estática:

```javascript
// next.config.js
output: 'export',
images: { unoptimized: true },
trailingSlash: true,
basePath: process.env.NEXT_PUBLIC_BASE_PATH || ""
```

### GitHub Actions Automático (`.github/workflows/deploy.yml`)
Cada `push` a las ramas `master` o `main` activa el pipeline de GitHub Actions que compila el sitio (`npm run build`), exporta el directorio `out/` con `.nojekyll` y lo publica automáticamente en **GitHub Pages**.

### Comandos Locales

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Compilar para producción (export estático a /out)
npm run build
```

---

© 2026 Universal System. Desarrollado por Jorge Thompson.
