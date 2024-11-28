import { ServiceRecord } from "@/module/service_report/domain/entities/service_record";

export type ViewWorkstationMonthUseCaseInputDTO = {
  monthStart: string;
};

export type ViewWorkstationMonthUseCaseOutputDTO = {
  results: ServiceRecord[];
  error?: string;
};
