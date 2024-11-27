import { ServiceRecord } from "@/domain/service_report/entities/service_record";

export type ViewWorkstationMonthUseCaseInputDTO = {
  monthStart: string;
};

export type ViewWorkstationMonthUseCaseOutputDTO = {
  results: ServiceRecord[];
  error?: string;
};
