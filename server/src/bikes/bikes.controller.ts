import {
  Controller,
  Res,
  Body,
  HttpStatus,
  Param,
  Post,
  Get,
  Put,
  Delete,
  UseInterceptors,
  NotFoundException,
  UploadedFile
} from '@nestjs/common';
import { BikesService } from './bikes.service';
import { BikeDto } from './dtos/bike.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as moment from 'moment';
import { extname } from 'path';
import { IMAGES_EXTENSION_ALLOWED } from '../../config/constants';

@Controller('bikes')
export class BikesController {

  constructor(
    private readonly bikesService: BikesService,
  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './files/bikes',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return cb(null, `${randomName}_${moment().format('YYYY-MM-DD')}_${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      const ext = extname(file.originalname);
      if (IMAGES_EXTENSION_ALLOWED.includes(ext)) {
        cb(null, true);
      } else {
        return cb(new NotFoundException(`Only images are allowed.`), false);
      }
    },
    limits: {
      fileSize: 2000000, // BITS
    },
  }))
  async createBike(
    @Body() dto: BikeDto,
    @Res() res,
    @UploadedFile() image,
  ) {
    // TODO: Aplicar imagen a la db
    const output = await this.bikesService.create(dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Created successfully', output });
  }

  @Get()
  async findBike(
    @Res() res,
  ) {
    const output = await this.bikesService.find();
    return res.status(HttpStatus.CREATED).json({ message: 'Find successfully', output });
  }

  @Put(':id')
  async updateBike(
    @Param('id') id: string,
    @Body() dto: BikeDto,
    @Res() res,
  ) {
    const output = await this.bikesService.update(id, dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Updated successfully', output });
  }

  @Delete(':id')
  async deleteBike(
    @Param('id') id: string,
    @Res() res,
  ) {
    const output = await this.bikesService.delete(id);
    return res.status(HttpStatus.CREATED).json({ message: 'Deleted successfully', output });
  }

}
