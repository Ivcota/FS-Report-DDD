import { IServiceRecordRepository } from "@/module/service_report/domain/infra_ports/service_record_repository";
import { Month } from "@/module/service_report/domain/value_objects/month";
import { PrismaClient } from "@prisma/client";
import { PublisherMapper } from "@/module/service_report/application/mappers/publisher_mapper";
import { ServiceRecord } from "@/module/service_report/domain/entities/service_record";
import { ServiceRecordMapper } from "@/module/service_report/application/mappers/service_record_mapper";

export class ServiceRecordRepository implements IServiceRecordRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<ServiceRecord | undefined> {
    const serviceRecord = await this.prisma.serviceRecord.findUnique({
      where: { id },
      include: { publisher: true },
    });

    if (!serviceRecord) throw new Error("Service record not found");

    return ServiceRecordMapper.toDomain(serviceRecord, serviceRecord.publisher);
  }

  async save(serviceRecord: ServiceRecord): Promise<void> {
    let publisherId = serviceRecord.publisher?.id;

    if (serviceRecord.publisher) {
      let existingPublisher = await this.prisma.publisher.findUnique({
        where: { id: serviceRecord.publisher.id },
      });

      if (!existingPublisher) {
        existingPublisher = await this.prisma.publisher.findFirst({
          where: {
            firstName: {
              equals: serviceRecord.publisher.name.firstName,
              mode: "insensitive",
            },
            lastName: {
              equals: serviceRecord.publisher.name.lastName,
              mode: "insensitive",
            },
          },
        });
      }

      if (existingPublisher) {
        publisherId = existingPublisher.id;
      } else {
        const newPublisher = await this.prisma.publisher.create({
          data: PublisherMapper.toPersistence(serviceRecord.publisher),
        });
        publisherId = newPublisher.id;
      }
    }

    const serviceRecordData = {
      ...ServiceRecordMapper.toPersistence(serviceRecord),
      publisherId,
    };

    await this.prisma.serviceRecord.upsert({
      where: { id: serviceRecord.id },
      update: serviceRecordData,
      create: serviceRecordData,
    });
  }

  async findByMonth(month: Month): Promise<ServiceRecord[]> {
    const serviceRecords = await this.prisma.serviceRecord.findMany({
      where: { serviceMonth: month.monthStart },
      include: { publisher: true },
    });

    return serviceRecords.map((serviceRecord) =>
      ServiceRecordMapper.toDomain(serviceRecord, serviceRecord.publisher)
    );
  }

  async findAllEmptyAndPopulatedRecordsForGivenMonth(
    month: Month,
    fieldServiceGroupId: string
  ): Promise<ServiceRecord[]> {
    const serviceRecords = await this.prisma.serviceRecord.findMany({
      where: { serviceMonth: month.monthStart, fieldServiceGroupId },
    });

    const publishers = await this.prisma.publisher.findMany({
      where: {
        serviceRecords: {
          some: {
            fieldServiceGroupId,
          },
        },
      },
    });

    const populatedRecords = serviceRecords.filter(
      (serviceRecord) => serviceRecord.publisherId !== null
    );

    const publishers_without_service_record_for_this_month = publishers.filter(
      (publisher) =>
        !populatedRecords.some(
          (serviceRecord) => serviceRecord.publisherId === publisher.id
        )
    );

    const populatedDomainRecords = populatedRecords.map((serviceRecord) => {
      const publisher = publishers.find(
        (publisher) => publisher.id === serviceRecord.publisherId
      );
      return ServiceRecordMapper.toDomain(serviceRecord, publisher);
    });

    const emptyDomainRecords =
      publishers_without_service_record_for_this_month.map((publisher) =>
        ServiceRecordMapper.toEmptyDomain(publisher, month.monthStart)
      );

    return [...populatedDomainRecords, ...emptyDomainRecords];
  }

  async findByPublisherId(publisherId: string): Promise<ServiceRecord[]> {
    const serviceRecords = await this.prisma.serviceRecord.findMany({
      where: { publisherId },
      include: { publisher: true },
    });

    return serviceRecords.map((serviceRecord) =>
      ServiceRecordMapper.toDomain(serviceRecord, serviceRecord.publisher)
    );
  }

  async findAll(): Promise<ServiceRecord[]> {
    const serviceRecords = await this.prisma.serviceRecord.findMany({
      include: { publisher: true },
    });

    return serviceRecords.map((serviceRecord) =>
      ServiceRecordMapper.toDomain(serviceRecord, serviceRecord.publisher)
    );
  }
  async delete(id: string): Promise<void> {
    await this.prisma.serviceRecord.delete({
      where: { id },
    });
  }
}
