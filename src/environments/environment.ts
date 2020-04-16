import { socketConfig } from 'src/app/shared/config/socket.config';

const host = 'localhost'; // <== Editar con el Host actual
const port = 4200; // <== Editar con el Port actual


export const environment = {
  production: false,
  socketConfig: socketConfig({host, port})
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
