
export interface IMarcas {
  name: string;
  models: string[];
}

export interface ISettings {
  currentPassword: string;
  password: string;
  email: string;
  inputs: {
    marcas: IMarcas[];
    estilo: string[];
    talla: string[];
  };
  updatedAt: Date;
  lastLoginAt: Date;
}
