import {
  UseInterceptors,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { AuthGuard } from './jwt-guard/auth.guard';
import { TransformInterceptor } from './utils/response.util';
import { CurrentUser } from './utils/user.decorator';
import { User } from '@prisma/client';

@Controller()
@UseInterceptors(TransformInterceptor)
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  @UseGuards(AuthGuard)
  getHello(@CurrentUser() user: User) {
    // return this.apiGatewayService.getHello(user);
  }

  @Get('cms/users')
  @UseGuards(AuthGuard)
  getUsers(@CurrentUser() user: User) {
    // return this.apiGatewayService.getUsers(user.id);
  }

  @Get('cms/user/:id')
  @UseGuards(AuthGuard)
  getUserById(@CurrentUser() user: User, @Param() { id }: { id: number }) {
    // return this.apiGatewayService.getUserById(id, user.id);
  }

  // get user info
  @Get('cms/user')
  @UseGuards(AuthGuard)
  getUser(@CurrentUser() user: User) {
    return this.apiGatewayService.getUser(user.id);
  }

  @Get('cms/rewards')
  @UseGuards(AuthGuard)
  getRewards(@CurrentUser() user: User) {
    // return this.apiGatewayService.getRewards(user.id);
  }

  @Get('hello')
  getU() {
    return this.apiGatewayService.checkAuth('zuno90000000');
  }
}
