import {
  CommitServiceRecordsUseCaseInputDTO,
  CommitServiceRecordsUseCaseOutput,
} from "./commit_service_records_dto";

import { IFieldServiceGroupRepository } from "@/module/service_report/domain/infra_ports/field_service_group_repository";
import { IPublisherRepository } from "@/module/service_report/domain/infra_ports/publisher_repository";
import { IServiceRecordRepository } from "@/module/service_report/domain/infra_ports/service_record_repository";
import { Publisher } from "@/module/service_report/domain/entities/publisher";
import { PublisherMapper } from "../../mappers/publisher_mapper";
import { ServiceRecordMapper } from "../../mappers/service_record_mapper";
import { UseCase } from "@/module/shared/application/use_case";

export class CommitServiceRecordsUseCase
  implements
    UseCase<
      CommitServiceRecordsUseCaseInputDTO,
      CommitServiceRecordsUseCaseOutput
    >
{
  constructor(
    private serviceRecordRepository: IServiceRecordRepository,
    private fieldServiceGroupRepository: IFieldServiceGroupRepository,
    private publisherRepository: IPublisherRepository
  ) {}
  async execute(
    input: CommitServiceRecordsUseCaseInputDTO
  ): Promise<CommitServiceRecordsUseCaseOutput> {
    const fieldServiceGroup =
      await this.fieldServiceGroupRepository.findByUserOwnerId(input.userId);

    if (!fieldServiceGroup) {
      return {
        success: false,
        error: "Field service group not found",
      };
    }

    try {
      for (const serviceRecord of input.serviceRecords) {
        let workingPublisher: Publisher | undefined;

        const existingPublisher =
          await this.publisherRepository.findByFirstNameAndLastName(
            serviceRecord.firstName,
            serviceRecord.lastName
          );

        if (existingPublisher) {
          workingPublisher = existingPublisher;
        } else {
          const mappedPublisher =
            PublisherMapper.fromCommitServiceRecord(serviceRecord);
          await this.publisherRepository.save(mappedPublisher);
          workingPublisher = mappedPublisher;
        }

        if (!workingPublisher) {
          return {
            success: false,
            error: "Failed to save publisher or find publisher",
          };
        }

        const domainServiceRecord =
          ServiceRecordMapper.fromCommitServiceRecord(serviceRecord);
        domainServiceRecord.assignPublisher(workingPublisher);
        domainServiceRecord.assignFieldServiceGroup(fieldServiceGroup.id);
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
