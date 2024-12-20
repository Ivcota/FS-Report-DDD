import {
  Publisher as PrismaPublisher,
  ServiceRecord as PrismaServiceRecord,
} from "@prisma/client";

import { CommitServiceRecord } from "../use_cases/commit_service_records/commit_service_records_dto";
import { Publisher } from "@/module/service_report/domain/entities/publisher";
import { ServiceRecord } from "@/module/service_report/domain/entities/service_record";
import { SimplifiedServiceRecord } from "../use_cases/parse_service_records/parse-service_records_dto";
import { v4 as uuidv4 } from "uuid";

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
      fieldServiceGroupId: serviceRecord.fieldServiceGroupId ?? null,
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
      fieldServiceGroupId: serviceRecord.fieldServiceGroupId ?? undefined,
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

  static fromCommitServiceRecord(
    serviceRecord: CommitServiceRecord
  ): ServiceRecord {
    return ServiceRecord.create({
      id: serviceRecord.id,
      bibleStudies: serviceRecord.bibleStudies ?? 0,
      serviceMonth: new Date(serviceRecord.serviceMonth),
      creditHours: serviceRecord.creditHours ?? undefined,
      serviceHours: serviceRecord.serviceHours ?? undefined,
      comments: serviceRecord.comments ?? undefined,
      isResolved: serviceRecord.isResolved ?? false,
      publisher: Publisher.create({
        firstName: serviceRecord.firstName,
        lastName: serviceRecord.lastName,
      }),
    });
  }

  static toEmptyDomain(
    publisher: PrismaPublisher,
    date: Date = new Date()
  ): ServiceRecord {
    return ServiceRecord.create({
      id: uuidv4(),
      bibleStudies: 0,
      serviceMonth: date,
      creditHours: undefined,
      serviceHours: undefined,
      comments: undefined,
      isResolved: false,
      createdAt: date,
      placeholder: true,
      publisher: Publisher.create({
        id: publisher.id,
        firstName: publisher.firstName,
        lastName: publisher.lastName,
        email: publisher.email ?? undefined,
        phoneNumber: publisher.phoneNumber ?? undefined,
        createdAt: publisher.createdAt ?? undefined,
      }),
    });
  }

  static toSimplifiedServiceRecord(
    serviceRecord: ServiceRecord
  ): SimplifiedServiceRecord {
    return {
      id: serviceRecord.id,
      firstName: serviceRecord.publisher?.name.firstName ?? "",
      lastName: serviceRecord.publisher?.name.lastName ?? "placeholder-foo",
      serviceMonth: serviceRecord.serviceMonth.monthStart.toISOString(),
      createdAt: serviceRecord.createdAt.toISOString(),
      bibleStudies: serviceRecord.bibleStudies,
      isResolved: serviceRecord.isResolved,
      creditHours: serviceRecord.creditHours ?? undefined,
      serviceHours: serviceRecord.serviceHours ?? undefined,
      comments: serviceRecord.comments ?? undefined,
      placeholder: serviceRecord.placeholder,
    };
  }
}
