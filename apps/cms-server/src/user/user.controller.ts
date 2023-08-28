import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('get_user_by_username')
  getUserByUsername(@Payload() msg: any) {
    return this.userService.getUserByUsername(msg.username);
  }
  @MessagePattern('get_users')
  getUsers() {
    return this.userService.getUsers();
  }

  @MessagePattern('get_user_by_id')
  getUserById(@Payload() msg: any) {
    return this.userService.getUser(msg.id);
  }

  @MessagePattern('get_user')
  getUser(@Payload() msg: any) {
    return this.userService.getUser(msg.userId);
  }

  @MessagePattern('create_user')
  createUser(@Payload() msg: any) {
    return this.userService.createUser(msg);
  }
}
