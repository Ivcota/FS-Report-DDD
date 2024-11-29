export type DeleteServiceRecordUseCaseInputDTO = {
  id: string;
  userId: string;
};

export type DeleteServiceRecordUseCaseOutputDTO = {
  success: boolean;
  error?: string;
};
