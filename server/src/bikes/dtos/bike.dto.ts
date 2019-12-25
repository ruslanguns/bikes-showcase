import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BikeDto {
  @ApiProperty({ example: 'E202123-1', description: 'Escriba el código del producto.' })
  @IsOptional()
  @IsString()
  productId: string;

  @ApiProperty({ example: 'BPRO', description: 'La marca de la bicicleta.' })
  @IsOptional()
  @IsString()
  brand: string;

  @ApiProperty({ example: 'X123', description: 'Modelo o información adicional.' })
  @IsOptional()
  @IsString()
  details: string;

  @ApiProperty({ example: 'Montaña', description: 'La categoría o tipo de bicicleta.' })
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty({ example: 'M', description: 'Tamaño o estatura.' })
  @IsString()
  @IsOptional()
  size: string;

  @ApiProperty({ example: '200', description: 'El valor o precio.' })
  @IsOptional()
  price: number;

  @ApiProperty({ example: 'usado', description: 'Puede elegir entre (usado, buen estado y perfecto estado)' })
  @IsString()
  @IsOptional()
  state = 'usado';

  @ApiProperty({ example: 'a la venta', description: 'Puede elegir entre (a la venta, o vendido)' })
  @IsString()
  @IsOptional()
  status = 'a la venta';

  soldAt: Date;
  updatedAt: Date;

}
