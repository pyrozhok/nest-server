import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTagDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name: string;
}
