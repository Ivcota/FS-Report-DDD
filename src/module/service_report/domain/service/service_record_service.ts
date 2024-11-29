import { FieldServiceGroup } from "@/module/service_report/domain/entities/field_service_group";
import { ServiceRecord } from "@/module/service_report/domain/entities/service_record";

export class ServiceRecordService {
  shouldBeAbleToDelete(
    serviceRecord: ServiceRecord,
    fieldServiceGroup: FieldServiceGroup,
    userId: string
  ): boolean {
    const serviceRecordBelongsToFieldServiceGroup =
      serviceRecord.fieldServiceGroupId === fieldServiceGroup.id;
    const fieldServiceGroupBelongsToUser =
      fieldServiceGroup.userOwnerId === userId;
    return (
      serviceRecordBelongsToFieldServiceGroup && fieldServiceGroupBelongsToUser
    );
  }
}
