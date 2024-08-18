import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './http-exception.filter';

async function bootstrap() {
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Register the custom exception filter globally
  app.useGlobalFilters(new AllExceptionsFilter());

  // Listen on the specified port, defaulting to 3000 if not set
  await app.listen(process.env.PORT || 3000);
  console.log(`Server running on port ${process.env.PORT || 3000}`);
}

bootstrap();
