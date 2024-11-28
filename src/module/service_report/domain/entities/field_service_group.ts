import { v4 as uuidv4 } from "uuid";

type FieldServiceGroupProps = {
  id?: string;
  name: string;
  userOwnerId: string;
};

export class FieldServiceGroup {
  id: string;
  name: string;
  userOwnerId: string;
  createdAt: Date;

  constructor(id: string, name: string, userOwnerId: string, createdAt?: Date) {
    this.id = id;
    this.name = name.trim();
    this.userOwnerId = userOwnerId.trim();
    this.createdAt = createdAt ?? new Date();
  }

  static create({
    id,
    name,
    userOwnerId,
  }: FieldServiceGroupProps): FieldServiceGroup {
    if (!name || !userOwnerId) {
      throw new Error("Name and user owner ID are required");
    }

    if (name.length > 255) {
      throw new Error("Name cannot be longer than 255 characters");
    }

    return new FieldServiceGroup(id ?? uuidv4(), name, userOwnerId);
  }
}
