import { IUserRepository } from "@/domain/user/infra_ports/user_repository";
import { PrismaClient } from "@prisma/client";
import { User } from "@/domain/user/entities/User";
import { UserMapper } from "@/application/user/mappers/user_mapper";

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email: { equals: email } },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    });
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: UserMapper.toPersistence(user),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
