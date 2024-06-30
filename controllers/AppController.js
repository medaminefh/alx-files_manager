import RedisClient from '../utils/redis';
import dbClient from '../utils/db';

export default class AppController {
  static async getStatus(req, res) {
    const redisAlive = await RedisClient.isAlive();
    const dbAlive = await dbClient.isAlive();

    res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    const users = await RedisClient.nbUsers();
    const files = await RedisClient.nbFiles();
    res.json({ users, files });
  }
}
