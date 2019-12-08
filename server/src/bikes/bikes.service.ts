import { Injectable, BadGatewayException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBikes } from './interfaces';
import { BikeDto } from './dtos';
import * as sharp from 'sharp';
import * as fs from 'fs';

@Injectable()
export class BikesService {

  constructor(
    @InjectModel('Bikes') private readonly bikesModel: Model<IBikes>,
  ) { }

  async create(dto: BikeDto): Promise<IBikes> {
    return await this.bikesModel.create(dto)
      .catch(err => { throw new BadGatewayException('Error al guardar en DB', err); });
  }

  async find(): Promise<IBikes[]> {
    return await this.bikesModel.find()
      .catch(err => { throw new BadGatewayException('Error al buscar en DB', err); });
  }

  async update(id: string, dto: BikeDto): Promise<IBikes | string> {
    return await this.bikesModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .then(res => (res._id.length) ? res : 'No hay nada que modificar.')
      .catch(err => { throw new BadGatewayException('Error al modificar en DB', err); });
  }

  async delete(id: string): Promise<IBikes | string> {
    return await this.bikesModel.findByIdAndDelete(id)
      .then(res => (res._id.length) ? res : 'No hay nada que eliminar.')
      .catch(err => { throw new BadGatewayException('Error al eliminar en DB', err); });
  }

  async addImage(id: string, image): Promise<void> {
    await this.imageCompression(image); // Comprimir.
    const bike: IBikes = await this.bikesModel.findOne({ _id: id })
      .catch(err => { throw new BadGatewayException('Error al buscar a la bicicleta Server', err); });

    if (bike && bike.image && bike.image.length) {
      fs.unlinkSync(image.path);
      throw new BadRequestException('No puede agregar más imagenes.');
    } else {
      bike.image = image.path;
      await bike.save();
    }
  }

  async editImage(id, newImage): Promise<void> {
    await this.removeImage(id); // Eliminamos antigua imagen...
    return await this.addImage(id, newImage); // Comprimimos y guardamos la nueva imagen.
  }

  async removeImage(id): Promise<void> {
    const bike = await this.bikesModel.findById(id).select('image');
    if (bike && bike.image && !!bike.image.length) {
      fs.unlinkSync(bike.image);
      bike.image = undefined;
      await bike.save();
    } else {
      return;
    }
  }

  private async imageCompression(image): Promise<void | BadGatewayException> {
    return await sharp(image.path)
      .resize(1200)
      .toBuffer()
      .then(data => fs.writeFileSync(image.path, data))
      .catch(err => new BadGatewayException('Error al comprimir archivo en Server.', err));
  }

}
