import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigManagerModule } from '@nestjsplus/config';
import { join } from 'path';
import { FileSettingsService } from './file-settings.service';

@Global()
@Module({
  imports: [
    ConfigManagerModule.register({
      // envKey: 'BIKES',
      // useEnv: {
      //   folder: join(__dirname, '../../../../config'),
      // }
      useFile: join(__dirname, '../../../../config/development.env'),
    }),
  ],
  providers: [ConfigService, FileSettingsService],
  exports: [ConfigService, FileSettingsService],
})
export class ConfigModule { }
