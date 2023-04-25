import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  mainImage: string;

  @IsOptional()
  @IsString()
  shortDescription: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsOptional()
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

  @IsNumber()
  @IsOptional()
  districtId: number;

  @IsNumber()
  @IsOptional()
  touristAreaId: number;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  tagIds: number[];
}
