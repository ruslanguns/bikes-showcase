import { Injectable, BadGatewayException } from '@nestjs/common';
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

  async create(dto: BikeDto, image): Promise<IBikes> {
    await this.imageCompression(image); // Comprimir.
    dto.image = image.filename; // Guardar el nombre del archivo para encontrarle luego.
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

  private async imageCompression(image): Promise<void | BadGatewayException> {
    return await sharp(image.path)
      .resize(1200)
      .toBuffer()
      .then(data => fs.writeFileSync(image.path, data))
      .catch(err => new BadGatewayException('Error al comprimir archivo en Server.', err));
  }

}
