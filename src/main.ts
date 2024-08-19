import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './http-exception.filter';

async function bootstrap() {
  // Log environment variables for debugging purposes
  console.log('Environment Variables:');
  console.log('PORT:', process.env.PORT);
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  console.log('REDIS_HOST:', process.env.REDIS_HOST);
  console.log('REDIS_PORT:', process.env.REDIS_PORT);

  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Register the custom exception filter globally
  app.useGlobalFilters(new AllExceptionsFilter());

  // Determine the port to listen on
  const port = process.env.PORT || 3000;

  // Listen on the specified port
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}

// Run the bootstrap function to start the application
bootstrap();