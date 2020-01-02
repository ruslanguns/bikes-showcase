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
  UploadedFile,
  UseGuards
} from '@nestjs/common';
import { BikesService } from './bikes.service';
import { BikeDto } from './dtos/bike.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { fileOptions } from '../config';
import { NotFoundException } from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('Bikes')
@Controller('bikes')
export class BikesController {

  fileSettingsOptions: {};

  constructor(
    private readonly bikesService: BikesService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Subir una nueva bicicleta' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
  async createBike(
    @Body() dto: BikeDto,
    @Res() res,
  ) {
    const data = await this.bikesService.create(dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Creado correctamente', data });
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de bicicletas' })
  @ApiResponse({
    status: 200,
    description: 'Los resultados son:',
    type: BikeDto,
  })
  async findBike(
    @Res() res,
  ) {
    const data = await this.bikesService.find();
    return res.status(HttpStatus.CREATED).json({ message: 'Búsqueda correcta', data });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una bicicleta por ID' })
  @ApiResponse({
    status: 200,
    description: 'El resultado es:',
    type: BikeDto,
  })
  async findBikeById(
    @Param('id') bikeId,
    @Res() res,
  ) {
    const data = await this.bikesService.findById(bikeId);
    if (!data) { throw new NotFoundException('No existe bicicleta con ese ID'); }

    return res.status(HttpStatus.CREATED).json({ message: 'Búsqueda correcta', data });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modificar una nueva bicicleta' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
  async updateBike(
    @Param('id') id: string,
    @Body() dto: BikeDto,
    @Res() res,
  ) {
    const data = await this.bikesService.update(id, dto);
    return res.status(HttpStatus.CREATED).json({ message: 'Petición correcta', data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una bicicleta' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
  async deleteBike(
    @Param('id') id: string,
    @Res() res,
  ) {
    const data = await this.bikesService.delete(id);
    return res.status(HttpStatus.CREATED).json({ message: 'Petición correcta', data });
  }

  @Post(':id/image')
  @ApiOperation({ summary: 'Subir imagen a una bicicleta' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image', fileOptions))
  async addImage(
    @UploadedFile() image,
    @Param('id') id,
    @Res() res,
  ) {
    const data = await this.bikesService.addImage(id, image);
    return res.status(HttpStatus.CREATED).json({ message: 'Imagen cargada correctamente', data });
  }

  @Patch(':id/image')
  @ApiOperation({ summary: 'Cambiar la imagen de una bicicleta' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('image', fileOptions))
  async changeImage(
    @UploadedFile() image,
    @Param('id') id,
    @Res() res,
  ) {
    const data = await this.bikesService.editImage(id, image);
    return res.status(HttpStatus.CREATED).json({ message: 'Imagen actualizada correctamente', data });
  }

  @Delete(':id/image')
  @ApiOperation({ summary: 'Eliminar la imagen de una nueva bicicleta' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
  async removeImage(
    @Param('id') id,
    @Res() res,
  ) {
    const data = await this.bikesService.removeImage(id);
    return res.status(HttpStatus.CREATED).json({ message: 'Imagen eliminada correctamente', data });
  }

  @Get(':id/image')
  async serveBikeImage(
    @Res() res,
    @Param('id') id,
  ) {
    const { image } = await this.bikesService.findById(id);
    (image) ? res.sendFile(image.filename, { root: image.destination }) : res.status(HttpStatus.NOT_FOUND).json({ message: 'La bicicleta no tiene imagen.' });
  }

}
