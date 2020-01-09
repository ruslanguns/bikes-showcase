import { SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: '/ws/bikes', options: {} };

export const environment = {
  production: true,
  socketConfig: config
};
