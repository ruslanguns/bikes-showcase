import { Injectable, ForbiddenException, BadGatewayException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISettings } from '../settings/interfaces';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.interface';
import * as crypto from 'crypto';
import { Defaults } from '../../config/constants';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('Settings') private readonly settingsModel: Model<ISettings>,
    private readonly jwtService: JwtService,
  ) { }

  async signIn(dto: LoginDto): Promise<ForbiddenException | object> {
    const { password } = dto;
    const user = await this.settingsModel.findOne({
      username: Defaults.user.username,
      password: crypto.createHmac('sha256', password).digest('hex'),
    });

    if (!user) { throw new ForbiddenException('Su contraseña esta mal.'); }

    const { lastLoginAt } = user;
    user.lastLoginAt = new Date();
    await user.save();

    const { id } = user;
    const payload: JwtPayload = { id };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken, lastLoginAt };
  }
}
