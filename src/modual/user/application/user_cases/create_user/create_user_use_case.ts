import {
  CreateUserUseCaseInputDTO,
  CreateUserUseCaseOutputDTO,
} from "./create_user_dtos";

import { IUserRepository } from "@/modual/user/domain/infra_ports/user_repository";
import { UseCase } from "@/modual/shared/application/use_case";
import { User } from "@/modual/user/domain/entities/User";

export class CreateUserUseCase
  implements UseCase<CreateUserUseCaseInputDTO, CreateUserUseCaseOutputDTO>
{
  constructor(private readonly userRepository: IUserRepository) {}

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
