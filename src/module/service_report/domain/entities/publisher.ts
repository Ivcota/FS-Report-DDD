import { AggregateRoot } from "@/module/shared/domain/aggregate_root";
import { Email } from "@/module/shared/domain/value_objects/Email";
import { Name } from "@/module/shared/domain/value_objects/Name";
import { v4 as uuidv4 } from "uuid";

type PublisherProps = {
  id?: string;
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  createdAt?: Date;
};

export class Publisher extends AggregateRoot {
  name: Name;
  email?: Email;
  phoneNumber?: string;
  createdAt: Date;

  private constructor(input: PublisherProps) {
    super(input.id ?? uuidv4());
    this.name = Name.create(input.firstName, input.lastName);
    this.email = input.email ? Email.create(input.email) : undefined;
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
