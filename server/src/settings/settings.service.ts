import { Injectable, BadGatewayException, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { ConfigService } from '../config';
import { AuthService } from '../auth/auth.service';
import { SettingDto } from './settings.dto';
import { ISettings } from './settings.interface';

@Injectable()
export class SettingsService implements OnModuleInit {

  logger = new Logger('SettingsModule');

  constructor(
    @InjectModel('Settings') private readonly settingsModel: Model<ISettings>,
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {

  }

  /**
   * Usamos el OnInit para ver si existe un usuario admin configurado.
   * En caso de no estarlo se configura uno por defecto con los settings por defecto.
   */
  async onModuleInit(): Promise<void> {
    const adminUser = await this.settingsModel.findOne({ username: this.configService.get<string>('DEFAULT_ADMIN_USERNAME') });

    if (!adminUser) {
      await this.settingsModel.create({
        username: this.configService.get<string>('DEFAULT_ADMIN_USERNAME'),
        password: this.configService.get<string>('DEFAULT_ADMIN_PASSWORD'),
        email: this.configService.get<string>('DEFAULT_ADMIN_EMAIL'),
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
      .findOneAndUpdate({}, dto, { new: true, runValidators: true })
      .select('-_id -username -password -lastLoginAt -email')
      .catch(err => { throw new BadGatewayException('Error al modificar en DB', (err)); });
  }
}
