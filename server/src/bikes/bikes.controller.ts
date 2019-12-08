import {
  Controller,
  Res,
  Body,
  HttpStatus,
  Param,
  Post,
  Patch,
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
import { stringify } from 'querystring';

@Controller('bikes')
export class BikesController {

  constructor(
    private readonly bikesService: BikesService,
  ) { }

  @Post()
  async createBike(
    @Body() dto: BikeDto,
    @Res() res,
  ) {
    const data = await this.bikesService.create(dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Creado correctamente', data });
  }

  @Get()
  async findBike(
    @Res() res,
  ) {
    const data = await this.bikesService.find();
    return res.status(HttpStatus.CREATED).json({ message: 'Búsqueda correcta', data });
  }

  @Put(':id')
  async updateBike(
    @Param('id') id: string,
    @Body() dto: BikeDto,
    @Res() res,
  ) {
    const data = await this.bikesService.update(id, dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Actualizado correcto', data });
  }

  @Delete(':id')
  async deleteBike(
    @Param('id') id: string,
    @Res() res,
  ) {
    const data = await this.bikesService.delete(id);
    return res.status(HttpStatus.CREATED).json({ message: 'Eliminada correctamente', data });
  }

  @Post(':id/image')
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
        // tslint:disable-next-line: max-line-length
        return cb(new NotFoundException(`'${ext}' no es una extensión válida, las válidas son ${stringify(IMAGES_EXTENSION_ALLOWED)}`), false);
      }
    },
    limits: {
      fileSize: 9000000, // BITS
    },
  }))
  async addImage(
    @UploadedFile() image,
    @Param('id') id,
    @Res() res,
  ) {
    const data = await this.bikesService.addImage(id, image);
    return res.status(HttpStatus.CREATED).json({ message: 'Imagen cargada correctamente', data });
  }

  @Patch(':id/image')
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
        // tslint:disable-next-line: max-line-length
        return cb(new NotFoundException(`'${ext}' no es una extensión válida, las válidas son ${stringify(IMAGES_EXTENSION_ALLOWED)}`), false);
      }
    },
    limits: {
      fileSize: 9000000, // BITS
    },
  }))
  async changeImage(
    @UploadedFile() image,
    @Param('id') id,
    @Res() res,
  ) {
    const data = await this.bikesService.editImage(id, image);
    return res.status(HttpStatus.CREATED).json({ message: 'Imagen actualizada correctamente', data });
  }

  @Delete(':id/image')
  async removeImage(
    @Param('id') id,
    @Res() res,
  ) {
    const data = await this.bikesService.removeImage(id);
    return res.status(HttpStatus.CREATED).json({ message: 'Imagen eliminada correctamente', data });
  }

}
