import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'http';

@WebSocketGateway({ namespace: 'ws' })
export class BikesGateway {

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('Chat_Gateway');
  private users = 0;

  afterInit(server: any) {
    this.logger.log('Initialized!...');
  }

  newChange(notification: boolean) {
    this.logger.log('Se ha actualizado la lista de bicicletas.');
    this.wss.emit('newChange', notification);
  }

  handleConnection(client) {
    this.users++;
    this.wss.emit('activeUsers', this.users);
    this.logger.log('New client connected');
    this.logger.log(`Actived clients: ${String(this.users)}`);
    client.emit('connection', 'Connected');
  }

  handleDisconnect() {
    this.users--;
    this.wss.emit('activeUsers', this.users);
    this.logger.log('Client disconnected');
    this.logger.log(`Actived clients: ${String(this.users)}`);
  }
}
