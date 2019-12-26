import { Injectable, ForbiddenException, BadGatewayException, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISettings } from '../settings/interfaces';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.interface';
import * as crypto from 'crypto';
import { MailerService } from '@nest-modules/mailer';
import { ConfigService } from '../config';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('Settings') private readonly settingsModel: Model<ISettings>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) { }

  /**
   * Inicio de sesión
   * @param dto Clase LoginDto
   */
  async signIn(dto: LoginDto): Promise<ForbiddenException | object> {
    const { password } = dto;
    const user = await this.validate(password);

    const { lastLoginAt } = user;
    user.lastLoginAt = new Date();
    await user.save();

    const { id } = user;
    const payload: JwtPayload = { id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, lastLoginAt };
  }

  /**
   * Validación de usuario admin por contraseña
   * @param password Contraseña actual
   */
  async validate(password: string) {
    const user = await this.settingsModel.findOne({
      username: this.configService.get<string>('DEFAULT_ADMIN_USERNAME'),
      password: crypto.createHmac('sha256', password).digest('hex'),
    });

    if (!user) { throw new ForbiddenException('Su contraseña esta mal.'); }

    return user;
  }

  async resetPassword(password: string): Promise<ISettings | string> {
    password = crypto.createHmac('sha256', password).digest('hex');
    return await this.settingsModel.findOneAndUpdate({}, { password }, { new: true, runValidators: true, context: 'query' })
      .then(res => (!!res) ? res : 'No hay nada que modificar.')
      .catch(err => { throw new BadGatewayException('Error al modificar en DB', err); });
  }

  async recovery(emailProvided: string) {

    const { id, email } = await this.settingsModel.findOne().select('email').exec();
    if (emailProvided !== email) { throw new NotFoundException('El correo no coincide con el registrado.'); }

    const payload: JwtPayload = { id, reset: true };
    const accessToken = await this.jwtService.sign(payload);

    return this.mailerService
      .sendMail({
        to: email, // list of receivers (separated by ,),
        subject: 'Correo de recuperación — Bikes Showcase',
        text: 'Correo de recuperación',
        html: `
                    Hola!<br><br>
                    Se ha solicitado la recuperación de su contraseña. <br><br>

                    <a href="http://localhost:4200/login/reset/${accessToken}" taget="_blank">
                      Haga click aquí </a> para ir a su panel y gestionar su contraseña.<br>

                    Si tiene problemas con el enlace copie y pegue en la URL el texto siguiente: <br><br>

                    http://localhost:4200/login/reset/${accessToken} <br><br>

                    Si usted no ha solicitado este correo, puede ignorarlo. <br><br>

                    Saludos,<br><br>

                    Administraciópn.

                `,
      })
      .then(res => {
        console.log('Message sent: %s', res.messageId);
        return !!res;
      })
      .catch(error => {
        console.log('Message sent: %s', error);
        return false;
      });
  }
}
