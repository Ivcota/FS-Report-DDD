import { ClientUser } from "@/module/user/application/user_cases/authorize_user/authorize_user_dtos";
import { User as PrismaUser } from "@prisma/client";
import { Role } from "../../domain/value_objects/Role";
import { User } from "../../domain/entities/User";

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
  static toClient(user: User): ClientUser {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role.name,
    };
  }
}
