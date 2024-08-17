import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check(): { message: string } {
    return { message: 'Nestjs application is running successfully' };
  }
}
