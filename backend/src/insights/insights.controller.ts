import { Controller, Get, Query } from '@nestjs/common';
import { InsightsService } from './insights.service';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get()
  getInsight(@Query('query') query: string): string {
    if (!query) {
      return "No query provided";
    }
    return this.insightsService.getInsights(query);
  }
} 