import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Controllers
import { AppleController } from './app.controller';
import { HealthController } from './controllers/health.controller';
import { StatusController } from './controllers/status.controller'; // Import StatusController

// Services
import { AppleService } from './services/apple.service';
import { HealthService } from './services/health.service';
import { MongoDBService } from './database/mongodb.service';

// Middleware
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [
    // Serve static files from the 'public' directory
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Asynchronous connection to MongoDB using environment variables
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppleController, HealthController, StatusController], // Register controllers
  providers: [AppleService, MongoDBService, HealthService], // Register services
})
export class AppModule implements NestModule {
  constructor(
    private readonly mongoDBService: MongoDBService,
    private readonly configService: ConfigService
  ) {
    // Ensure MongoDB URI is provided and establish the connection
    const mongoUri = this.configService.get<string>('MONGODB_URI');
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    this.mongoDBService.connect(mongoUri);
  }

  // Apply middleware for logging requests to the /health route
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('health'); // This applies logging only to the /health route
  }
}
