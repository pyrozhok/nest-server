import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalFilesService } from 'src/local-files/local-files.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import PlaceNotFoundException from './exceptions/placeNotFound.exception';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,
    private localFileService: LocalFilesService,
  ) {}

  async create(place: CreatePlaceDto, user: User) {
    const newPlace = await this.placeRepository.create({
      ...place,
      author: user,
    });
    await this.placeRepository.save(newPlace);
    return newPlace;
  }

  findAll() {
    return this.placeRepository.find({
      relations: {
        tags: true,
      },
    });
  }

  async findOne(id: number) {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: {
        district: true,
        images: true,
        touristArea: true,
        tags: true,
      },
    });

    if (place) {
      return place;
    }
    throw new PlaceNotFoundException(id);
  }

  async update(id: number, place: UpdatePlaceDto) {
    await this.placeRepository.update(id, place);
    const updatedPlace = await this.placeRepository.findOne({
      where: { id },
    });

    if (updatedPlace) {
      return updatedPlace;
    }
    throw new PlaceNotFoundException(id);
  }

  async updateImage(id: number, filename: string) {
    await this.placeRepository.update(id, {
      mainImage: filename,
    });
    const updatedPlace = await this.placeRepository.findOne({
      where: { id },
    });
    if (updatedPlace) {
      return updatedPlace;
    }
    throw new PlaceNotFoundException(id);
  }

  async remove(id: number) {
    const deleteResponse = await this.placeRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PlaceNotFoundException(id);
    }
  }
}
