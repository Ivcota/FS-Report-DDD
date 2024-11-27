"use server";

import { CreateUserUseCase } from "./create_user_use_case";
import { CreateUserUseCaseInputDTO } from "./create_user_dtos";
import { ServiceContainer } from "@/application/service_report/service_container";

type ActionState = {
  success: boolean;
  error?: string;
};
const serviceContainer = ServiceContainer.getInstance();
const createUserUseCase = new CreateUserUseCase(
  serviceContainer.userRepository
);

export const createUserAction = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");

  const input: CreateUserUseCaseInputDTO = {
    email: email?.toString(),
    password: password?.toString(),
    firstName: firstName?.toString(),
    lastName: lastName?.toString(),
  };

  const { success, error } = await createUserUseCase.execute(input);

  return { success, error };
};
