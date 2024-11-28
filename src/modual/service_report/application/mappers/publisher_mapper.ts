import { Publisher as PrismaPublisher } from "@prisma/client";
import { Publisher } from "@/modual/service_report/domain/entities/publisher";

export class PublisherMapper {
  static toPersistence(publisher: Publisher): PrismaPublisher {
    return {
      id: publisher.id,
      firstName: publisher.firstName,
      lastName: publisher.lastName,
      email: publisher.email ?? null,
      phoneNumber: publisher.phoneNumber ?? null,
      createdAt: publisher.createdAt,
    };
  }

  static toDomain(publisher: PrismaPublisher): Publisher {
    return Publisher.create({
      id: publisher.id,
      firstName: publisher.firstName,
      lastName: publisher.lastName,
      email: publisher.email ?? undefined,
      phoneNumber: publisher.phoneNumber ?? undefined,
      createdAt: publisher.createdAt,
    });
  }
}
