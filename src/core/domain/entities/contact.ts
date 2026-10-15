export interface ContactMessage {
  name: string;
  contact: string; // WhatsApp or Phone
  service: "asesoria" | "clases" | "soporte";
  detail?: string;
  email?: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  ticketId?: string;
  whatsappUrl?: string;
  mailtoUrl?: string;
  timestamp: string;
}
