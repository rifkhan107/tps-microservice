import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AllExceptionsFilter } from './http-exception.filter';

async function bootstrap() {
  dotenv.config();  // Ensure environment variables are loaded
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Register the custom exception filter globally
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(process.env.PORT || 3000);
  console.log(`Server running on port ${process.env.PORT || 3000}`);
}

bootstrap();
