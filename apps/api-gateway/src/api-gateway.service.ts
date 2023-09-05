import { HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, firstValueFrom, map, tap } from 'rxjs';
import { CustomError } from './utils/exception.util';
import { AuthService } from './auth/auth.service';

interface IAuthService {
  CheckAuth(data: { jwt: string }): Observable<any>;
}

@Injectable()
export class ApiGatewayService implements OnModuleInit {
  private authClient: IAuthService;

  constructor(
    @Inject('CMS_SERVICE') private readonly cmsClient: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly grpcClient: ClientGrpc,
    private readonly authService: AuthService,
  ) {}

  onModuleInit() {
    this.authClient = this.grpcClient.getService<IAuthService>('Auth');
  }

  getUser(id: number) {
    return this.authService.getUser(id);
  }

  checkAuth(jwt: string) {
    return this.authClient.CheckAuth({ jwt }).pipe(
      tap((res) => res),
      catchError((err) => CustomError(HttpStatus.BAD_REQUEST, err.code)),
    );
  }
}
