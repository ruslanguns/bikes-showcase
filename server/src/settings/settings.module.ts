import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { SettingsSchema } from './schemas';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Settings', schema: SettingsSchema }
    ]),
    AuthModule,
  ],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule { }
