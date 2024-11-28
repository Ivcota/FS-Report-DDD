import {
  ViewWorkstationMonthUseCaseInputDTO,
  ViewWorkstationMonthUseCaseOutputDTO,
} from "./view_workstation_month_dto";

import { IServiceRecordRepository } from "@/modual/service_report/domain/infra_ports/service_record_repository";
import { Month } from "@/modual/service_report/domain/value_objects/month";
import { UseCase } from "@/shared/use_case";

export class ViewWorkstationMonthUseCase
  implements
    UseCase<
      ViewWorkstationMonthUseCaseInputDTO,
      ViewWorkstationMonthUseCaseOutputDTO
    >
{
  constructor(private serviceRecordRepository: IServiceRecordRepository) {}

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
      const results =
        await this.serviceRecordRepository.findAllEmptyAndPopulatedRecordsForGivenMonth(
          month
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
