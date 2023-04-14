import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTouristAreaDto } from './dto/create-tourist-area.dto';
import { UpdateTouristAreaDto } from './dto/update-tourist-area.dto';
import { TouristArea } from './entities/tourist-area.entity';
import TouristAreaNotFoundException from './exception/touristAreaNotFound.exception';

@Injectable()
export class TouristAreasService {
  constructor(
    @InjectRepository(TouristArea)
    private touristAreasRepository: Repository<TouristArea>,
  ) {}

  create(createTouristAreaDto: CreateTouristAreaDto) {
    return 'This action adds a new touristArea';
  }

  findAll() {
    return this.touristAreasRepository.find();
  }

  async findOne(id: number) {
    const touristArea = await this.touristAreasRepository.findOne({
      where: { id },
    });

    if (touristArea) {
      return touristArea;
    }

    throw new TouristAreaNotFoundException(id);
  }

  update(id: number, updateTouristAreaDto: UpdateTouristAreaDto) {
    return `This action updates a #${id} touristArea`;
  }

  remove(id: number) {
    return `This action removes a #${id} touristArea`;
  }
}
