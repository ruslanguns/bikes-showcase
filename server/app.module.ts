import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';
import { BikesModule } from './src/bikes';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URI } from './config/constants';

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
    BikesModule
  ],
  controllers: []
})
export class ApplicationModule { }
