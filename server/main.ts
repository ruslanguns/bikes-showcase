import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MONGO_URI } from './config/constants';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log(MONGO_URI, 'DB URI');
  const app = await NestFactory.create(ApplicationModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4200);
}
bootstrap();
