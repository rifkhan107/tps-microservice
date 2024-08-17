import { createClient } from 'redis';

export class RedisService {
  private client;

  constructor() {
    const host = process.env.REDIS_HOST || 'localhost';
    const port = process.env.REDIS_PORT || '6379';

    this.client = createClient({
      url: `redis://${host}:${port}`,
      socket: {
        connectTimeout: 10000,  // Increase the connection timeout to 5000ms (5 seconds)
      },
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
    this.client.connect();
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export const redisService = new RedisService();
