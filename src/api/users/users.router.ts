import { Router } from 'express';
import * as usersController from './users.controller.js';

const router = Router();

router.get('/all', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.get('/username/:username', usersController.getUserByName);

router.patch('/:id', usersController.updateUserById);
router.patch('/delete/:id', usersController.deleteUserById);

export default router;
  