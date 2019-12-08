import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const stateEnum = {
  values: ['usado', 'como_nuevo', 'nuevo'],
  message: `'{VALUE}' no es un valor válido.`,
};

const StatusEnum = {
  values: ['a la venta', 'vendido'],
  message: `'{VALUE}' no es un valor válido.`,
};

export const BikesSchema = new Schema({
  productId: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  details: { type: String, required: true },
  category: { type: String, default: '' },
  size: { type: String, default: '' },
  image: String,
  price: { type: Number, required: true },
  state: { type: String, default: 'usado', enum: stateEnum },
  status: { type: String, default: 'a la venta', enum: StatusEnum },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

BikesSchema.pre('findOneAndUpdate', async (next) => {
  const update = this.getUpdate();
  update.updatedAt = await new Date();
  next();
});

BikesSchema.plugin(uniqueValidator, {
  message: 'El campo {PATH} debe ser único.'
});
