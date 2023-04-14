import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristAreaDto } from './create-tourist-area.dto';

export class UpdateTouristAreaDto extends PartialType(CreateTouristAreaDto) {}
