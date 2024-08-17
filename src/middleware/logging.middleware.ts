import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
      console.log(`Response Status: ${res.statusCode}`);
    });

    next();
  }
}
