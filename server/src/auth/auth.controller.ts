import { Controller, Post, Body, Res, HttpStatus, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

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
  @ApiOperation({ summary: 'Recuperación de contraseña' })
  async passwordRecovery(
    @Body('email') email: string,
    @Res() res,
  ) {
    const data = await this.authService.recovery(email);
    return res.status(HttpStatus.CREATED).json({ message: 'Se ha enviado el correo de recuperación', data });
  }

  @Patch('reset')
  @ApiOperation({ summary: 'Reset de contraseña' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
  async resetPassword(
    @Body('password') password: string,
    @Res() res,
  ) {
    const data = await this.authService.resetPassword(password);
    return res.status(HttpStatus.CREATED).json({ message: 'Contraseña cambiada con éxito', data: null });
  }
}
