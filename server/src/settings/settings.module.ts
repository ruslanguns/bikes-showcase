import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingsSchema } from './schemas';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Settings', schema: SettingsSchema }
    ]),
  ],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule { }
