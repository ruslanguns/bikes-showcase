import { Document } from 'mongoose';

export interface IBikes extends Document {
  readonly productId: string;
  readonly brand: string;
  readonly details: string;
  readonly category: string;
  image: string;
  readonly price: number;
  readonly size: string;
  readonly state: string;
  readonly status: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
