import { Controller, Get, Post, Res, Body } from '@nestjs/common';
import { AppleService } from './services/apple.service';
import { Response } from 'express';

@Controller('apples')
export class AppleController {
  constructor(private readonly appleService: AppleService) {}  // Inject AppleService

  @Get()
  async getApples(@Res() res: Response): Promise<void> {
    const apples = await this.appleService.getApples();  // Use 'this' to reference the service
    res.send(apples);
  }

  @Post()
  async addApple(@Body() body: any, @Res() res: Response): Promise<void> {
    const result = await this.appleService.addApple(body);  // Use 'this' to reference the service
    res.send(result);
  }
}
