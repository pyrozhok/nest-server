import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import TagNotFoundException from './exceptions/tagNotFound.exception';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async create(tag: CreateTagDto) {
    const newTag = await this.tagRepository.create(tag);
    await this.tagRepository.save(newTag);
    return newTag;
  }

  findAll() {
    return this.tagRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne({
      where: { id },
    });

    if (tag) {
      return tag;
    }
    throw new TagNotFoundException(id);
  }

  async update(id: number, tag: UpdateTagDto) {
    await this.tagRepository.update(id, tag);

    const updatedTag = await this.tagRepository.findOne({
      where: { id },
    });

    if (updatedTag) {
      return updatedTag;
    }
    throw new TagNotFoundException(id);
  }

  async remove(id: number) {
    const deleteResponse = await this.tagRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new TagNotFoundException(id);
    }
  }
}
