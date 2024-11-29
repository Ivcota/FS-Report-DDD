import { FieldServiceGroup } from "../entities/field_service_group";

export interface IFieldServiceGroupRepository {
  save(fieldServiceGroup: FieldServiceGroup): Promise<FieldServiceGroup>;
  delete(fieldServiceGroup: FieldServiceGroup): Promise<void>;
  findById(id: string): Promise<FieldServiceGroup | undefined>;
  findByUserOwnerId(
    userOwnerId: string
  ): Promise<FieldServiceGroup | undefined>;
}
