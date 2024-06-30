import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
    const uri = `mongodb://${DB_HOST || 'localhost'}:${DB_PORT || 27017}/${DB_DATABASE || 'files_manager'}`;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.client.connect();
  }

  async nbUsers() {
    const users = await this.client.db('files_manager').collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    const files = await this.client.db('files_manager').collection('files').countDocuments();
    return files;
  }

  async isAlive() {
    try {
      await this.client.connect();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new DBClient();
