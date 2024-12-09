import { Email } from "@/module/shared/domain/value_objects/Email";
import { IPublisherRepository } from "@/module/service_report/domain/infra_ports/publisher_repository";
import { PrismaClient } from "@prisma/client";
import { Publisher } from "@/module/service_report/domain/entities/publisher";
import { PublisherMapper } from "../../application/mappers/publisher_mapper";

export class PublisherRepository implements IPublisherRepository {
  constructor(private prisma: PrismaClient) {}

  async save(publisher: Publisher): Promise<void> {
    const existingPublisher = await this.prisma.publisher.findFirst({
      where: {
        id: publisher.id,
      },
    });

    if (existingPublisher) {
      await this.prisma.publisher.update({
        where: { id: publisher.id },
        data: PublisherMapper.toPersistence(publisher),
      });
    } else {
      await this.prisma.publisher.create({
        data: PublisherMapper.toPersistence(publisher),
      });
    }
  }

  async findById(id: string): Promise<Publisher | undefined> {
    const publisher = await this.prisma.publisher.findUnique({
      where: { id },
    });

    if (!publisher) throw new Error("Publisher not found");

    return PublisherMapper.toDomain(publisher);
  }

  async findByEmail(email: Email): Promise<Publisher | undefined> {
    const publisher = await this.prisma.publisher.findFirst({
      where: {
        email: {
          equals: email.value,
          mode: "insensitive",
        },
      },
    });

    if (!publisher) throw new Error("Publisher not found");

    return PublisherMapper.toDomain(publisher);
  }

  async findByFirstNameAndLastName(
    firstName: string,
    lastName: string
  ): Promise<Publisher | undefined> {
    const publisher = await this.prisma.publisher.findFirst({
      where: {
        firstName: {
          equals: firstName,
          mode: "insensitive",
        },
        lastName: {
          equals: lastName,
          mode: "insensitive",
        },
      },
    });

    if (!publisher) return undefined;

    return PublisherMapper.toDomain(publisher);
  }

  async delete(publisher: Publisher): Promise<void> {
    await this.prisma.publisher.delete({
      where: { id: publisher.id },
    });
  }
}
