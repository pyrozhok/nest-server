import { Module } from '@nestjs/common';
import { LocalFilesService } from './local-files.service';
import { LocalFilesController } from './local-files.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [LocalFilesController],
  providers: [LocalFilesService],
  exports: [LocalFilesService],
})
export class LocalFilesModule {}
