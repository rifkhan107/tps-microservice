import { Injectable } from '@nestjs/common';
import { MongoDBService } from './database/mongodb.service';
import { redisService } from './services/redis.service';

@Injectable()
export class AppleService {
  constructor(private readonly mongoDBService: MongoDBService) {}  // Inject the service

  async getApples(): Promise<any[]> {
    const db = this.mongoDBService.getDb();  // Access the service through 'this'
    const apples = await db.collection('apples').find().toArray();
    return apples;
  }

  async addApple(apple: any): Promise<any> {
    const db = this.mongoDBService.getDb();  // Access the service through 'this'
    const result = await db.collection('apples').insertOne(apple);
    return result;
  }
}