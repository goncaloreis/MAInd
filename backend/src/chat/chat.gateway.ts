import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('ChatGateway');

  constructor(private readonly aiService: AiService) {}

  afterInit(server: any) {
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
    return processedResponse;
  }
} 