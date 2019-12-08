import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Defaults } from '../../config';
import { ISettings } from '../settings/interfaces';
import { JwtPayload } from './jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('Settings') private readonly model: Model<ISettings>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Defaults.jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.model.findById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
