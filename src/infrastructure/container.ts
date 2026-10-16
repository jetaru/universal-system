import { EmailJSContactRepository } from "./repositories/EmailJSContactRepository";
import { MockContactRepository } from "./repositories/MockContactRepository";
import { HttpServerRepository } from "./repositories/HttpServerRepository";
import { MockServerRepository } from "./repositories/MockServerRepository";
import { SendContactUseCase } from "@/core/usecases/send-contact.usecase";
import { CheckServerStatusUseCase } from "@/core/usecases/check-server.usecase";

/**
 * Contenedor de Inyección de Dependencias (IoC / Dependency Injection)
 *
 * Centraliza la instanciación de repositorios de infraestructura y casos de uso de dominio,
 * respetando el principio de Inversión de Dependencias (DIP) de Clean Architecture.
 */
const contactRepository = new EmailJSContactRepository();
const mockContactRepository = new MockContactRepository();
const sendContactUseCase = new SendContactUseCase(contactRepository);

const serverRepository = new HttpServerRepository();
const mockServerRepository = new MockServerRepository();
const checkServerStatusUseCase = new CheckServerStatusUseCase(serverRepository);

export const container = {
  /** Repositorio principal configurado con EmailJS */
  contactRepository,
  /** Repositorio mock disponible para entornos desconectados o pruebas */
  mockContactRepository,
  /** Caso de uso de envío de contacto con validaciones de seguridad OWASP */
  sendContactUseCase,
  /** Repositorio para verificación de estado del servidor */
  serverRepository,
  /** Repositorio mock de servidor para pruebas */
  mockServerRepository,
  /** Caso de uso para verificar estado y latencia de infraestructura */
  checkServerStatusUseCase,
};

