import { FieldServiceGroup } from "../../domain/entities/field_service_group";
import { FieldServiceGroup as FieldServiceGroupPrisma } from "@prisma/client";

export class FieldServiceGroupMapper {
  static toPersistence(
    fieldServiceGroup: FieldServiceGroup
  ): FieldServiceGroupPrisma {
    return {
      id: fieldServiceGroup.id,
      name: fieldServiceGroup.name,
      userOwnerId: fieldServiceGroup.userOwnerId,
      createdAt: fieldServiceGroup.createdAt,
    };
  }

  static toDomain(
    fieldServiceGroup: FieldServiceGroupPrisma
  ): FieldServiceGroup {
    return new FieldServiceGroup({
      id: fieldServiceGroup.id,
      name: fieldServiceGroup.name,
      userOwnerId: fieldServiceGroup.userOwnerId,
      createdAt: fieldServiceGroup.createdAt,
    });
  }
}
