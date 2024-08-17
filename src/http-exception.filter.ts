import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message:
          status === HttpStatus.NOT_FOUND
            ? 'The requested resource was not found'
            : exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal server error',
      };
  
      // Log the error with details
      this.logger.error(
        `HTTP ${status} Error: ${errorResponse.message} | URL: ${request.url} | Method: ${request.method} | IP: ${request.ip}`
      );
  
      response.status(status).json(errorResponse);
    }
  }
  