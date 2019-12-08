import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post()
  async login(
    @Body() dto: LoginDto,
    @Res() res,
  ) {
    const data = await this.authService.signIn(dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Login exitoso', data });
  }
}
