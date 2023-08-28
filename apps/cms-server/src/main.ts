import { NestFactory } from '@nestjs/core';
import { CmsModule } from './cms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(CmsModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3001 },
  });
  await app.startAllMicroservices();
  // await app.listen(3001);
}
bootstrap();
