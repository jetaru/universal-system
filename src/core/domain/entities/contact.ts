/**
 * Entidad de dominio que representa una solicitud de contacto o asesoría.
 */
export interface ContactMessage {
  /** Nombre completo del solicitante */
  name: string;
  /** Número de teléfono o WhatsApp de contacto */
  contact: string;
  /** Tipo de servicio requerido */
  service: "clases" | "soporte" | "consultoria" | "asesoria";
  /** Detalle o consulta específica del usuario */
  detail?: string;
  /** Correo electrónico opcional del solicitante */
  email?: string;
  /** Campo trampa anti-bot según especificaciones OWASP A04 */
  _honeypot?: string;
}

/**
 * Resultado estructurado tras procesar una solicitud de contacto.
 */
export interface ContactSubmissionResult {
  /** Indica si la operación fue exitosa */
  success: boolean;
  /** Mensaje amigable para el usuario */
  message: string;
  /** Identificador de ticket único para seguimiento */
  ticketId?: string;
  /** Enlace directo de respaldo hacia WhatsApp con texto preconfigurado */
  whatsappUrl?: string;
  /** Enlace de respaldo mailto con asunto y cuerpo prellenado */
  mailtoUrl?: string;
  /** Fecha y hora ISO del registro */
  timestamp: string;
  /** Método de entrega utilizado para el contacto */
  deliveryMethod?: "emailjs" | "fallback_mailto" | "mock";
}
