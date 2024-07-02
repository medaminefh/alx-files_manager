import dbClient from '../utils/db';

export default class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }
    const userExist = await dbClient.collection('users').findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = await dbClient.collection('users').insertOne({ email, password });
    console.log(user);
    return res.status(200).json({ id: user.insertedId, email });
  }
}
