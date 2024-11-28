import {
  AuthorizeUserInputDTO,
  AuthorizeUserOutputDTO,
} from "./authorize_user_dtos";

import { IUserRepository } from "@/modual/user/domain/infra_ports/user_repository";
import { UseCase } from "@/modual/shared/application/use_case";
import { UserMapper } from "../../mappers/user_mapper";

export class AuthorizeUserUseCase
  implements UseCase<AuthorizeUserInputDTO, AuthorizeUserOutputDTO>
{
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(input: AuthorizeUserInputDTO): Promise<AuthorizeUserOutputDTO> {
    try {
      const user = await this.userRepository.findByEmail(input.email);
      if (!user) throw new Error("Invalid Credentials");

      const isPasswordValid = await user.verifyPassword(input.password);

      if (!isPasswordValid) throw new Error("Invalid Credentials");

      return { success: true, user: UserMapper.toClient(user) };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "Internal Server Error" };
    }
  }
}
