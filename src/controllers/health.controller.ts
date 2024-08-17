import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthService } from '../services/health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth(): { message: string } {
    try {
      const healthStatus = this.healthService.check();
      console.log('Health check successful');
      return healthStatus;
    } catch (error) {
      console.error('Health check failed', error);
      throw new HttpException(
        'Health check failed',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
