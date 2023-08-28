import { PrismaService } from '@app/global';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(arg: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = arg;
    return this.prismaService.user.create({ data });
  }

  async getAll(arg: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = arg;
    const users = await this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return users;
  }

  async get(arg: {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User> {
    const { where, orderBy } = arg;
    const user = await this.prismaService.user.findFirst({ where, orderBy });
    return user;
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prismaService.user.update({ where, data });
  }

  async delete(params: { where: Prisma.UserWhereUniqueInput }): Promise<User> {
    const { where } = params;
    return this.prismaService.user.delete({ where });
  }
}

// Exclude keys from user
// function exclude<User, Key extends keyof User>(
//   user: User,
//   keys: Key,
// ): Omit<User, Key> {
//   return Object.fromEntries(
//     Object.entries(user).filter(([key]) => !keys.includes(key)),
//   );
// }
