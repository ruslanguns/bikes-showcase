import { Injectable, BadGatewayException, OnModuleInit, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISettings } from './interfaces';
import { SettingDto } from './dtos/settings.dto';
import { Defaults } from '../../config/constants';
import * as crypto from 'crypto';

@Injectable()
export class SettingsService implements OnModuleInit {

  logger = new Logger('SettingsModule');

  constructor(
    @InjectModel('Settings') private readonly settingsModel: Model<ISettings>,
  ) { }

  async onModuleInit() {
    const adminUser = await this.settingsModel.findOne({ username: Defaults.user.username });

    if (!adminUser) {
      await this.settingsModel.create({
        username: Defaults.user.username,
        password: Defaults.user.password
      });
      this.logger.warn('Default user has been setup. Remember to change its password for a secured one.');
    } else {
      this.logger.log('User already setup.');
    }
  }

  async update(dto: SettingDto) {
    if (dto.password) { dto.password = await crypto.createHmac('sha256', dto.password).digest('hex'); }
    return await this.settingsModel.findOneAndUpdate({ username: Defaults.user.username }, dto, { new: true, runValidators: true })
      .catch(err => { throw new BadGatewayException('Error al modificar en DB', err); });
  }
}
