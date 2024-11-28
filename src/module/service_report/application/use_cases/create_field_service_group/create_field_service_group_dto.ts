export type CreateFieldServiceGroupUseCaseInputDTO = {
  name: string;
  userOwnerId: string;
};

export type CreateFieldServiceGroupUseCaseOutputDTO = {
  success: boolean;
  fieldServiceGroup?: {
    id: string;
    name: string;
    userOwnerId: string;
  };
  error?: string;
};
