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
import { fileSettings } from '../../config';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Bikes')
@Controller('bikes')
export class BikesController {

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
    return res.status(HttpStatus.CREATED).json({ message: 'Actualizado correcto', data });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una nueva bicicleta' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
  async deleteBike(
    @Param('id') id: string,
    @Res() res,
  ) {
    const data = await this.bikesService.delete(id);
    return res.status(HttpStatus.CREATED).json({ message: 'Eliminada correctamente', data });
  }

  @Post(':id/image')
  @ApiOperation({ summary: 'Subir imagen a una bicicleta' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
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
  @ApiOperation({ summary: 'Cambiar la imagen de una bicicleta' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(AuthGuard('jwt'))
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

}
