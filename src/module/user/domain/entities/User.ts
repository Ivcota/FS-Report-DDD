import { AggregateRoot } from "@/module/shared/domain/aggregate_root";
import { Email } from "@/module/shared/domain/value_objects/Email";
import { Name } from "@/module/shared/domain/value_objects/Name";
import { Password } from "@/module/user/domain/value_objects/Password";
import { Role } from "@/module/user/domain/value_objects/Role";
import { UserCreatedEvent } from "../events/user_created_event";
import { v4 as uuidv4 } from "uuid";

export class User extends AggregateRoot {
  constructor(
    public id: string,
    public email: Email,
    public password: Password,
    public name: Name,
    public role: Role,
    public createdAt: Date
  ) {
    super(id);
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
    this.createdAt = createdAt;
  }

  static async create(
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    role: "admin" | "user" = "user"
  ): Promise<User> {
    const user = new User(
      uuidv4(),
      Email.create(email),
      Password.create(password),
      Name.create(firstName, lastName),
      Role.create(role),
      new Date()
    );
    user.addDomainEvent(new UserCreatedEvent(user));
    return user;
  }

  async verifyPassword(password: string): Promise<boolean> {
    return this.password.verify(password);
  }

  async updatePassword(password: string): Promise<void> {
    this.password = Password.create(password);
  }

  updateEmail(email: string): void {
    this.email = Email.create(email);
  }

  updateRole(role: Role): void {
    this.role = role;
  }
}
