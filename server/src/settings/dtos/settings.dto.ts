import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SettingDto {

  @ApiProperty({ example: 'SecurePassword', description: 'Elija una contraseña segura.' })
  @IsString()
  password: string;
}
