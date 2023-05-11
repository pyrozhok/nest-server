import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { LocalFilesModule } from 'src/local-files/local-files.module';
import { ConfigModule } from '@nestjs/config';
import { Tag } from 'src/tags/entities/tag.entity';
import { District } from 'src/districts/entities/district.entity';
import { TouristArea } from 'src/tourist-areas/entities/tourist-area.entity';
import { ImagesModule } from 'src/images/images.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Place, Tag, District, TouristArea]),
    LocalFilesModule,
    ConfigModule,
    ImagesModule,
  ],
  controllers: [PlacesController],
  providers: [PlacesService, PlacesService],
})
export class PlacesModule {}
