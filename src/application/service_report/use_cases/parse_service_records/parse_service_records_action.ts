"use server";

import {
  ParseServiceRecordsUseCase,
  ParseServiceRecordsUseCaseOutput,
} from "./parse_service_records_use_case";

import { ServiceContainer } from "../../service_container";

const serviceContainer = ServiceContainer.getInstance();
const parseServiceRecordsUseCase = new ParseServiceRecordsUseCase(
  serviceContainer.aiService
);

export const parseServiceRecordsAction = async (
  _prevState: ParseServiceRecordsUseCaseOutput,
  formData: FormData
): Promise<ParseServiceRecordsUseCaseOutput> => {
  const rawString = formData.get("unparsedRecords")?.toString();

  if (!rawString) {
    return { error: "No raw string provided", serviceRecords: [] };
  }

  return parseServiceRecordsUseCase.execute({ rawString });
};
