import { ContactMessage, ContactSubmissionResult } from "@/core/domain/entities/contact";
import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import { appConfig } from "@/infrastructure/config/env";
import emailjs from "@emailjs/browser";

/**
 * Firma de la función para el despacho de correo mediante EmailJS.
 * Permite inyección de dependencias para facilitar pruebas unitarias aisladas.
 */
export type EmailJSSenderFn = (
  serviceId: string,
  templateId: string,
  templateParams: Record<string, unknown>,
  options: { publicKey: string }
) => Promise<{ status: number; text: string }>;

/**
 * Repositorio de infraestructura para el envío de mensajes de contacto mediante EmailJS.
 *
 * Implementa la interfaz de dominio `IContactRepository` desacoplando la lógica de negocio
 * de la API externa de EmailJS.
 *
 * Características:
 * - Compatible con GitHub Pages (ejecución 100% client-side sin backend propio).
 * - Genera identificadores de ticket únicos para seguimiento (`US-ORD-XXXX`).
 * - Genera URLs de contingencia hacia WhatsApp y mailto en caso de fallo de red.
 * - Mapea los campos de dominio a variables estándar esperadas por la plantilla de EmailJS.
 */
export class EmailJSContactRepository implements IContactRepository {
  private readonly senderFn: EmailJSSenderFn;

  /**
   * @param customSenderFn Función opcional para despachar correos (útil para tests unitarios).
   */
  constructor(customSenderFn?: EmailJSSenderFn) {
    this.senderFn =
      customSenderFn ||
      (async (serviceId, templateId, templateParams, options) => {
        return emailjs.send(serviceId, templateId, templateParams, options);
      });
  }

  /**
   * Procesa el mensaje de contacto y lo envía a través de la API de EmailJS.
   *
   * @param message Datos del formulario validados y sanitizados.
   * @returns Resultado del procesamiento con estado, ticket y canales de contacto directo.
   */
  async sendMessage(message: ContactMessage): Promise<ContactSubmissionResult> {
    const timestamp = new Date().toISOString();

    // 1. Generación de identificador único de ticket
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `US-ORD-${randomSuffix}`;

    // 2. Mapeo amigable de etiquetas de servicio
    const serviceLabels: Record<string, string> = {
      asesoria: "Asesoría Tecnológica & Paciencia",
      clases: "Clases 1 a 1 de Nivelación",
      soporte: "Soporte Técnico Notebook/PC & Laboratorio",
    };
    const serviceLabel = serviceLabels[message.service] || message.service;

    // 3. Composición de URL de contingencia para WhatsApp
    const waText =
      `*Universal System - Solicitud de Atención*%0A` +
      `*ID Ticket:* ${ticketId}%0A` +
      `*Nombre:* ${encodeURIComponent(message.name.trim())}%0A` +
      `*Contacto:* ${encodeURIComponent(message.contact.trim())}%0A` +
      `*Área:* ${encodeURIComponent(serviceLabel)}%0A` +
      `*Mensaje:* ${encodeURIComponent((message.detail || "Consulta general").trim())}`;

    const cleanPhone = appConfig.author.phone.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

    // 4. Composición de URL de contingencia para mailto
    const mailtoSubject = encodeURIComponent(
      `[Universal System] Solicitud #${ticketId} - ${message.name}`
    );
    const mailtoBody = encodeURIComponent(
      `Hola Jorge Thompson,\n\nSolicito atención en Universal System:\n` +
        `- Ticket: ${ticketId}\n` +
        `- Nombre: ${message.name}\n` +
        `- Contacto: ${message.contact}\n` +
        `- Servicio: ${serviceLabel}\n` +
        `- Detalle: ${message.detail || "Sin detalles adicionales"}\n\nGracias.`
    );
    const mailtoUrl = `mailto:${appConfig.author.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // 5. Parámetros que se enviarán a la plantilla de EmailJS
    const templateParams: Record<string, unknown> = {
      ticket_id: ticketId,
      from_name: message.name.trim(),
      contact_phone: message.contact.trim(),
      user_email: (message.email || message.contact).trim(),
      service_type: serviceLabel,
      message: (message.detail || "Consulta general").trim(),
      to_email: appConfig.author.email,
      submission_date: new Date().toLocaleString("es-CL", {
        timeZone: "America/Santiago",
        dateStyle: "medium",
        timeStyle: "short",
      }),
    };

    const { publicKey, serviceId, templateId } = appConfig.emailjs;

    try {
      // 6. Despacho a través de EmailJS
      await this.senderFn(serviceId, templateId, templateParams, { publicKey });

      return {
        success: true,
        message:
          "¡Tu solicitud ha sido enviada directamente por correo a nuestro equipo! Te contactaremos a la brevedad.",
        ticketId,
        whatsappUrl,
        mailtoUrl,
        timestamp,
        deliveryMethod: "emailjs",
      };
    } catch (err: unknown) {
      // En caso de que EmailJS falle (ej: servicio aún no configurado o caída de red),
      // se activa la contingencia para que el usuario no pierda su solicitud.
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.warn(
        `[EmailJSContactRepository] Falló el despacho de EmailJS (${errorMessage}). Activando canales de contingencia.`
      );

      return {
        success: true,
        message:
          "Tu solicitud y número de ticket han sido generados. Puedes acelerar tu atención haciendo clic en el botón de WhatsApp o Email.",
        ticketId,
        whatsappUrl,
        mailtoUrl,
        timestamp,
        deliveryMethod: "fallback_mailto",
      };
    }
  }
}
