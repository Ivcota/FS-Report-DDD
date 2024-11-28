import { FieldServiceGroup } from "../../domain/entities/field_service_group";
import { FieldServiceGroupMapper } from "../../application/mappers/field_service_group_mapper";
import { IFieldServiceGroupRepository } from "../../domain/infra_ports/field_service_group_repository";
import { PrismaClient } from "@prisma/client";

export class FieldServiceGroupRepository
  implements IFieldServiceGroupRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async save(fieldServiceGroup: FieldServiceGroup): Promise<FieldServiceGroup> {
    const fieldServiceGroupCreated = await this.prisma.fieldServiceGroup.create(
      {
        data: FieldServiceGroupMapper.toPersistence(fieldServiceGroup),
      }
    );
    return FieldServiceGroupMapper.toDomain(fieldServiceGroupCreated);
  }

  async delete(fieldServiceGroup: FieldServiceGroup): Promise<void> {
    await this.prisma.fieldServiceGroup.delete({
      where: { id: fieldServiceGroup.id },
    });
  }

  async findById(id: string): Promise<FieldServiceGroup | undefined> {
    const fieldServiceGroup = await this.prisma.fieldServiceGroup.findUnique({
      where: { id },
    });
    return fieldServiceGroup
      ? FieldServiceGroupMapper.toDomain(fieldServiceGroup)
      : undefined;
  }

  async findByUserOwnerId(userOwnerId: string): Promise<FieldServiceGroup[]> {
    const fieldServiceGroups = await this.prisma.fieldServiceGroup.findMany({
      where: { userOwnerId },
    });
    return fieldServiceGroups.map(FieldServiceGroupMapper.toDomain);
  }
}
