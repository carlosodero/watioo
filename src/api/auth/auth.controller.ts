import { Request, Response } from 'express';
import * as authService from './auth.service.js';
import * as usersRepo from '../users/users.repo.js';
import { validatePartialUser } from '../users/users.validation.js';

const { CONFIRM_PAGE } = process.env;

function isValidEmail(mail: string) {
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (validEmail.test(mail)) {
    return true;
  }
  return false;
}

export async function registerUser(req: Request, res: Response) {
  const { username, userEmail, userPassword } = req.body;

  if (!username || !userEmail || !userPassword) {
    return res.status(400).send('Missing required fields');
  }

  if (!isValidEmail(userEmail)) {
    return res.status(400).send('Invalid email');
  }

  const validData = validatePartialUser(req.body);

  if (!validData.success) {
    return res.status(400).send('Invalid data');
  }

  const userEmailExists = await usersRepo.getUserByEmail(userEmail);

  if (userEmailExists) {
    return res.status(400).send('Email already exists');
  }

  const usernameExists = await usersRepo.getUserByUsername(username);

  if (usernameExists) {
    return res.status(400).send('Username already exists');
  }

  const userCreated = await authService.registerUser({ username, userEmail, userPassword });

  res.json(userCreated);
}

export async function loginUser(req: Request, res: Response) {
  const { username, userPassword } = req.body;

  if (!username || !userPassword) {
    res.status(400);
    res.json('Empty required params');
    return;
  }
  const userDataAndToken = await authService.loginUser({ username, userPassword });
  res.json(userDataAndToken);
}

export async function confirmUser(req: Request, res: Response) {
  const { emailtoken } = req.params;
  if (!emailtoken) {
    return res.status(400).send('Empty required params');
  }

  await authService.confirmUser({ emailtoken });

  if (!CONFIRM_PAGE) {
    throw new Error('CONFIRM_PAGE is not defined');
  }

  res.redirect(CONFIRM_PAGE);
}
