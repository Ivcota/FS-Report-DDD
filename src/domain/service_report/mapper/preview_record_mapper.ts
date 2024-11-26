import { PreviewRecord } from "../value_objects/preview_record";
import { Publisher } from "../entities/publisher";
import { ServiceRecord } from "../entities/service_record";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";

dayjs.extend(customParseFormat);
export class PreviewRecordMapper {
  static toServiceRecord(previewRecord: PreviewRecord): ServiceRecord {
    const publisher = Publisher.create({
      firstName: previewRecord.firstName,
      lastName: previewRecord.lastName,
    });

    const serviceMonth = dayjs(
      previewRecord.serviceMonth,
      "MMMM YYYY"
    ).toDate();

    console.log({
      before: previewRecord.serviceMonth,
      after: serviceMonth,
    });

    return ServiceRecord.create({
      bibleStudies: previewRecord.bibleStudies ?? 0,
      serviceMonth,
      creditHours: previewRecord.creditHours ?? undefined,
      serviceHours: previewRecord.serviceHours ?? undefined,
      comments: previewRecord.comments ?? undefined,
      isResolved: false,
      publisher,
    });
  }
}
