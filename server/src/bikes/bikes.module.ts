import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SettingsSchema } from '../settings/schemas';
import { BikesSchema } from './schemas';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
import { BikesGateway } from './bikes.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Bikes', schema: BikesSchema },
      { name: 'Settings', schema: SettingsSchema }
    ]),
    AuthModule,
  ],
  controllers: [BikesController],
  providers: [BikesService, BikesGateway]
})
export class BikesModule { }
