import {
  DeleteServiceRecordUseCaseInputDTO,
  DeleteServiceRecordUseCaseOutputDTO,
} from "./delete_service_record_dto";

import { IFieldServiceGroupRepository } from "@/module/service_report/domain/infra_ports/field_service_group_repository";
import { IServiceRecordRepository } from "@/module/service_report/domain/infra_ports/service_record_repository";
import { ServiceRecordService } from "@/module/service_report/domain/service/service_record_service";
import { UseCase } from "@/module/shared/application/use_case";

export class DeleteServiceRecordUseCase
  implements
    UseCase<
      DeleteServiceRecordUseCaseInputDTO,
      DeleteServiceRecordUseCaseOutputDTO
    >
{
  constructor(
    private readonly serviceRecordRepository: IServiceRecordRepository,
    private readonly fieldServiceGroupRepository: IFieldServiceGroupRepository,
    private readonly serviceRecordService: ServiceRecordService
  ) {}

  async execute(
    input: DeleteServiceRecordUseCaseInputDTO
  ): Promise<DeleteServiceRecordUseCaseOutputDTO> {
    try {
      const { id, userId } = input;
      const serviceRecord = await this.serviceRecordRepository.findById(id);

      if (!serviceRecord?.fieldServiceGroupId) {
        return {
          success: false,
          error: "Service record not found",
        };
      }

      const fieldServiceGroup = await this.fieldServiceGroupRepository.findById(
        serviceRecord.fieldServiceGroupId
      );

      if (!fieldServiceGroup) {
        return {
          success: false,
          error: "Field service group not found",
        };
      }

      if (
        !this.serviceRecordService.shouldBeAbleToDelete(
          serviceRecord,
          fieldServiceGroup,
          userId
        )
      ) {
        return {
          success: false,
          error: "You are not allowed to delete this service record",
        };
      }

      await this.serviceRecordRepository.delete(id);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Failed to delete service record: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      };
    }
  }
}
