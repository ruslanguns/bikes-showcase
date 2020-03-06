import { Schema } from 'mongoose';
import * as crypto from 'crypto';

export const SettingsSchema = new Schema({
  username: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  totalViews: { type: Number, default: 0 },
  inputs: { // TODO: Continuar adaptando schema y funcionalidad para el input typeahead
    marcas: [
      {
        name: { type: String, default: '' },
        models: { type: [String], default: [] },
      }
    ],
    estilo: { type: [String], default: ['carreras', 'carretera', 'montaña', 'niño', 'paseo', 'plegable'] },
    talla: { type: [String], default: ['xl', 's', 'm', 'l', 'xl'] },
  },
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
    user.password = await crypto.createHmac('sha256', user.password).digest('hex');
    return next();
  } catch (err) { next(err); }
});
