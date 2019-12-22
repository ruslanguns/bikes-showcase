import { Controller, Post, Body, Res, HttpStatus, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Inicio de sesión. Devuelve token de acceso.' })
  async login(
    @Body() dto: LoginDto,
    @Res() res,
  ) {
    const data = await this.authService.signIn(dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Login exitoso', data });
  }

  @Post('recuperar')
  async passwordRecovery(
    @Body('email') email: string,
    @Res() res,
  ) {
    const data = await this.authService.recovery(email);
    return res.status(HttpStatus.CREATED).json({ message: 'Se ha enviado el correo de recuperación', data });
  }
}
