import {
  Publisher as PrismaPublisher,
  ServiceRecord as PrismaServiceRecord,
} from "@prisma/client";

import { Publisher } from "@/domain/service_report/entities/publisher";
import { ServiceRecord } from "@/domain/service_report/entities/service_record";
import { SimplifiedServiceRecord } from "../use_cases/parse_service_records/parse-service_records_dto";

export class ServiceRecordMapper {
  static toPersistence(serviceRecord: ServiceRecord): PrismaServiceRecord {
    return {
      id: serviceRecord.id,
      serviceMonth: serviceRecord.serviceMonth.monthStart,
      bibleStudies: serviceRecord.bibleStudies,
      creditHours: serviceRecord.creditHours ?? null,
      serviceHours: serviceRecord.serviceHours ?? null,
      comments: serviceRecord.comments ?? null,
      isResolved: serviceRecord.isResolved,
      createdAt: serviceRecord.createdAt,
      publisherId: serviceRecord.publisher?.id ?? null,
    };
  }

  static toDomain(
    serviceRecord: PrismaServiceRecord,
    publisher?: PrismaPublisher | null
  ): ServiceRecord {
    return ServiceRecord.create({
      id: serviceRecord.id,
      bibleStudies: serviceRecord.bibleStudies,
      serviceMonth: serviceRecord.serviceMonth,
      creditHours: serviceRecord.creditHours ?? undefined,
      serviceHours: serviceRecord.serviceHours ?? undefined,
      comments: serviceRecord.comments ?? undefined,
      isResolved: serviceRecord.isResolved,
      createdAt: serviceRecord.createdAt,
      publisher: publisher
        ? Publisher.create({
            id: publisher.id,
            firstName: publisher.firstName,
            lastName: publisher.lastName,
            email: publisher.email ?? undefined,
            phoneNumber: publisher.phoneNumber ?? undefined,
            createdAt: publisher.createdAt ?? undefined,
          })
        : undefined,
    });
  }

  static toSimplifiedServiceRecord(
    serviceRecord: ServiceRecord
  ): SimplifiedServiceRecord {
    return {
      id: serviceRecord.id,
      firstName: serviceRecord.publisher?.firstName ?? "",
      lastName: serviceRecord.publisher?.lastName ?? "",
      serviceMonth: serviceRecord.serviceMonth.monthStart.toString(),
      createdAt: serviceRecord.createdAt.toISOString(),
      bibleStudies: serviceRecord.bibleStudies,
      isResolved: serviceRecord.isResolved,
      creditHours: serviceRecord.creditHours ?? undefined,
      serviceHours: serviceRecord.serviceHours ?? undefined,
      comments: serviceRecord.comments ?? undefined,
    };
  }
}
