import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { RewardRepository } from './reward.repository';
import { PrismaModule } from '@app/global';

@Module({
  imports: [PrismaModule],
  controllers: [RewardController],
  providers: [RewardService, RewardRepository],
})
export class RewardModule {}
