import { PrismaClient } from "@prisma/client";
import { ServiceRecordRepository } from "@/infrastructure/repositories/service_record_repository";

export class ServiceContainer {
  private static instance: ServiceContainer;
  serviceRecordRepository: ServiceRecordRepository;

  private constructor() {
    const prisma = new PrismaClient();
    this.serviceRecordRepository = new ServiceRecordRepository(prisma);
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }
}
