import { ServiceRecord } from "@/modual/service_report/domain/entities/service_record";

export type ViewWorkstationMonthUseCaseInputDTO = {
  monthStart: string;
};

export type ViewWorkstationMonthUseCaseOutputDTO = {
  results: ServiceRecord[];
  error?: string;
};
