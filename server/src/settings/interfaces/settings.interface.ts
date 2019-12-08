import { Document } from 'mongoose';

export interface ISettings extends Document {
  readonly updatedAt: Date;
  lastLoginAt: Date;
}
