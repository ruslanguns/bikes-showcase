import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  public socketStatus = false;

  constructor(private sockets: Socket) {
    this.checkStatus();
  }


  /**
   * Helper for checking socket status
   */
  checkStatus() {
    this.sockets.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.sockets.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

  }

  /**
   * Emit an event to Socket Server
   * @param event String Event Name
   * @param payload Payload OPTIONAL which is received from socket server
   * @param cb Callback if necesarry OPTIONAL
   */
  emit(event: string, payload?: string | any[] | {}, cb?: () => void) {
    this.sockets.emit(event, payload, cb);
  }

  /**
   * Listen an event from Socket Server
   * @param event String Event Name
   */
  listen(event: string) {
    return this.sockets.fromEvent(event);
  }

}
