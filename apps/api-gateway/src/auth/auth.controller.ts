import {
  UseInterceptors,
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { AuthService } from './auth.service';
import { TransformInterceptor } from '../utils/response.util';
import { GrpcMethod } from '@nestjs/microservices';
import { IJwtRequest } from '../__types__/auth-grpc.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(TransformInterceptor)
  @Post('signup')
  signUp(@Body() userDto: UserDto) {
    return this.authService.signUp(userDto);
  }

  @UseInterceptors(TransformInterceptor)
  @Post('signin')
  signIn(@Body() userDto: UserDto) {
    return this.authService.signIn(userDto);
  }

  @GrpcMethod('Auth', 'CheckAuth')
  checkAuth(data: IJwtRequest) {
    return this.authService.checkAuthFromGrpcJwt(data.jwt);
  }
}
