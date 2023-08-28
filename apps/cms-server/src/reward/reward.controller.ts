import { Controller } from '@nestjs/common';
import { RewardService } from './reward.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @MessagePattern('get_rewards')
  async getRewards(@Payload() msg: any) {
    return this.rewardService.getRewards(msg.userId);
  }
}
