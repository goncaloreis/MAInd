import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('ChatGateway');
  private server: any;

  constructor(private readonly aiService: AiService) {}

  afterInit(server: any) {
    this.server = server;
    this.logger.log('Initialized Chat Gateway');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, @MessageBody() payload: any): string {
    this.logger.log(`Received message: ${payload} from client ${client.id}`);
    const processedResponse = this.aiService.processMessage(payload);
    // Broadcast the processed message to all clients
    if (this.server) {
      this.server.emit('message', processedResponse);
    }
    return processedResponse;
  }
} 