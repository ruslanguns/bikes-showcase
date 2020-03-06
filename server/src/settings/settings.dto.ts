import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SettingDto {

  @ApiProperty({ example: 'MyCurrentPassword', description: 'Escriba su contraseña actual.' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'SecurePassword', description: 'Elija una contraseña segura.' })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ example: 'admin@dominio.es', description: 'Correo de recuperación.' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Data inputs para los typeaheads.' })
  @IsOptional()
  inputs: {
    marcas: [
      {
        name: string;
        models: string[];
      }
    ],
    estilo: string[];
    talla: string[];
  };

}
