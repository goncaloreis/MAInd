import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { InsightsModule } from './insights/insights.module';

@Module({
  imports: [ChatModule, InsightsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
