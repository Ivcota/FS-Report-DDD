import { Entity } from "@/module/shared/domain/entity";
import { v4 as uuidv4 } from "uuid";

type PublisherProps = {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  createdAt?: Date;
};

export class Publisher extends Entity {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  createdAt: Date;

  private constructor(input: PublisherProps) {
    super(input.id ?? uuidv4());
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.email = input.email;
    this.phoneNumber = input.phoneNumber;
    this.createdAt = input.createdAt ?? new Date();
  }

  static create(input: PublisherProps): Publisher {
    if (!input.firstName || !input.lastName) {
      throw new Error("First and last name are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input.email && !emailRegex.test(input.email)) {
      throw new Error("Invalid email format");
    }

    input.firstName = input.firstName.trim();
    input.lastName = input.lastName.trim();
    input.email = input.email?.trim();
    input.phoneNumber = input.phoneNumber?.trim();

    return new Publisher(input);
  }
}
