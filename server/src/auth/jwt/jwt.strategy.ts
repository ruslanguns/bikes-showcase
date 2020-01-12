import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Model } from 'mongoose';
import { ConfigService } from '../../config';
import { ISettings } from '../../settings';
import { JwtPayload } from './jwt.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('Settings') private readonly model: Model<ISettings>,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),
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
