import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomError } from '../utils/exception.util';
import { ClientProxy } from '@nestjs/microservices';
import { tap, catchError, lastValueFrom } from 'rxjs';
import { IUserGrpc } from '../__types__/auth-grpc.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject('CMS_SERVICE') private readonly cmsClient: ClientProxy,
  ) {}

  async signUp(userDto: UserDto) {
    try {
      const user = await this.validateUsername(userDto.username);
      if (user) throw new Error('Username is existed!');
      const hashPassword = await bcrypt.hash(userDto.password, 10);

      const newUser = await lastValueFrom(
        this.cmsClient.send('create_user', {
          username: userDto.username,
          password: hashPassword,
        }),
      );
      delete newUser.password;
      return newUser;
    } catch (error) {
      return CustomError(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async signIn(userDto: UserDto) {
    try {
      const user = await this.validateUsername(userDto.username);
      if (!user || !user.username)
        throw new Error(
          'User is not existed! Please create a new one for logging!',
        );
      const isValidPassword = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (!isValidPassword)
        throw new Error('Username or password is incorrect!');
      const payload = { id: user.id, username: user.username, role: user.role };
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } catch (error) {
      return CustomError(HttpStatus.BAD_REQUEST, error.message);
    }
  }

  async getUser(userId: number) {
    return lastValueFrom(
      this.cmsClient.send('get_user', { userId }).pipe(
        tap((res) => res),
        catchError((err) => CustomError(HttpStatus.BAD_REQUEST, err.code)),
      ),
    );
  }

  async validateUsername(username: string) {
    return lastValueFrom(
      this.cmsClient.send('get_user_by_username', { username }).pipe(
        tap((res) => res),
        catchError((err) => CustomError(HttpStatus.BAD_REQUEST, err.code)),
      ),
    );
  }

  async checkAuthFromGrpcJwt(token: string): Promise<IUserGrpc> {
    try {
      const payload = await this.verifyUser(token);
      const user = await this.getUser(payload.id);
      if (!user) throw Error('Can not parse user!');
      const { id, username, amount, role } = user;
      return {
        id,
        username,
        amount,
        role,
      };
    } catch (error) {
      console.error('err', error);
    }
  }

  private verifyUser(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
