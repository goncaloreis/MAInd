import { Module } from '@nestjs/common';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';
import { AiService } from '../ai/ai.service';

@Module({
  controllers: [InsightsController],
  providers: [InsightsService, AiService],
})
export class InsightsModule {} 