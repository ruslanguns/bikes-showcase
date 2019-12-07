import { Document } from 'mongoose';

export interface IBikes extends Document {
  readonly productCode: string;
  readonly brandName: string;
  readonly image: string;
  readonly price: number;
  readonly size: string;
  readonly state: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
