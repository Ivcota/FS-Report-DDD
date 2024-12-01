/**
 * @fileoverview Service Container implementation using the Singleton pattern to manage application-wide dependencies.
 * This container handles the initialization and management of repositories, services, and event handlers.
 */

import { EventBus, IEventBus } from "./module/shared/domain/events/event_bus";

import { AIService } from "./module/shared/infrastructure/external_services/ai";
import { PrismaClient } from "@prisma/client";
import { ServiceReportModule } from "./module/service_report/service_report.module";
import { UserModule } from "./module/user/user.module";
import { registerUserEvents } from "./module/user/infrastructure/events/register_user_events";
import { registerUserEvents as registerUserEventsServiceReport } from "@/module/service_report/infrastructure/events/register_user_events";

/**
 * CompositionRoot class implements the Singleton pattern to provide a single source of truth
 * for all service dependencies throughout the application.
 *
 * @class CompositionRoot
 */
export class CompositionRoot {
  /** Singleton instance of the CompositionRoot */
  private static instance: CompositionRoot;

  /** Service for AI-related operations */
  private aiService: AIService;

  /** Event bus for handling domain events */
  eventBus: IEventBus;

  /** Module for service report operations */
  serviceReportModule: ServiceReportModule;

  /** Module for user operations */
  userModule: UserModule;

  /**
   * Private constructor to prevent direct instantiation.
   * Initializes all dependencies including repositories, services, and event handlers.
   *
   * @private
   */
  private constructor() {
    // Initialize database connection and repositories
    const prisma = new PrismaClient();
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
   * Gets the singleton instance of the CompositionRoot.
   * Creates a new instance if one doesn't exist.
   *
   * @returns {CompositionRoot} The singleton instance of CompositionRoot
   * @static
   */
  static getInstance(): CompositionRoot {
    if (!CompositionRoot.instance) {
      CompositionRoot.instance = new CompositionRoot();
    }
    return CompositionRoot.instance;
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
