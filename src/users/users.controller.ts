import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  BadRequestException,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import LocalFilesInterceptor from '../local-files/local-files.interceptor';
import { FileUploadDto } from './dto/file-upload.dto';
import JwtAuthenticationGuard from 'src/authentication/jwt-authentication.guard';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import RequestWithUser from 'src/authentication/requestWithUser.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('avatar')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/avatars',
      fileFilter: (request, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(1024, 2), // 1MB
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'A new avatar for the user',
    type: FileUploadDto,
  })
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(request.user.id, {
      path: file.path,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
  }
}
