import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomError } from '../utils/exception.util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let request = null;
    let token = null;

    switch (context.getType()) {
      case 'http':
        request = context.switchToHttp().getRequest();
        token = this.extractTokenFromHeader(request);
        break;
      case 'rpc':
        request = context.switchToRpc().getData();
        token = this.extractTokenFromRpc(request);
        break;
      case 'ws':
        request = context.switchToWs().getClient();
        break;
      default:
        break;
    }

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.verifyUser(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers

      request.user = payload;
    } catch (error) {
      return CustomError(HttpStatus.UNAUTHORIZED, error.message);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromRpc(request: Request) {
    console.log('rpc call here');
    return request;
  }

  private verifyUser(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
