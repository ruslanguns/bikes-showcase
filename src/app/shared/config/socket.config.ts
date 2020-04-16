import { SocketIoConfig } from "ngx-socket-io";

export interface ISocketConfig {
  host: string,
  port?: number,
  namespace?: string,
  secure?: boolean,
  opts?: {}
}

/**
 * 
 * @param host HOST del servidor socket, por defecto es Localhost si se deja vacio.
 * @param port POST del servidor socket, por defecto es nada si se deja vacio.
 * @param namespace NAMESPACE del servidor socket, por defecto es nada si se deja vacio.
 * @param secure HTTPS o HTTP del servidor socket, por defecto es http:// si se deja vacio.
 * @param opts options del servidor socket, por defecto es http:// si se deja vacio.
 */
export const socketConfig = ({host, port, namespace, secure, opts = {}}: ISocketConfig): SocketIoConfig => {
  const HOST = host || 'localhost';
  const PORT = (port) ? `:${port}` : '';
  const NAMESPACE = (namespace) ? `:${namespace}` : '';
  const SECURE = (!secure) ? 'http://' : 'https://';
  const options = opts || {};

  return { url: `${SECURE}${HOST}${PORT}${NAMESPACE}`, options };
}