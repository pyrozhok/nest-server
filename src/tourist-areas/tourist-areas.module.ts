import { Module } from '@nestjs/common';
import { TouristAreasService } from './tourist-areas.service';
import { TouristAreasController } from './tourist-areas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TouristArea } from './entities/tourist-area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TouristArea])],
  controllers: [TouristAreasController],
  providers: [TouristAreasService],
})
export class TouristAreasModule {}
