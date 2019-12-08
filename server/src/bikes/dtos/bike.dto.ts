import { IsString, IsOptional } from 'class-validator';

export class BikeDto {
  @IsString()
  productId: string;

  @IsString()
  brand: string;

  @IsString()
  details: string;

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  size: string;

  price: number;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  status: string;
}
