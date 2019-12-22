import { Injectable, BadGatewayException, BadRequestException } from '@nestjs/common';
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

  /**
   * Alta de bicicleta
   * @param dto Clase BikeDto
   */
  async create(dto: BikeDto): Promise<IBikes> {
    return await this.bikesModel.create(dto)
      .catch(err => { throw new BadGatewayException('Error al guardar en DB', err); });
  }

  /**
   * Buscar bicicletas dadas de alta
   */
  async find(): Promise<IBikes[]> {
    return await this.bikesModel.find()
      .catch(err => { throw new BadGatewayException('Error al buscar en DB', err); });
  }

  /**
   * Actualizar bicicleta por ID
   * @param id MongoId de bicicleta por modificar
   * @param dto Clase BikeDto
   */
  async update(id: string, dto: BikeDto): Promise<IBikes | string> {
    return await this.bikesModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .then(res => (res._id.length) ? res : 'No hay nada que modificar.')
      .catch(err => { throw new BadGatewayException('Error al modificar en DB', err); });
  }

  /**
   * Eliminar un registro por ID
   * @param id MongoId de bicicleta por eliminar
   */
  async delete(id: string): Promise<IBikes | string> {
    return await this.bikesModel.findByIdAndDelete(id)
      .then(res => (res._id.length) ? res : 'No hay nada que eliminar.')
      .catch(err => { throw new BadGatewayException('Error al eliminar en DB', err); });
  }

  /**
   * Cargar una imagen a una bicicleta
   * @param id MongoId de bicicleta
   * @param image FILE archivo imagen
   */
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

  /**
   * Cambiar imagen por otra
   * @param id MongoId de bicicleta
   * @param newImage Imagen con la que reemplazaremos la anterior
   */
  async editImage(id, newImage): Promise<void> {
    await this.removeImage(id); // Eliminamos antigua imagen...
    return await this.addImage(id, newImage); // Comprimimos y guardamos la nueva imagen.
  }

  /**
   * Eliminar la imagen de una bicicleta
   * @param id MongoId de bicicleta
   */
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

  /**
   * Comprimir imagen, reducirla de tamaño
   * @param image FILE imagen a comprimir
   */
  private async imageCompression(image): Promise<void | BadGatewayException> {
    return await sharp(image.path)
      .resize(1200)
      .toBuffer()
      .then(data => fs.writeFileSync(image.path, data))
      .catch(err => new BadGatewayException('Error al comprimir archivo en Server.', err));
  }

}
