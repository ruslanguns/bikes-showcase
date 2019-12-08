import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BikeDto {
  @ApiProperty({ example: 'E202123-1', description: 'Escriba el código del producto.' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 'BPRO', description: 'La marca de la bicicleta.' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'X123', description: 'Modelo o información adicional.' })
  @IsString()
  details: string;

  @ApiProperty({ example: 'Montaña', description: 'La categoría o tipo de bicicleta.' })
  @IsString()
  category: string;

  @ApiProperty({ example: 'M', description: 'Tamaño o estatura.' })
  @IsString()
  @IsOptional()
  size: string;

  @ApiProperty({ example: '200', description: 'El valor o precio.' })
  price: number;

  @ApiProperty({ example: 'usado', description: 'Puede elegir entre (usado, como_nuevo y nuevo)' })
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty({ example: 'a la venta', description: 'Puede elegir entre (a la venta, o vendido)' })
  @IsString()
  @IsOptional()
  status: string;
}
