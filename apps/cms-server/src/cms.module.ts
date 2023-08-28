import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { UserModule } from './user/user.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [UserModule, RewardModule],
  controllers: [CmsController],
  providers: [CmsService],
})
export class CmsModule {}
