/**
 * @fileoverview Service Container implementation using the Singleton pattern to manage application-wide dependencies.
 * This container handles the initialization and management of repositories, services, and event handlers.
 */

import { EventBus, IEventBus } from "./module/shared/domain/events/event_bus";

import { AIService } from "./module/shared/infrastructure/external_services/ai";
import { IUserRepository } from "@/module/user/domain/infra_ports/user_repository";
import { PrismaClient } from "@prisma/client";
import { ServiceReportModule } from "./module/service_report/service_report.module";
import { UserModule } from "./module/user/user.module";
import { UserRepository } from "@/module/user/infrastructure/repositories/user_repository";
import { registerUserEvents } from "./module/user/infrastructure/events/register_user_events";
import { registerUserEvents as registerUserEventsServiceReport } from "@/module/service_report/infrastructure/events/register_user_events";

/**
 * ServiceContainer class implements the Singleton pattern to provide a single source of truth
 * for all service dependencies throughout the application.
 *
 * @class ServiceContainer
 */
export class ServiceContainer {
  /** Singleton instance of the ServiceContainer */
  private static instance: ServiceContainer;

  serviceReportModule: ServiceReportModule;
  userModule: UserModule;
  /** Repository for managing users */
  userRepository: IUserRepository;

  /** Service for AI-related operations */
  aiService: AIService;

  /** Event bus for handling domain events */
  eventBus: IEventBus;

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes all dependencies including repositories, services, and event handlers.
   *
   * @private
   */
  private constructor() {
    // Initialize database connection and repositories
    const prisma = new PrismaClient();
    this.userRepository = new UserRepository(prisma);

    // Initialize external services
    this.aiService = new AIService(process.env.OPENAI_API_KEY);
    this.eventBus = new EventBus();

    this.serviceReportModule = new ServiceReportModule(prisma, this.aiService);
    this.userModule = new UserModule(prisma, this.eventBus);

    // Register event handlers for domain events
    // Must be called after all dependencies are initialized since handlers may depend on repositories/services
    this.registerEvents(this.eventBus);
  }

  /**
   * Gets the singleton instance of the ServiceContainer.
   * Creates a new instance if one doesn't exist.
   *
   * @returns {ServiceContainer} The singleton instance of ServiceContainer
   * @static
   */
  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  /**
   * Registers all event handlers with the event bus.
   * This includes user-related events and service report events.
   *
   * @param {IEventBus} eventBus - The event bus instance to register handlers with
   */
  registerEvents(eventBus: IEventBus) {
    registerUserEvents(eventBus);
    registerUserEventsServiceReport(
      eventBus,
      this.serviceReportModule.getCreateFieldServiceGroupUseCase()
    );
  }
}
