import { Month } from "@/domain/service_report/value_objects/month";
import { ServiceRecord } from "@/domain/service_report/entities/service_record";

export interface IServiceRecordRepository {
  save(serviceRecord: ServiceRecord): Promise<void>;
  findById(id: string): Promise<ServiceRecord | undefined>;
  findByPublisherId(publisherId: string): Promise<ServiceRecord[]>;
  findByMonth(month: Month): Promise<ServiceRecord[]>;
}
