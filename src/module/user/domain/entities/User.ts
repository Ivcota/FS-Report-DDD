import { Role } from "../value_objects/Role";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public role: Role = new Role("user"),
    public createdAt: Date
  ) {
    this.id = id;
    this.email = email.toLowerCase().trim();
    this.password = password;
    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
    this.role = role;
    this.createdAt = createdAt;
  }

  static async create(
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    role: Role = new Role("user")
  ): Promise<User> {
    if (!email || !password || !firstName || !lastName) {
      throw new Error(
        `Invalid user data: ${email ?? "Email is not provided"}, ${
          password ? "[REDACTED]" : "Password is not provided"
        }, ${firstName ?? "First name is not provided"}, ${
          lastName ?? "Last name is not provided"
        }`
      );
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(
      password.toString().trim(),
      saltRounds
    );

    return new User(
      uuidv4(),
      email,
      hashedPassword,
      firstName,
      lastName,
      role,
      new Date()
    );
  }

  async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }

  async updatePassword(password: string): Promise<void> {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(password, saltRounds);
  }

  updateEmail(email: string): void {
    this.email = email;
  }

  updateRole(role: Role): void {
    this.role = role;
  }
}
