import { ContactMessage, ContactSubmissionResult } from "../entities/contact";

export interface IContactRepository {
  sendMessage(message: ContactMessage): Promise<ContactSubmissionResult>;
}
