import { Injectable } from '@nestjs/common';
import { RewardRepository } from './reward.repository';

@Injectable()
export class RewardService {
  constructor(private readonly rewardRepository: RewardRepository) {}

  async getRewards(userId: number) {
    return this.rewardRepository.getAll({ where: { userId } });
  }
}
