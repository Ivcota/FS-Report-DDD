import { EventBus, IEventBus } from "@/module/shared/domain/events/event_bus";

import { AIService } from "./infrastructure/external_services/ai";
import { Config } from "@/config";
import { PrismaClient } from "@prisma/client";

export class SharedModule {
  private eventBus: IEventBus;
  private prismaClient: PrismaClient;
  private aiService: AIService;

  constructor(config: Config) {
    this.eventBus = new EventBus();
    this.prismaClient = new PrismaClient();
    this.aiService = new AIService(config.OPENAI_API_KEY);
  }

  getEventBus(): IEventBus {
    return this.eventBus;
  }

  getPrismaClient(): PrismaClient {
    return this.prismaClient;
  }

  getAIService(): AIService {
    return this.aiService;
  }
}
