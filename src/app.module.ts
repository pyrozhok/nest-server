import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './places/places.module';
import { TagsModule } from './tags/tags.module';
import { ImagesModule } from './images/images.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LocalFilesModule } from './local-files/local-files.module';
import { TouristAreasModule } from './tourist-areas/tourist-areas.module';
import { DistrictsModule } from './districts/districts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    DatabaseModule,
    PlacesModule,
    TagsModule,
    ImagesModule,
    LocalFilesModule,
    TouristAreasModule,
    DistrictsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
