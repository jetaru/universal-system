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
    phone: "+56982456154",
    phoneDisplay: "+56 9 8245 6154",
    whatsappLink: "https://wa.me/56982456154",
    linkedin: "https://linkedin.com/in/jorge-e-thompson-alvarado",
    github: "https://github.com/jetaru",
    location: "San Pedro de la Paz, Chile • Modalidad Presencial y Remoto Global",
    availability: "Lunes a Sábados con cita previa coordinada",
    hardwareGuarantee: "Garantía formal de 90 días por escrito",
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  isProduction: process.env.NODE_ENV === "production",
};
