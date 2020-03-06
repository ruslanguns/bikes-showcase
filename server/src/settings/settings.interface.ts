import { Document } from 'mongoose';

export interface ISettings extends Document {
  readonly currentPassword: string;
  password: string;
  readonly email: string;
  inputs: {
    marcas: [
      {
        name: string;
        models: string[];
      }
    ],
    estilo: string[];
    talla: string[];
  };
  totalViews: number;
  readonly updatedAt: Date;
  lastLoginAt: Date;
}
