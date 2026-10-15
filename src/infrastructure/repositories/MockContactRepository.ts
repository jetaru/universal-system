import { ContactMessage, ContactSubmissionResult } from "@/core/domain/entities/contact";
import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import { appConfig } from "@/infrastructure/config/env";

export class MockContactRepository implements IContactRepository {
  async sendMessage(message: ContactMessage): Promise<ContactSubmissionResult> {
    // Generate unique sequential / random ticket ID for tracking
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `US-ORD-${randomSuffix}`;

    const serviceLabels: Record<string, string> = {
      asesoria: "Asesoría Tecnológica & Paciencia",
      clases: "Clases 1 a 1 de Nivelación",
      soporte: "Soporte Técnico Notebook/PC & Laboratorio",
    };

    const serviceLabel = serviceLabels[message.service] || message.service;

    // Compose formatted text for WhatsApp
    const waText = `*Universal System - Solicitud de Atención*%0A` +
      `*ID Ticket:* ${ticketId}%0A` +
      `*Nombre:* ${encodeURIComponent(message.name.trim())}%0A` +
      `*Contacto:* ${encodeURIComponent(message.contact.trim())}%0A` +
      `*Área:* ${encodeURIComponent(serviceLabel)}%0A` +
      `*Mensaje:* ${encodeURIComponent((message.detail || "Consulta general").trim())}`;

    const cleanPhone = appConfig.author.phone.replace(/[^0-9]/g, "");
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${waText}`;

    const mailtoSubject = encodeURIComponent(`[Universal System] Solicitud #${ticketId} - ${message.name}`);
    const mailtoBody = encodeURIComponent(
      `Hola Jorge Thompson,\n\nSolicito atención en Universal System:\n` +
      `- Ticket: ${ticketId}\n` +
      `- Nombre: ${message.name}\n` +
      `- Contacto: ${message.contact}\n` +
      `- Servicio: ${serviceLabel}\n` +
      `- Detalle: ${message.detail || 'Sin detalles adicionales'}\n\nGracias.`
    );
    const mailtoUrl = `mailto:${appConfig.author.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Simulate async network request
    await new Promise((resolve) => setTimeout(resolve, 400));

    return {
      success: true,
      message: "¡Tu solicitud ha sido registrada con éxito en el sistema!",
      ticketId,
      whatsappUrl,
      mailtoUrl,
      timestamp: new Date().toISOString(),
    };
  }
}
