import { Test, TestingModule } from '@nestjs/testing';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('ApiGatewayController', () => {
  let apiGatewayController: ApiGatewayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        ClientsModule.register([
          {
            name: 'CMS_SERVICE',
            transport: Transport.TCP,
            options: { host: 'localhost', port: 3001 },
          },
        ]),
      ],
      controllers: [ApiGatewayController],
      providers: [ApiGatewayService, JwtService],
    }).compile();

    apiGatewayController = app.get<ApiGatewayController>(ApiGatewayController);
  });

  describe('root', () => {
    it('should return "Hello World from API Gateway!"', () => {
      expect(apiGatewayController.getHello()).toBe(
        'Hello World from API Gateway!',
      );
    });
  });
});
