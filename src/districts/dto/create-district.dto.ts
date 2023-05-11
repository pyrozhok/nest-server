import { IsNotEmpty, IsString } from 'class-validator';
export class CreateDistrictDto {}
export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
