import {
  ParseServiceRecordsUseCaseInputDTO,
  ParseServiceRecordsUseCaseOutput,
} from "./parse-service_records_dto";

import { AIService } from "@/infrastructure/external_services/ai";
import { PreviewRecordListSchema } from "@/domain/service_report/value_objects/preview_record";
import { PreviewRecordMapper } from "@/domain/service_report/mapper/preview_record_mapper";
import { ServiceRecordMapper } from "../../mappers/service_record_mapper";
import { UseCase } from "@/shared/use_case";

export class ParseServiceRecordsUseCase
  implements
    UseCase<
      ParseServiceRecordsUseCaseInputDTO,
      ParseServiceRecordsUseCaseOutput
    >
{
  constructor(private aiService: AIService) {}
  async execute(
    input: ParseServiceRecordsUseCaseInputDTO
  ): Promise<ParseServiceRecordsUseCaseOutput> {
    try {
      const response = await this.aiService.genericParser(
        PreviewRecordListSchema,
        {
          mainPrompt: `
          You are a helpful assistant that can parse bulk field service records.
          The following is a list of field service records:
          ${input.rawString}

          -----

          If you cannot parse the records, return an error message.
          "Error: <error message>"
        `,
          example: `
          Months should look like this: January 2024
          Names should look like this: Diles, Iverson
        `,
        }
      );

      if (response.error) {
        throw new Error(response.error);
      }

      const serviceRecords = response.records.map(
        PreviewRecordMapper.toServiceRecord
      );

      console.log(serviceRecords);
      return {
        serviceRecords: serviceRecords.map(
          ServiceRecordMapper.toSimplifiedServiceRecord
        ),
      };
    } catch (error) {
      return {
        serviceRecords: [],
        error: `Error parsing service records: ${JSON.stringify(error)}`,
      };
    }
  }
}
