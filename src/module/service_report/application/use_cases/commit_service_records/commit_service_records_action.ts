"use server";

import {
  CommitServiceRecord,
  CommitServiceRecordsSchema,
} from "./commit_service_records_dto";

import { CompositionRoot } from "@/composition_root";
import { config } from "@/config";

const serviceContainer = CompositionRoot.getInstance(config);

type ActionState = {
  success: boolean;
  error?: string;
};

export const commitServiceRecordsAction = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const commitServiceRecordsUseCase =
    serviceContainer.serviceReportModule.getCommitServiceRecordsUseCase();

  const serviceRecords = formData.get("serviceRecords");
  const userId = formData.get("userId");

  if (!userId) {
    return { success: false, error: "No user ID provided" };
  }

  if (!serviceRecords) {
    return { success: false, error: "No service records provided" };
  }
  let serviceRecordsParsed: CommitServiceRecord[];
  try {
    const temp = JSON.parse(serviceRecords.toString());
    serviceRecordsParsed = CommitServiceRecordsSchema.parse(temp);
  } catch (error) {
    return {
      success: false,
      error: `Failed to parse service records: ${JSON.stringify(error)}`,
    };
  }

  const result = await commitServiceRecordsUseCase.execute({
    serviceRecords: serviceRecordsParsed,
    userId: userId?.toString(),
  });

  return { success: result.success, error: result.error };
};
