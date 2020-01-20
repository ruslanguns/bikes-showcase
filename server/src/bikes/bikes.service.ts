import { Injectable, BadGatewayException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { ISettings } from '../settings';
import { BikeDto } from './bike.dto';
import { IBikes } from './bikes.interface';
import { BikesGateway } from './bikes.gateway';
import getStatsQuery from './queries/getStatsQuery';

@Injectable()
export class BikesService {

  constructor(
    @InjectModel('Bikes') private readonly bikesModel: Model<IBikes>,
    @InjectModel('Settings') private readonly settingsModel: Model<ISettings>,
    private bikesGateway: BikesGateway,
  ) { }

  /**
   * Alta de bicicleta
   * @param dto Clase BikeDto
   */
  async create(dto: BikeDto): Promise<IBikes> {
    dto.updatedAt = new Date();
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
   * Obtener Bicicleta por ID
   */
  async findById(id: string): Promise<IBikes> {
    return await this.bikesModel.findById(id)
      .catch(err => { throw new BadGatewayException('Error al buscar la bicicleta en la DB', err); });
  }

  /**
   * Aplicar una nueva visita
   */
  async setView(): Promise<number> {
    const settings = await this.settingsModel.findOne({});
    settings.totalViews += 1;
    await settings.save();

    const { totalViews } = settings;
    this.bikesGateway.getViews(totalViews);
    return totalViews;
  }

  /**
   * Actualizar bicicleta por ID
   * @param id MongoId de bicicleta por modificar
   * @param dto Clase BikeDto
   */
  async update(id: string, dto: BikeDto): Promise<IBikes | string> {
    if (dto.status && dto.status === 'vendido') {
      dto.soldAt = new Date();
    }
    if (dto.status && dto.status === 'a la venta') {
      dto.soldAt = undefined;
    }
    dto.updatedAt = new Date();
    return await this.bikesModel.findByIdAndUpdate(id, dto, { new: true, runValidators: true, context: 'query' })
      .then(res => (!!res) ? res : 'No hay nada que modificar.')
      .catch(err => { throw new BadGatewayException('Error al modificar en DB', err); });
  }

  /**
   * Eliminar un registro por ID
   * @param id MongoId de bicicleta por eliminar
   */
  async delete(id: string) {
    const removingImage = await this.removeImage(id);
    if (!removingImage) { throw new NotFoundException('No hay nada que eliminar. '); }
    return await this.bikesModel.findByIdAndDelete(id)
      .then(res => (!!res) ? res : 'No hay nada que modificar.')
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

    if (bike && bike.image && bike.image.path) {
      fs.unlinkSync(image.path);
      throw new BadRequestException('No puede agregar más imagenes.');
    } else {
      bike.updatedAt = new Date();
      bike.image = image;
      await bike.save();
    }
  }

  /**
   * Cambiar imagen por otra
   * @param id MongoId de bicicleta
   * @param newImage Imagen con la que reemplazaremos la anterior
   */
  async editImage(id, newImage): Promise<void> {
    const removingImage = await this.removeImage(id, newImage); // Eliminamos antigua imagen...
    if (!removingImage) { throw new NotFoundException('No hay nada que modificar.'); }
    return await this.addImage(id, newImage); // Comprimimos y guardamos la nueva imagen.
  }

  /**
   * Eliminar la imagen de una bicicleta
   * @param id MongoId de bicicleta
   */
  async removeImage(id, newImage?): Promise<boolean> {
    const bike = await this.bikesModel.findById(id).select('image');

    if (bike && bike.image && bike.image.path) {
      try {
        fs.unlinkSync(bike.image.path);
      } catch (err) {
        console.log(err);
      }

      bike.image = undefined;
      await bike.save();
      return true;
    } else {
      if (newImage) {
        try {
          fs.unlinkSync(newImage.path);
        } catch (err) {
          console.log('No existe la imagen para eliminar');
        }
      }
      return false;
    }
  }

  async getStats(): Promise<{}> {
    const stats = await this.bikesModel.aggregate(getStatsQuery).exec()
      .catch(err => { throw new BadGatewayException('Error al buscar Stats en DB', err); });
    return stats[0];
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
