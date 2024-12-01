import {
  ViewWorkstationMonthUseCaseInputDTO,
  ViewWorkstationMonthUseCaseOutputDTO,
} from "./view_workstation_month_dto";

import { IFieldServiceGroupRepository } from "@/module/service_report/domain/infra_ports/field_service_group_repository";
import { IServiceRecordRepository } from "@/module/service_report/domain/infra_ports/service_record_repository";
import { Month } from "@/module/service_report/domain/value_objects/month";
import { UseCase } from "@/module/shared/application/use_case";

export class ViewWorkstationMonthUseCase
  implements
    UseCase<
      ViewWorkstationMonthUseCaseInputDTO,
      ViewWorkstationMonthUseCaseOutputDTO
    >
{
  constructor(
    private serviceRecordRepository: IServiceRecordRepository,
    private fieldServiceGroupRepository: IFieldServiceGroupRepository
  ) {}

  async execute(
    input: ViewWorkstationMonthUseCaseInputDTO
  ): Promise<ViewWorkstationMonthUseCaseOutputDTO> {
    let month: Month;
    try {
      if (!input.monthStart) {
        month = new Month(new Date());
      } else {
        month = new Month(new Date(input.monthStart));
      }
    } catch (error) {
      return {
        results: [],
        error: `Invalid month: ${JSON.stringify(error)}`,
      };
    }

    try {
      const fieldServiceGroupId =
        await this.fieldServiceGroupRepository.findByUserOwnerId(input.userId);

      if (!fieldServiceGroupId) {
        return {
          results: [],
          error: `Field service group not found`,
        };
      }
      const results =
        await this.serviceRecordRepository.findAllEmptyAndPopulatedRecordsForGivenMonth(
          month,
          fieldServiceGroupId.id
        );

      return { results };
    } catch (error) {
      return {
        results: [],
        error: `Error fetching service records: ${JSON.stringify(error)}`,
      };
    }
  }
}
