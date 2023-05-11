import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TouristAreasService } from './tourist-areas.service';
import { CreateTouristAreaDto } from './dto/create-tourist-area.dto';
import { UpdateTouristAreaDto } from './dto/update-tourist-area.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@Controller('tourist-areas')
export class TouristAreasController {
  constructor(private readonly touristAreasService: TouristAreasService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createTouristAreaDto: CreateTouristAreaDto) {
    return this.touristAreasService.create(createTouristAreaDto);
  }

  @Get()
  findAll() {
    return this.touristAreasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristAreasService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(
    @Param('id') id: string,
    @Body() updateTouristAreaDto: UpdateTouristAreaDto,
  ) {
    return this.touristAreasService.update(+id, updateTouristAreaDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.touristAreasService.remove(+id);
  }
}
