import { SocketIoConfig } from 'ngx-socket-io';

const host: string = process.env.HOST || 'localhost'; // <== Editar con el Host actual
const port: number = Number(process.env.PORT) || 4200;

const config: SocketIoConfig = { url: `http://${host}${(port) ? `:${port}` : ''}/bikes`, options: {} };

export const environment = {
  production: false,
  socketConfig: config
};
