import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from './entities/place.entity';
import { LocalFilesModule } from 'src/local-files/local-files.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Place]), LocalFilesModule, ConfigModule],
  controllers: [PlacesController],
  providers: [PlacesService],
})
export class PlacesModule {}
