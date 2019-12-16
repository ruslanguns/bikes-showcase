import { Document } from 'mongoose';

export interface ISettings extends Document {
  readonly currentPassword: string;
  readonly password: string;
  readonly email: string;
  readonly updatedAt: Date;
  lastLoginAt: Date;
}
