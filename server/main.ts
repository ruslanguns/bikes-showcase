import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from './src/config/config.service';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(ApplicationModule);
  const configService = app.get(ConfigService);
  const host = configService.get<string>('HOST');
  const port = configService.get<number>('PORT');

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('API de Bikes Showcase')
    .setDescription('Documentación API de la API del Catálogo de Bicicletas')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  this.logger.log(`Documentación API: http://${host}${(port) ? `:${port}` : ''}/docs`);

  // Initialize express sessions, and have Passport use them
  app.use(passport.initialize());
  app.use(passport.session());


  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);

  this.logger.log(`Aplicación corriendo en: http://${host}${(port) ? `:${port}` : ''}/`);
}
bootstrap();
