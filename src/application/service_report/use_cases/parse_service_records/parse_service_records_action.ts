"use server";

import {
  ParseServiceRecordsUseCase,
  ParseServiceRecordsUseCaseOutput,
} from "./parse_service_records_use_case";

import { ServiceContainer } from "../../service_container";
import { ServiceRecord } from "@/domain/service_report/entities/service_record";

const serviceContainer = ServiceContainer.getInstance();
const parseServiceRecordsUseCase = new ParseServiceRecordsUseCase(
  serviceContainer.aiService
);

type ActionState = {
  serviceRecords: any;
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

  const { serviceRecords, error } = await parseServiceRecordsUseCase.execute({
    rawString,
  });

  return {
    serviceRecords: JSON.stringify(serviceRecords),
    error,
  };
};
