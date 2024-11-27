import { User as PrismaUser } from "@prisma/client";
import { Role } from "../value_objects/Role";
import { User } from "../entities/User";

export class UserMapper {
  static toPersistence(user: User): PrismaUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role.name,
      createdAt: user.createdAt,
    };
  }

  static toDomain(user: PrismaUser): User {
    return new User(
      user.id,
      user.email,
      user.password,
      user.firstName,
      user.lastName ?? "",
      new Role(user.role),
      user.createdAt
    );
  }
}
