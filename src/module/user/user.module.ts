import { AuthorizeUserUseCase } from "@/module/user/application/use_cases/authorize_user/authorize_user_use_case";
import { CreateUserUseCase } from "@/module/user/application/use_cases/create_user/create_user_use_case";
import { IEventBus } from "@/module/shared/domain/events/event_bus";
import { IUserRepository } from "@/module/user/domain/infra_ports/user_repository";
import { PrismaClient } from "@prisma/client";
import { UserRepository } from "@/module/user/infrastructure/repositories/user_repository";

export class UserModule {
  private userRepository: IUserRepository;
  private createUserUseCase: CreateUserUseCase;
  private authorizeUserUseCase: AuthorizeUserUseCase;

  constructor(private prismaClient: PrismaClient, private eventBus: IEventBus) {
    this.userRepository = new UserRepository(this.prismaClient);
    this.createUserUseCase = new CreateUserUseCase(
      this.userRepository,
      this.eventBus
    );
    this.authorizeUserUseCase = new AuthorizeUserUseCase(this.userRepository);
  }

  getCreateUserUseCase(): CreateUserUseCase {
    return this.createUserUseCase;
  }

  getAuthorizeUserUseCase(): AuthorizeUserUseCase {
    return this.authorizeUserUseCase;
  }

  getUserRepository(): IUserRepository {
    return this.userRepository;
  }
}
