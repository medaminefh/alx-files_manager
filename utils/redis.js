import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.connected = false;

    this.client.on('error', function (error) {
      console.error(error.message || error.toString());
      this.connected = false;
    });

    this.client.on('connect', function () {
      this.connected = true;
    });

    this.client.bind = this.client;
  }

  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  async del(key) {
    return promisify(this.client.DEL).bind(this.client)(key);
  }

  isAlive() {
    return this.connected;
  }
}

export default new RedisClient();
