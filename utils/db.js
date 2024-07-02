import { MongoClient } from 'mongodb';

const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
class DBClient {
  constructor() {
    const uri = `mongodb://${DB_HOST || 'localhost'}:${DB_PORT || 27017}/${DB_DATABASE || 'files_manager'}`;
    this.connected = false;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.client.connect();
  }

  async nbUsers() {
    const users = await this.client.collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    const files = await this.client.collection('files').countDocuments();
    return files;
  }

  async isAlive() {
    return !!this.client;
  }
}

export default new DBClient();
