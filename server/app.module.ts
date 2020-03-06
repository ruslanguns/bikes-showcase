import { Module, forwardRef } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { ConfigModule, ConfigService } from './src/config';
import { BikesModule } from './src/bikes';
import { SettingsModule } from './src/settings';
import { AuthModule } from './src/auth';


@Module({
  imports: [
    ConfigModule,
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => (config.mongooseOptions()),
      inject: [ConfigService],
    }),
    BikesModule,
    AuthModule,
    SettingsModule
  ],
})
export class ApplicationModule { }
