import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocalFile } from './entities/local-file.entity';
// import { CreateLocalFileDto } from './dto/create-local-file.dto';
// import { UpdateLocalFileDto } from './dto/update-local-file.dto';

@Injectable()
export class LocalFilesService {
  constructor(
    @InjectRepository(LocalFile)
    private localFilesRepository: Repository<LocalFile>,
  ) {}

  async saveLocalFileData(fileData: LocalFileDto) {
    const newFile = await this.localFilesRepository.create(fileData);
    await this.localFilesRepository.save(newFile);
    return newFile;
  }

  async getFileById(fileId: number) {
    const file = await this.localFilesRepository.findOneBy({ id: fileId });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
