export const appConfig = {
  brand: {
    name: "Universal System",
    shortName: "US",
    tagline: "PORQUE APRENDER NUNCA FUE TAN FÁCIL.",
    subtitle: "Tecnología clara, soporte de precisión y aprendizaje sin barreras.",
    description:
      "Acompañamiento tecnológico empático para adultos y familias, mentorías personalizadas de aprendizaje y laboratorio de soporte técnico de alta precisión.",
  },
  author: {
    name: "Jorge Thompson",
    fullName: "Jorge Eduardo Thompson Alvarado",
    role: "Senior Software Engineer & Systems Architect",
    specialty: "Soporte Técnico de Precisión, Asesoría & Arquitectura de Software",
    email: "a.thompson.jorge@gmail.com",
    phone: "+56953332870",
    phoneDisplay: "+56 9 5333 2870",
    whatsappLink: "https://wa.me/56953332870",
    enterpriseUrl: "https://jetaru.github.io",
    linkedin: "https://linkedin.com/in/jorge-e-thompson-alvarado",
    github: "https://github.com/jetaru",
    location: "San Pedro de la Paz, Chile • Modalidad Presencial y Remoto Global",
    availability: "Lunes a Sábados con cita previa coordinada",
    hardwareGuarantee: "Garantía formal de 90 días por escrito",
  },
  emailjs: {
    /**
     * Clave pública de EmailJS (Account Public Key).
     * Es segura para exponerse en el cliente web según las especificaciones de EmailJS.
     */
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "fc4QxiMiBJhDBwCbH",
    /**
     * ID del servicio de correo creado en el Dashboard de EmailJS (ej: Gmail, Outlook).
     */
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_gmail_jeta_us",
    /**
     * ID de la plantilla de correo configurada en EmailJS (Email Templates).
     */
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_us",
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  isProduction: process.env.NODE_ENV === "production",
};
