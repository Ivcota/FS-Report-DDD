import {
  ViewWorkstationMonthUseCaseInputDTO,
  ViewWorkstationMonthUseCaseOutputDTO,
} from "./view_workstation_month_dto";

import { IServiceRecordRepository } from "@/domain/service_report/infra_ports/service_record_repository";
import { Month } from "@/domain/service_report/value_objects/month";
import { UseCase } from "@/shared/use_case";

class ViewWorkstationMonthUseCase
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
      month = new Month(new Date(input.monthStart));
    } catch (error) {
      return { success: false, error: "Invalid month" };
    }

    return this.serviceRecordRepository.findAllEmptyAndPopulatedRecordsForGivenMonth(
      month
    );
  }
}
