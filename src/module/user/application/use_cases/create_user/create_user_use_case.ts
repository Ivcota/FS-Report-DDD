import {
  CreateUserUseCaseInputDTO,
  CreateUserUseCaseOutputDTO,
} from "./create_user_dtos";

import { IEventBus } from "@/module/shared/domain/events/event_bus";
import { IUserRepository } from "@/module/user/domain/infra_ports/user_repository";
import { UseCase } from "@/module/shared/application/use_case";
import { User } from "@/module/user/domain/entities/User";

export class CreateUserUseCase
  implements UseCase<CreateUserUseCaseInputDTO, CreateUserUseCaseOutputDTO>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly eventBus: IEventBus
  ) {}

  async execute(
    input: CreateUserUseCaseInputDTO
  ): Promise<CreateUserUseCaseOutputDTO> {
    try {
      const userAlreadyExists = await this.userRepository.findByEmail(
        input.email ?? ""
      );
      if (userAlreadyExists) throw new Error("User already exists");

      const user = await User.create(
        input.email,
        input.password,
        input.firstName,
        input.lastName
      );

      await this.userRepository.save(user);

      for (const event of user.getDomainEvents()) {
        await this.eventBus.publish(event);
      }
      user.clearDomainEvents();

      return {
        success: true,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
        };
      } else {
        return {
          success: false,
          error: "Failed to create user unknown error",
        };
      }
    }
  }
}
