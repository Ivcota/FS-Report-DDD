import { Month } from "@/module/service_report/domain/value_objects/month";
import { ServiceRecord } from "@/module/service_report/domain/entities/service_record";

export interface IServiceRecordRepository {
  save(serviceRecord: ServiceRecord): Promise<void>;
  findById(id: string): Promise<ServiceRecord | undefined>;
  findByPublisherId(publisherId: string): Promise<ServiceRecord[]>;
  findByMonth(month: Month): Promise<ServiceRecord[]>;
  findAllEmptyAndPopulatedRecordsForGivenMonth(
    month: Month
  ): Promise<ServiceRecord[]>;
}
