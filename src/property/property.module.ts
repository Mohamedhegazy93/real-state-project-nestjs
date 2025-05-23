import { BadRequestException, Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { User } from 'src/user/entities/user.entity';
import { Neighborhood } from 'src/neighborhood/entities/neighborhood.entity';
import { Media } from 'src/media/entities/media.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PropertyMedia } from 'src/media/entities/propertyMedia.entity';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([Property, User, Neighborhood, Media,PropertyMedia]),CloudinaryModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const prefix = `${Date.now()}-${Math.round(Math.random() * 1000000)}`;
          const filename = `${prefix}-${file.originalname}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (
          file.mimetype.startsWith('image') ||
          file.mimetype.startsWith('video')
        ) {
          cb(null, true);
        } else {
          cb(new BadRequestException('unsupported file format'), false);
        }
      },
      limits: {
        fileSize: 200 * 1024 * 1024,
      },
    }),
  ],
  controllers: [PropertyController],
  providers: [PropertyService,CloudinaryService,UserService],
})
export class PropertyModule {}
