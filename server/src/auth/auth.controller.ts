import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
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
}
