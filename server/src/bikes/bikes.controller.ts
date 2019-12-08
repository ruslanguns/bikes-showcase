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
  UploadedFile
} from '@nestjs/common';
import { BikesService } from './bikes.service';
import { BikeDto } from './dtos/bike.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileSettings } from '../../config';

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
  @UseInterceptors(FileInterceptor('image', fileSettings))
  async addImage(
    @UploadedFile() image,
    @Param('id') id,
    @Res() res,
  ) {
    const data = await this.bikesService.addImage(id, image);
    return res.status(HttpStatus.CREATED).json({ message: 'Imagen cargada correctamente', data });
  }

  @Patch(':id/image')
  @UseInterceptors(FileInterceptor('image', fileSettings))
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
