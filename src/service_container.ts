import { EventBus, IEventBus } from "./module/shared/domain/events/event_bus";

import { AIService } from "./module/shared/infrastructure/external_services/ai";
import { FieldServiceGroupRepository } from "@/module/service_report/infrastructure/repositories/field_service_group_repository";
import { IFieldServiceGroupRepository } from "@/module/service_report/domain/infra_ports/field_service_group_repository";
import { IServiceRecordRepository } from "@/module/service_report/domain/infra_ports/service_record_repository";
import { IUserRepository } from "@/module/user/domain/infra_ports/user_repository";
import { PrismaClient } from "@prisma/client";
import { ServiceRecordRepository } from "@/module/service_report/infrastructure/repositories/service_record_repository";
import { UserRepository } from "@/module/user/infrastructure/repositories/user_repository";

export class ServiceContainer {
  private static instance: ServiceContainer;
  serviceRecordRepository: IServiceRecordRepository;
  userRepository: IUserRepository;
  fieldServiceGroupRepository: IFieldServiceGroupRepository;
  aiService: AIService;
  eventBus: IEventBus;

  private constructor() {
    const prisma = new PrismaClient();
    this.serviceRecordRepository = new ServiceRecordRepository(prisma);
    this.userRepository = new UserRepository(prisma);
    this.fieldServiceGroupRepository = new FieldServiceGroupRepository(prisma);
    this.aiService = new AIService(process.env.OPENAI_API_KEY);
    this.eventBus = new EventBus();
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }
}
