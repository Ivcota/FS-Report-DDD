"use server";

import { CompositionRoot } from "@/composition_root";
import { SimplifiedServiceRecord } from "./parse-service_records_dto";
import { config } from "@/config";

const serviceContainer = CompositionRoot.getInstance(config);

type ActionState = {
  serviceRecords: SimplifiedServiceRecord[];
  error?: string;
};

export const parseServiceRecordsAction = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const rawString = formData.get("unparsedRecords")?.toString();

  if (!rawString) {
    return { error: "No raw string provided", serviceRecords: [] };
  }

  const parseServiceRecordsUseCase =
    serviceContainer.serviceReportModule.getParseServiceRecordsUseCase();

  const { serviceRecords, error } = await parseServiceRecordsUseCase.execute({
    rawString,
  });

  return {
    serviceRecords: serviceRecords,
    error,
  };
};
