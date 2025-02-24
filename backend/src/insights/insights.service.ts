import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';

@Injectable()
export class InsightsService {
  constructor(private readonly aiService: AiService) {}

  getInsights(query: string): string {
    // Simulate generating an insight using the AI service
    return this.aiService.processMessage(`Insight for: ${query}`);
  }
} 