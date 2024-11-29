"use server";

import { DeleteServiceRecordUseCase } from "./delete_service_record_use_case";
import { ServiceContainer } from "@/service_container";

const serviceContainer = ServiceContainer.getInstance();
const deleteServiceRecordUseCase = new DeleteServiceRecordUseCase(
  serviceContainer.serviceRecordRepository,
  serviceContainer.fieldServiceGroupRepository,
  serviceContainer.serviceRecordService
);

type ActionState = {
  success: boolean;
  error?: string;
};

export const deleteServiceRecordAction = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const id = formData.get("id")?.toString();
  const userId = formData.get("userId")?.toString();

  if (!id) {
    return { success: false, error: "No service record ID provided" };
  }

  if (!userId) {
    return { success: false, error: "No user ID provided" };
  }

  return await deleteServiceRecordUseCase.execute({
    id,
    userId,
  });
};
