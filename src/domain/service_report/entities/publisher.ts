import { v4 as uuidv4 } from "uuid";
type PublisherProps = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
};

export class Publisher {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  createdAt: Date;

  private constructor(input: PublisherProps) {
    this.id = uuidv4();
    this.firstName = input.firstName;
    this.lastName = input.lastName;
    this.email = input.email;
    this.phoneNumber = input.phoneNumber;
    this.createdAt = new Date();
  }

  static create(input: PublisherProps): Publisher {
    if (!input.firstName || !input.lastName) {
      throw new Error("First and last name are required");
    }
    return new Publisher(input);
  }
}
