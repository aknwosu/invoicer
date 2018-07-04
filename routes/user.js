import express from 'express';
import UserController from '../controllers/user';

const router = express.Router();

router.route('/')
  .post(UserController.createUser)
  .get(UserController.getUsers);

router.route('/login')
  .post(UserController.logIn);
router.route('/deleteUser')
  .post(UserController.deleteUser);

export default router;
