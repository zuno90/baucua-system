import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsResponse,
  OnGatewayInit,
} from '@nestjs/websockets';
import { EventService } from './event.service';
import { Server, WebSocket } from 'ws';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../jwt-guard/auth.guard';
import { createProxyMiddleware } from 'http-proxy-middleware';

// @UseGuards(AuthGuard)
@WebSocketGateway({
  path: '/ws',
  cors: { origin: '*', credentials: true },
})
export class EventGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly eventService: EventService) {}

  handleConnection(client: WebSocket, ...args: any[]) {
    console.log('connected');
  }

  handleDisconnect(client: WebSocket) {
    console.log('disconnected');
  }

  // test message
  // format {event: "message", data: "sample data"}
  @SubscribeMessage('message')
  handleEvent(client: WebSocket, data: any): WsResponse<unknown> {
    const event = 'event';
    console.log('mssss', data);
    return { event, data };
  }

  afterInit(server: Server) {
    // console.log(server)
  }
}
