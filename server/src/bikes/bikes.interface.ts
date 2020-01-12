import { Document } from 'mongoose';

interface Image {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: string;
}

export interface IBikes extends Document {
  readonly productId: string;
  readonly brand: string;
  readonly details: string;
  readonly category: string;
  image: Image;
  readonly price: number;
  readonly size: string;
  readonly state: string;
  readonly status: string;
  soldAt: Date;
  readonly createdAt: Date;
  updatedAt: Date;
}
