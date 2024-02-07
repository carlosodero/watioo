import { Router } from 'express';
import * as usersController from './users.controller.js';
import * as accessControl from '../../middlewares/accessControl.middleware.js';

const router = Router();

router.get('/all', accessControl.verifyTokenAndAdmin, usersController.getUsers);
// router.get('/all', usersController.getUsers);
router.get('/:id', accessControl.verifyTokenAndAuthorization, usersController.getUserById);
// router.get('/:id', usersController.getUserById);
router.get('/username/:username', accessControl.verifyTokenAndAuthorization, usersController.getUserByUsername);
// router.get('/username/:username', usersController.getUserByUsername);

router.patch('/:id', accessControl.verifyTokenAndAuthorization, usersController.updateUserById);
// router.patch('/:id', usersController.updateUserById);
router.patch('/delete/:id', accessControl.verifyTokenAndAuthorization, usersController.deleteUserById);
// router.patch('/delete/:id', usersController.deleteUserById);

export default router;
