import {
  CommitServiceRecordsUseCaseInputDTO,
  CommitServiceRecordsUseCaseOutput,
} from "./commit_service_records_dto";

import { IServiceRecordRepository } from "@/module/service_report/domain/infra_ports/service_record_repository";
import { ServiceRecordMapper } from "../../mappers/service_record_mapper";
import { UseCase } from "@/module/shared/application/use_case";

export class CommitServiceRecordsUseCase
  implements
    UseCase<
      CommitServiceRecordsUseCaseInputDTO,
      CommitServiceRecordsUseCaseOutput
    >
{
  constructor(private serviceRecordRepository: IServiceRecordRepository) {}
  async execute(
    input: CommitServiceRecordsUseCaseInputDTO
  ): Promise<CommitServiceRecordsUseCaseOutput> {
    try {
      for (const serviceRecord of input.serviceRecords) {
        const domainServiceRecord =
          ServiceRecordMapper.fromCommitServiceRecord(serviceRecord);
        await this.serviceRecordRepository.save(domainServiceRecord);
      }

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      return {
        success: false,
        error: `Failed to commit service records: ${errorMessage}`,
      };
    }
  }
}
