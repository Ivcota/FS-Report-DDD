import { AIService } from "./modual/shared/infrastructure/external_services/ai";
import { IServiceRecordRepository } from "@/modual/service_report/domain/infra_ports/service_record_repository";
import { IUserRepository } from "@/modual/user/domain/infra_ports/user_repository";
import { PrismaClient } from "@prisma/client";
import { ServiceRecordRepository } from "./modual/service_report/infrastructure/repositories/service_record_repository";
import { UserRepository } from "./modual/user/infrastructure/repositories/user_repository";
export class ServiceContainer {
  private static instance: ServiceContainer;
  serviceRecordRepository: IServiceRecordRepository;
  userRepository: IUserRepository;
  aiService: AIService;

  private constructor() {
    const prisma = new PrismaClient();
    this.serviceRecordRepository = new ServiceRecordRepository(prisma);
    this.userRepository = new UserRepository(prisma);
    this.aiService = new AIService(process.env.OPENAI_API_KEY);
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }
}
