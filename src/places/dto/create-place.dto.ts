import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  mainImage: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsNumber()
  elevation: number;

  @IsOptional()
  @IsString()
  howToGetByCar: string;

  @IsOptional()
  @IsString()
  howToGetByPublicTransport: string;

  @IsOptional()
  @IsString()
  howToGetByTransfer: string;

  @IsOptional()
  @IsString()
  keywords: string;
}
