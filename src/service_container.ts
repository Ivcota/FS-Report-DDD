/**
 * @fileoverview Service Container implementation using the Singleton pattern to manage application-wide dependencies.
 * This container handles the initialization and management of repositories, services, and event handlers.
 */

import { EventBus, IEventBus } from "./module/shared/domain/events/event_bus";

import { AIService } from "./module/shared/infrastructure/external_services/ai";
import { CreateFieldServiceGroupUseCase } from "./module/service_report/application/use_cases/create_field_service_group/create_field_service_group_use_case";
import { FieldServiceGroupRepository } from "@/module/service_report/infrastructure/repositories/field_service_group_repository";
import { IFieldServiceGroupRepository } from "@/module/service_report/domain/infra_ports/field_service_group_repository";
import { IServiceRecordRepository } from "@/module/service_report/domain/infra_ports/service_record_repository";
import { IUserRepository } from "@/module/user/domain/infra_ports/user_repository";
import { PrismaClient } from "@prisma/client";
import { ServiceRecordRepository } from "@/module/service_report/infrastructure/repositories/service_record_repository";
import { UserRepository } from "@/module/user/infrastructure/repositories/user_repository";
import { registerUserEvents } from "./module/user/infrastructure/events/register_user_events";
import { registerUserEvents as registerUserEventsServiceReport } from "@/module/service_report/infrastructure/events/register_user_events";

type ServiceContainerDependencies = {
  serviceRecordRepository: IServiceRecordRepository;
  userRepository: IUserRepository;
  fieldServiceGroupRepository: IFieldServiceGroupRepository;
  createFieldServiceGroupUseCase: CreateFieldServiceGroupUseCase;
  aiService: AIService;
  eventBus: IEventBus;
};

type ServiceContainerPublicUseCases = {
  createFieldServiceGroupUseCase: CreateFieldServiceGroupUseCase;
};

/**
 * ServiceContainer class implements the Singleton pattern to provide a single source of truth
 * for all service dependencies throughout the application.
 *
 * @class ServiceContainer
 */
export class ServiceContainer
  implements ServiceContainerDependencies, ServiceContainerPublicUseCases
{
  /** Singleton instance of the ServiceContainer */
  private static instance: ServiceContainer;

  /** Repository for managing service records */
  serviceRecordRepository: IServiceRecordRepository;

  /** Repository for managing users */
  userRepository: IUserRepository;

  /** Repository for managing field service groups */
  fieldServiceGroupRepository: IFieldServiceGroupRepository;

  /** Use case for creating field service groups */
  createFieldServiceGroupUseCase: CreateFieldServiceGroupUseCase;

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
    this.serviceRecordRepository = new ServiceRecordRepository(prisma);
    this.userRepository = new UserRepository(prisma);
    this.fieldServiceGroupRepository = new FieldServiceGroupRepository(prisma);

    // Initialize external services
    this.aiService = new AIService(process.env.OPENAI_API_KEY);
    this.eventBus = new EventBus();

    // Initialize use cases with their required dependencies
    this.createFieldServiceGroupUseCase = new CreateFieldServiceGroupUseCase(
      this.fieldServiceGroupRepository
    );

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
      this.createFieldServiceGroupUseCase
    );
  }
}
