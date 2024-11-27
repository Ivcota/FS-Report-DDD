export type CreateUserUseCaseInputDTO = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
};

export type CreateUserUseCaseOutputDTO = {
  success: boolean;
  error?: string;
};
