import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { BikesModule } from './src/bikes';
import { ConfigModule, ConfigService } from './src/config';
import { SettingsModule } from './src/settings';
import { AuthModule } from './src/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => (config.mongooseOptions()),
      inject: [ConfigService],
    }),
    BikesModule,
    SettingsModule,
    AuthModule
  ],
  providers: []
})
export class ApplicationModule { }
