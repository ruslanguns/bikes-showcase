import { Injectable, BadGatewayException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBikes } from './interfaces';
import { BikeDto } from './dtos';

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
      .then(res => (res._id.length) ? res : 'No hay nada que modificar')
      .catch(err => { throw new BadGatewayException('Error al modificar en DB', err); });
  }

  async delete(id: string) {
    return await this.bikesModel.findByIdAndDelete(id)
      .then(res => 'Eliminado con éxito')
      .catch(err => { throw new BadGatewayException('Error al eliminar en DB', err); });
  }

}
