import { MockContactRepository } from "./repositories/MockContactRepository";
import { SendContactUseCase } from "@/core/usecases/send-contact.usecase";

const contactRepository = new MockContactRepository();
const sendContactUseCase = new SendContactUseCase(contactRepository);

export const container = {
  contactRepository,
  sendContactUseCase,
};
