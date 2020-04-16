import { socketConfig } from 'src/app/shared/config/socket.config';

const host = 'localhost'; // <== Editar con el Host actual
const port = 4200; // <== Editar con el Port actual



export const environment = {
  production: false,
  socketConfig: socketConfig({host, port})
};
