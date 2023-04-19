import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './entities/district.entity';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtRepository: Repository<District>,
  ) {}

  create(district: CreateDistrictDto) {
    return 'This action adds a new district';
  }

  findAll() {
    return this.districtRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} district`;
  }

  update(id: number, district: UpdateDistrictDto) {
    return `This action updates a #${id} district`;
  }

  remove(id: number) {
    return `This action removes a #${id} district`;
  }
}
