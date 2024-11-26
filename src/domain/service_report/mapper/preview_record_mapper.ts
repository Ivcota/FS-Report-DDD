import { PreviewRecord } from "../value_objects/preview_record";
import { Publisher } from "../entities/publisher";
import { ServiceRecord } from "../entities/service_record";

export class PreviewRecordMapper {
  static toServiceRecord(previewRecord: PreviewRecord): ServiceRecord {
    const publisher = Publisher.create({
      firstName: previewRecord.firstName,
      lastName: previewRecord.lastName,
    });

    return ServiceRecord.create({
      bibleStudies: previewRecord.bibleStudies ?? 0,
      serviceMonth: new Date(previewRecord.serviceMonth),
      creditHours: previewRecord.creditHours ?? undefined,
      serviceHours: previewRecord.serviceHours ?? undefined,
      comments: previewRecord.comments ?? undefined,
      isResolved: false,
      publisher,
    });
  }
}
