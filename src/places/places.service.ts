import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/districts/entities/district.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TouristArea } from 'src/tourist-areas/entities/tourist-area.entity';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
import PlaceNotFoundException from './exceptions/placeNotFound.exception';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class PlacesService {
  private readonly logger = new Logger(PlacesService.name);
  constructor(
    @InjectRepository(Place)
    private placeRepository: Repository<Place>,

    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(TouristArea)
    private touristAreaRepository: Repository<TouristArea>,
    private readonly imageService: ImagesService,
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
        author: true,
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
        author: true,
      },
    });

    if (place) {
      return place;
    }
    throw new PlaceNotFoundException(id);
  }

  async update(id: number, updatePlaceDto: UpdatePlaceDto) {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: {
        district: true,
        images: true,
        touristArea: true,
        tags: true,
      },
    });

    const {
      title,
      description,
      shortDescription,
      latitude,
      longitude,
      elevation,
      howToGetByCar,
      howToGetByPublicTransport,
      howToGetByTransfer,
      keywords,
      districtId,
      touristAreaId,
      tagIds,
    } = updatePlaceDto;

    place.title = title;
    place.description = description;
    place.shortDescription = shortDescription;
    place.latitude = latitude;
    place.longitude = longitude;
    place.elevation = elevation;
    place.howToGetByCar = howToGetByCar;
    place.howToGetByPublicTransport = howToGetByPublicTransport;
    place.howToGetByTransfer = howToGetByTransfer;
    place.keywords = keywords;

    if (districtId) {
      const district = await this.districtRepository.findOne({
        where: { id: districtId },
      });
      place.district = district;
    }

    if (touristAreaId) {
      const touristArea = await this.touristAreaRepository.findOne({
        where: { id: touristAreaId },
      });
      place.touristArea = touristArea;
    }

    if (tagIds) {
      const tags = await this.tagRepository.findBy({ id: In(tagIds) });
      place.tags = tags;
    }
    await this.placeRepository.save(place);

    const updatedPlace = await this.placeRepository.findOne({
      where: { id },
      relations: {
        district: true,
        images: true,
        touristArea: true,
        tags: true,
      },
    });

    if (updatedPlace) {
      return updatedPlace;
    }
    throw new PlaceNotFoundException(id);
  }

  async updateMainImage(id: number, filename: string) {
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

  /* It adds image to images table and then set relation to place at images_places_relations table */
  async updateImage(id: number, filename: string) {
    const place = await this.placeRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });
    if (!place) {
      throw new PlaceNotFoundException(id);
    }
    const image = await this.imageService.createAndSaveImage(filename);

    place.images.push(image);
    await this.placeRepository.save(place);
  }

  async remove(id: number) {
    const deleteResponse = await this.placeRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PlaceNotFoundException(id);
    }
  }
}
