import { MongoClient, Db } from 'mongodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MongoDBService {
  private db?: Db;

  async connect(uri: string): Promise<void> {
    const client = await MongoClient.connect(uri);
    this.db = client.db();
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }
}
