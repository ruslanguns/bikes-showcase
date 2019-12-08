import { Schema } from 'mongoose';
import * as crypto from 'crypto';

export const SettingsSchema = new Schema({
  username: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  updatedAt: Date,
  lastLoginAt: Date,
}, { strict: 'throw' });

/**
 * Middleware que da formato a la contraseña con el hash.
 */
SettingsSchema.pre('save', async function save(next) {
  const user = this as any; // evitar error tslint ts(2339)
  if (!user.isModified('password')) {
    return next();
  }
  try {
    user.password = await crypto
      .createHmac('sha256', user.password)
      .digest('hex');
    return next();
  } catch (err) {
    return next(err);
  }
});
