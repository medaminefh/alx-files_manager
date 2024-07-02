import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

export default (app) => {
  app.get('/status', AppController.getStatus);
  app.get('/stats', AppController.getStats);
  app.post('/users', UsersController.postNew);
};
