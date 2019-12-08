import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MONGO_URI } from './config/constants';
import * as passport from 'passport';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log(MONGO_URI, 'DB URI');
  const app = await NestFactory.create(ApplicationModule);

  app.setGlobalPrefix('api');

  // Initialize express sessions, and have Passport use them
  app.use(passport.initialize());
  app.use(passport.session());


  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4200);
}
bootstrap();
