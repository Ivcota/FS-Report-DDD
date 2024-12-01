import { ClientUser } from "@/module/user/application/use_cases/authorize_user/authorize_user_dtos";
import { Email } from "@/module/shared/domain/value_objects/Email";
import { Name } from "@/module/shared/domain/value_objects/Name";
import { Password } from "@/module/user/domain/value_objects/Password";
import { User as PrismaUser } from "@prisma/client";
import { Role } from "@/module/user/domain/value_objects/Role";
import { User } from "@/module/user/domain/entities/User";

export class UserMapper {
  static toPersistence(user: User): PrismaUser {
    return {
      id: user.id,
      firstName: user.name.firstName,
      lastName: user.name.lastName ?? null,
      email: user.email.value,
      password: user.password.value,
      role: user.role.name,
      createdAt: user.createdAt,
    };
  }

  static toDomain(user: PrismaUser): User {
    return new User(
      user.id,
      Email.create(user.email),
      Password.fromHash(user.password),
      Name.create(user.firstName, user.lastName ?? undefined),
      Role.create(user.role),
      user.createdAt
    );
  }
  static toClient(user: User): ClientUser {
    return {
      id: user.id,
      firstName: user.name.firstName,
      lastName: user.name.lastName,
      email: user.email.value,
      role: user.role.name,
    };
  }
}
