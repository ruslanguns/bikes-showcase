import { Injectable, BadGatewayException, OnModuleInit, Logger, NotAcceptableException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ISettings } from './interfaces';
import { SettingDto } from './dtos/settings.dto';
import { Defaults } from '../../config/constants';
import * as crypto from 'crypto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SettingsService implements OnModuleInit {

  logger = new Logger('SettingsModule');

  constructor(
    @InjectModel('Settings') private readonly settingsModel: Model<ISettings>,
    private readonly authService: AuthService,
  ) { }

  /**
   * Usamos el OnInit para ver si existe un usuario admin configurado.
   * En caso de no estarlo se configura uno por defecto con los settings por defecto.
   */
  async onModuleInit(): Promise<void> {
    const adminUser = await this.settingsModel.findOne({ username: Defaults.user.username });

    if (!adminUser) {
      await this.settingsModel.create({
        username: Defaults.user.username,
        password: Defaults.user.password,
        email: Defaults.user.email
      });
      this.logger.warn('Default user has been setup. Remember to change its password for a secured one.');
    } else {
      this.logger.log('User already setup.');
    }
  }

  /**
   * Obtener configuraciones
   */
  async find(): Promise<ISettings> {
    return await this.settingsModel.findOne().select('-_id, -password, -username').exec();
  }

  /**
   * Modificar configuración
   * @param dto Clase SettingDTO con opciones a modificar
   */
  async update(dto: SettingDto) {

    const { currentPassword: password } = dto;
    const user = await this.authService.validate(password);
    if (!user) { return; }

    delete dto.currentPassword;
    if (dto.password) { dto.password = await crypto.createHmac('sha256', dto.password).digest('hex'); }

    return await this.settingsModel
      .findOneAndUpdate({ username: Defaults.user.username }, dto, { new: true, runValidators: true })
      .select('-_id -username -password -lastLoginAt -email')
      .catch(err => { throw new BadGatewayException('Error al modificar en DB', (err)); });
  }
}
