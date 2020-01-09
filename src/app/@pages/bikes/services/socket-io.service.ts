import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  constructor(private sockets: Socket) { }

  listen(event: string) {
    return this.sockets.fromEvent(event);
  }
}
