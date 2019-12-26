import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const stateEnum = {
  values: ['usado', 'buen estado', 'perfecto estado'],
  message: `'{VALUE}' no es un valor válido.`,
};

const StatusEnum = {
  values: ['a la venta', 'vendido'],
  message: `'{VALUE}' no es un valor válido.`,
};

const Image = {
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: String,
};

export const BikesSchema = new Schema({
  productId: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  details: { type: String, required: false },
  category: { type: String, default: '' },
  size: { type: String, default: '' },
  image: Image,
  price: { type: Number, required: true },
  state: { type: String, default: 'usado', enum: stateEnum },
  status: { type: String, default: 'a la venta', enum: StatusEnum },
  soldAt: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

BikesSchema.plugin(uniqueValidator, {
  message: 'El campo {PATH} debe ser único.'
});
