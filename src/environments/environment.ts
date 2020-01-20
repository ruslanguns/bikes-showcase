import { SocketIoConfig } from 'ngx-socket-io';

const host: string = process.env.host || 'localhost'; // <== Editar con el Host actual
const port: number = Number(process.env.port) || 4200;

const config: SocketIoConfig = { url: `http://${host}${(port) ? `:${port}` : ''}/bikes`, options: {} };

export const environment = {
  production: false,
  socketConfig: config
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
