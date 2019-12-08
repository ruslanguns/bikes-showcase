import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { BikesModule } from './src/bikes';
import { MONGO_URI } from './config/constants';
import { SettingsModule } from './src/settings';
import { AuthModule } from './src/auth/auth.module';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require('../server/main'),
      liveReload: true
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: MONGO_URI,
        authSource: 'admin',
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }),
    }),
    BikesModule,
    SettingsModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class ApplicationModule { }
