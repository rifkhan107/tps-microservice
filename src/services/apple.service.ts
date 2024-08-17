import { Injectable } from '@nestjs/common';
import { MongoDBService } from '../database/mongodb.service';
import { redisService } from './redis.service';

@Injectable()
export class AppleService {
  constructor(private readonly mongoDBService: MongoDBService) {}  // Inject MongoDBService

  async getApples(): Promise<any[]> {
    const cachedApples = await redisService.get('apples');

    if (cachedApples) {
      console.log('From Redis Cache');
      return JSON.parse(cachedApples);
    } else {
      console.log('From MongoDB Database');
      const db = this.mongoDBService.getDb();  // Access MongoDBService using 'this'
      const apples = await db.collection('apples').find().toArray();
      redisService.set('apples', JSON.stringify(apples));
      return apples;
    }
  }

  async addApple(apple: any): Promise<any> {
    const db = this.mongoDBService.getDb();  // Access MongoDBService using 'this'
    const result = await db.collection('apples').insertOne(apple);
    redisService.del('apples');
    return result;
  }
}
