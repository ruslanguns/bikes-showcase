import { Module } from '@nestjs/common';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BikesSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Bikes', schema: BikesSchema }
    ]),
  ],
  controllers: [BikesController],
  providers: [BikesService]
})
export class BikesModule { }
