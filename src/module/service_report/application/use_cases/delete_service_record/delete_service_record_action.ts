"use server";

import { CompositionRoot } from "@/composition_root";
import { config } from "@/config";
import { revalidatePath } from "next/cache";

const serviceContainer = CompositionRoot.getInstance(config);

type ActionState = {
  success: boolean;
  error?: string;
};

export async function deleteServiceRecordAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const id = formData.get("id")?.toString();
  const userId = formData.get("userId")?.toString();

  if (!id) {
    return { success: false, error: "No service record ID provided" };
  }

  if (!userId) {
    return { success: false, error: "No user ID provided" };
  }

  const deleteServiceRecordUseCase =
    serviceContainer.serviceReportModule.getDeleteServiceRecordUseCase();

  const result = await deleteServiceRecordUseCase.execute({
    id,
    userId,
  });

  revalidatePath("/service-report-workstation");

  return { success: result.success, error: result.error };
}
