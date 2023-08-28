import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CmsService } from './cms.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post()
  test(@Body() body: any, @Req() req: Request) {
    console.log('body from proxy auth', body);
    return { success: true, method: 'POST' };
  }

  // send_user
  @EventPattern('send_user_event')
  getEventUser(@Payload() message: any) {
    console.log('event received from api gateway', message);
  }

  @MessagePattern('send_user_message')
  getMessageUser(@Payload() message: any) {
    console.log('message received from api gateway', message);
    return 'CMS service received message. Thanks!';
  }
}
