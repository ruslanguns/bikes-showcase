import { Document } from 'mongoose';

export interface ISettings extends Document {
  readonly currentPassword: string;
  readonly password: string;
  readonly email: string;
  totalViews: number;
  readonly updatedAt: Date;
  lastLoginAt: Date;
}
