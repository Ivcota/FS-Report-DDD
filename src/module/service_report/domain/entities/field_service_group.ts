import { Entity } from "@/module/shared/domain/entity";
import { v4 as uuidv4 } from "uuid";

type FieldServiceGroupProps = {
  id?: string;
  name: string;
  userOwnerId: string;
  createdAt?: Date;
};

export class FieldServiceGroup extends Entity {
  name: string;
  userOwnerId: string;
  createdAt: Date;

  constructor(input: FieldServiceGroupProps) {
    super(input.id ?? uuidv4());
    this.name = input.name.trim();
    this.userOwnerId = input.userOwnerId.trim();
    this.createdAt = input.createdAt ?? new Date();
  }

  static create(input: FieldServiceGroupProps): FieldServiceGroup {
    if (!input.name || !input.userOwnerId) {
      throw new Error("Name and user owner ID are required");
    }

    if (input.name.length > 255) {
      throw new Error("Name cannot be longer than 255 characters");
    }

    return new FieldServiceGroup(input);
  }
}
