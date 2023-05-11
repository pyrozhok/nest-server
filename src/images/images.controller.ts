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
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  /*   @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  } */

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  /*   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  } */

  /*   @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  } */

  /*   @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  } */
}
