import { AIService } from "@/infrastructure/external_services/ai";
import { IServiceRecordRepository } from "@/domain/service_report/infra_ports/service_record_repository";
import { PrismaClient } from "@prisma/client";
import { ServiceRecordRepository } from "@/infrastructure/repositories/service_record_repository";
export class ServiceContainer {
  private static instance: ServiceContainer;
  serviceRecordRepository: IServiceRecordRepository;
  aiService: AIService;

  private constructor() {
    const prisma = new PrismaClient();
    this.serviceRecordRepository = new ServiceRecordRepository(prisma);
    this.aiService = new AIService(process.env.OPENAI_API_KEY);
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }
}
