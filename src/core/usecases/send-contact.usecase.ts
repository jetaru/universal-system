import { ContactMessage, ContactSubmissionResult } from "../domain/entities/contact";
import { IContactRepository } from "../domain/repositories/IContactRepository";

export class SendContactUseCase {
  constructor(private readonly contactRepository: IContactRepository) {}

  async execute(message: ContactMessage): Promise<ContactSubmissionResult> {
    if (!message.name || !message.name.trim()) {
      return {
        success: false,
        message: "Por favor indica tu nombre completo.",
        timestamp: new Date().toISOString(),
      };
    }

    if (!message.contact || !message.contact.trim()) {
      return {
        success: false,
        message: "Por favor indica un teléfono o WhatsApp de contacto.",
        timestamp: new Date().toISOString(),
      };
    }

    return await this.contactRepository.sendMessage(message);
  }
}
