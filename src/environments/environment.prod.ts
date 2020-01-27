import { SocketIoConfig } from 'ngx-socket-io';

const host = 'localhost'; // <== Editar con el Host actual
const port = 4200;

const config: SocketIoConfig = { url: `http://${host}${(port) ? `:${port}` : ''}/bikes`, options: {} };

export const environment = {
  production: false,
  socketConfig: config
};
