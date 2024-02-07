import { Router } from 'express';
import usersRouter from './users/users.router.js';
import * as authController from './auth/auth.controller.js';

const router = Router();

router.use('/users', usersRouter);

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/confirm/:emailtoken', authController.confirmUser);

export default router;
