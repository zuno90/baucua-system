import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from '@app/global';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService = AuthService;

  beforeEach(async () => {
    const modRef: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    authService = modRef.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
});
