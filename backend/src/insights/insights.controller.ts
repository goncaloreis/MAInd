import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getInsight(@Query('query') query: string): string {
    if (!query) {
      return "No query provided";
    }
    return this.insightsService.getInsights(query);
  }
} 