import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreatePlaceDto } from './create-place.dto';

export class UpdatePlaceDto extends PartialType(CreatePlaceDto) {
  @IsNumber()
  @IsOptional()
  id: number;
}
