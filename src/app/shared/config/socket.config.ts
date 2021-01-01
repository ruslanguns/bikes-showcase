import { SocketIoConfig } from "ngx-socket-io";

const host = 'localhost'; // <== Editar con el Host actual
const port = 4200; // <== Editar con el Port actual
const namespace = 'bikes';
const secure = false;
const protocol = (!secure) ? 'http://' : 'https://';
const options = {};

export const socketConfig: SocketIoConfig = { url: `${protocol}${host}:${port}/${namespace}`, options };