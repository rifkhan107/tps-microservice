import { Controller, Get } from '@nestjs/common';

@Controller('status')
export class StatusController {
  @Get('api-status')
  getApiStatus() {
    return { status: 'API is running smoothly' }; // Mock API status
  }

  @Get('db-status')
  getDbStatus() {
    return { status: 'Database is connected' }; // Mock DB status
  }

  @Get('redis-status')
  getRedisStatus() {
    return { status: 'Redis is connected' }; // Mock Redis status
  }
}
