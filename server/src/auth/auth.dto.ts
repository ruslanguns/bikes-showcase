import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'SecurePassword', description: 'Elija una contraseña segura.' })
  @IsString()
  password: string;
}
