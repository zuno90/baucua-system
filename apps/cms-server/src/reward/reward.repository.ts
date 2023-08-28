import { PrismaService } from '@app/global';
import { Injectable } from '@nestjs/common';
import { Prisma, Reward } from '@prisma/client';

@Injectable()
export class RewardRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(arg: { data: Prisma.RewardCreateInput }): Promise<Reward> {
    const { data } = arg;
    return this.prismaService.reward.create({ data });
  }

  async getAll(arg: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RewardWhereUniqueInput;
    where?: Prisma.RewardWhereInput;
    orderBy?: Prisma.RewardOrderByWithRelationInput;
  }): Promise<Reward[]> {
    const { skip, take, cursor, where, orderBy } = arg;
    const rewards = await this.prismaService.reward.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
    return rewards;
  }
}
