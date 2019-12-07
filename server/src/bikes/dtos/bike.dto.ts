import { IsString, IsNumber, IsOptional } from 'class-validator';

export class BikeDto {
  @IsString()
  productCode: string;

  @IsString()
  brandName: string;

  image: string;

  // @IsNumber()
  price: number;

  @IsString()
  @IsOptional()
  size: string;

  @IsString()
  @IsOptional()
  state: string;
}
