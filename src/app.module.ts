import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Controllers
import { AppleController } from './app.controller';
import { HealthController } from './controllers/health.controller';

// Services
import { AppleService } from './services/apple.service';
import { HealthService } from './services/health.service';
import { MongoDBService } from './database/mongodb.service';

// Middleware
import { LoggingMiddleware } from './middleware/logging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the configuration globally available
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppleController, HealthController], // Register HealthController
  providers: [AppleService, MongoDBService, HealthService], // Register HealthService
})
export class AppModule implements NestModule {
  constructor(
    private readonly mongoDBService: MongoDBService,
    private readonly configService: ConfigService
  ) {
    const mongoUri = this.configService.get<string>('MONGODB_URI');
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }
    this.mongoDBService.connect(mongoUri);
  }

  // Apply middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware) // Apply the logging middleware
      .forRoutes('health'); // Apply only to the /health route
  }
}
