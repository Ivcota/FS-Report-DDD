import {
  ParseServiceRecordsUseCaseInputDTO,
  ParseServiceRecordsUseCaseOutput,
} from "./parse-service_records_dto";

import { AIService } from "@/modual/shared/infrastructure/external_services/ai";
import { PreviewRecordListSchema } from "@/modual/service_report/domain/value_objects/preview_record";
import { PreviewRecordMapper } from "@/modual/service_report/domain/mapper/preview_record_mapper";
import { ServiceRecordMapper } from "@/modual/service_report/application/mappers/service_record_mapper";
import { UseCase } from "@/modual/shared/application/use_case";

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
