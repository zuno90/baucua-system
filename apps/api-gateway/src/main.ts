import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WsAdapter } from '@nestjs/platform-ws';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { log } from 'util';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const PORT = +configService.get<string>('PORT');
  // app.useWebSocketAdapter(new WsAdapter(app));
  // app.use(
  //   createProxyMiddleware({
  //     target: 'ws://localhost:5005',
  //     ws: true,
  //     changeOrigin: true,
  //     secure: false,
  //     pathRewrite: { '/ws': '/ws' },
  //     onProxyReq: (proxyReq, req, res) => {
  //       if (req.headers.upgrade) {
  //         proxyReq.setHeader('Connection', 'Upgrade');
  //         proxyReq.setHeader('Upgrade', req.headers.upgrade);
  //       }
  //     },
  //   }),
  // );
  app.enableCors();
  // connect grpc
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      url: configService.get<string>('GRPC_URL'),
      protoPath: join(__dirname, '../../../../proto/auth.proto'),
      loader: { arrays: true, objects: true },
    },
  });
  await app.startAllMicroservices();
  await app.listen(PORT);
}
bootstrap();
