import { IServiceRecordRepository } from "./repo_types";
import { Month } from "@/domain/service_report/value_objects/month";
import { PrismaClient } from "@prisma/client";
import { PublisherMapper } from "@/application/service_report/mappers/publisher_mapper";
import { ServiceRecord } from "@/domain/service_report/entities/service_record";
import { ServiceRecordMapper } from "@/application/service_report/mappers/service_record_mapper";

export class ServiceRecordRepository implements IServiceRecordRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<ServiceRecord | undefined> {
    const serviceRecord = await this.prisma.serviceRecord.findUnique({
      where: { id },
    });

    if (!serviceRecord) throw new Error("Service record not found");

    const publisher = await this.prisma.publisher.findUnique({
      where: { id: serviceRecord.publisherId ?? undefined },
    });

    return ServiceRecordMapper.toDomain(serviceRecord, publisher);
  }

  async save(serviceRecord: ServiceRecord): Promise<void> {
    let publisherId = serviceRecord.publisher?.id;

    if (serviceRecord.publisher) {
      const existingPublisher = await this.prisma.publisher.findUnique({
        where: { id: serviceRecord.publisher.id },
      });

      if (!existingPublisher) {
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
    });

    return serviceRecords.map((serviceRecord) =>
      ServiceRecordMapper.toDomain(serviceRecord)
    );
  }

  async findByPublisherId(publisherId: string): Promise<ServiceRecord[]> {
    const serviceRecords = await this.prisma.serviceRecord.findMany({
      where: { publisherId },
    });

    return serviceRecords.map((serviceRecord) =>
      ServiceRecordMapper.toDomain(serviceRecord)
    );
  }

  async findAll(): Promise<ServiceRecord[]> {
    const serviceRecords = await this.prisma.serviceRecord.findMany();

    return serviceRecords.map((serviceRecord) =>
      ServiceRecordMapper.toDomain(serviceRecord)
    );
  }
}
