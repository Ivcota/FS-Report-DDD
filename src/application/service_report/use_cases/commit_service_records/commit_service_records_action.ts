"use server";

import {
  CommitServiceRecord,
  CommitServiceRecordsSchema,
} from "./commit_service_records_dto";

import { CommitServiceRecordsUseCase } from "./commit_service_records_use_case";
import { ServiceContainer } from "../../service_container";

const serviceContainer = ServiceContainer.getInstance();
const commitServiceRecordsUseCase = new CommitServiceRecordsUseCase(
  serviceContainer.serviceRecordRepository
);

type ActionState = {
  success: boolean;
  error?: string;
};

export const commitServiceRecordsAction = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const serviceRecords = formData.get("serviceRecords");

  if (!serviceRecords) {
    return { success: false, error: "No service records provided" };
  }
  let serviceRecordsParsed: CommitServiceRecord[];
  try {
    const temp = JSON.parse(serviceRecords.toString());
    serviceRecordsParsed = CommitServiceRecordsSchema.parse(temp);
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: `Failed to parse service records: ${JSON.stringify(error)}`,
    };
  }

  const result = await commitServiceRecordsUseCase.execute({
    serviceRecords: serviceRecordsParsed,
  });

  console.log(result);

  return { success: result.success, error: result.error };
};
