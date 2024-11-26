import { AIService } from "@/infrastructure/external_services/ai";
import { PreviewRecordListSchema } from "@/domain/service_report/value_objects/preview_record";
import { PreviewRecordMapper } from "@/domain/service_report/mapper/preview_record_mapper";
import { ServiceRecord } from "@/domain/service_report/entities/service_record";
import { UseCase } from "@/shared/use_case";

type ParseServiceRecordsUseCaseInputDTO = {
  rawString: string;
};

export type ParseServiceRecordsUseCaseOutput = {
  serviceRecords: ServiceRecord[];
  error?: string;
};

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

      const serviceRecords = response.records.map(
        PreviewRecordMapper.toServiceRecord
      );

      return {
        serviceRecords,
      };
    } catch (error) {
      return {
        serviceRecords: [],
        error: `Error parsing service records: ${JSON.stringify(error)}`,
      };
    }
  }
}
