import { Schema } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

const StatusEnum = {
  values: ['used', 'asNew', 'new'],
  message: `'{VALUE}' no es un valor válido.`,
};

export const BikesSchema = new Schema({
  productCode: { type: String, required: true, unique: true },
  brandName: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, default: '' },
  state: { type: String, default: 'used', enum: StatusEnum },
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
