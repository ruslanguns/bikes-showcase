import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Logger, Inject, forwardRef } from '@nestjs/common';
import { Server } from 'http';
import { BikesService } from './bikes.service';

@WebSocketGateway({ namespace: 'bikes' })
export class BikesGateway {

  constructor(
    @Inject(forwardRef(() => BikesService))
    private bikesService: BikesService,
  ) { }

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('Chat_Gateway');
  private users = 0;

  afterInit(server: any) {
    this.logger.log('Initialized!...');
  }

  @SubscribeMessage('setView')
  setView() {
    this.logger.log('Se ha añadido una nueva vista.');
    return this.bikesService.setView();
  }

  notifyChange() {
    return this.wss.emit('newChange', true);
  }

  getViews(views: number) {
    return this.wss.emit('getViews', views);
  }

  handleConnection(client) {
    this.users++;
    this.wss.emit('activeUsers', this.users);
    this.logger.log('New connection');
    this.logger.log(`Actived connections: ${String(this.users)}`);
    client.emit('connection', 'Connected');
  }

  handleDisconnect() {
    this.users--;
    this.wss.emit('activeUsers', this.users);
    this.logger.log('Client disconnection');
    this.logger.log(`Actived connections: ${String(this.users)}`);
  }

}
