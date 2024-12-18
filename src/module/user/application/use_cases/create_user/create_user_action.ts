"use server";

import { CompositionRoot } from "@/composition_root";
import { CreateUserUseCaseInputDTO } from "./create_user_dtos";
import { config } from "@/config";
import { signIn } from "@/module/user/infrastructure/external_services/auth";

type ActionState = {
  success: boolean;
  error?: string;
};

const serviceContainer = CompositionRoot.getInstance(config);
const createUserUseCase = serviceContainer.userModule.getCreateUserUseCase();

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

  if (success) {
    await signIn("credentials", {
      email: input.email,
      password: input.password,
    });
  }

  return { success, error };
};
