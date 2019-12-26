import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('API de Bikes Showcase')
    .setDescription('Documentación API de la API del Catálogo de Bicicletas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // Initialize express sessions, and have Passport use them
  app.use(passport.initialize());
  app.use(passport.session());


  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4200);
}
bootstrap();
