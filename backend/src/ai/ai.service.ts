import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  processMessage(message: string): string {
    // In a real implementation, integrate with GPT-4 or another AI service.
    return `Processed response for: ${message}`;
  }
} 