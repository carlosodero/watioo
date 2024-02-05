import { Request, Response } from 'express';
import * as authService from './auth.service.js';
import * as usersRepo from '../users/users.repo.js';

const { CONFIRM_PAGE} = process.env;

function isValidEmail (mail: string) {
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (validEmail.test(mail)) {
    return true;
  }
  return false;
}

export async function registerUser (req: Request, res: Response) {
  const { username, userEmail, userPassword } = req.body;

  let userCreated;
  
  if (!username || !userEmail || !userPassword) {
    return res.status(400).send('Missing required fields');
  }

  if (!isValidEmail(userEmail)) {
    return res.status(400).send('Invalid email');
  }

  const validData = 'all data is valid';

  if (!validData) {
    return res.status(400).send('Invalid data');
  }

  const userEmailExists = await usersRepo.getUserByEmail({userEmail});

  if (userEmailExists) {
    return res.status(400).send('Email already exists');
  }

  const usernameExists = await usersRepo.getUserByUsername({username});

  if (usernameExists) {
    return res.status(400).send('Username already exists');
  }
  
  try {
    userCreated = await authService.registerUser({username, userEmail, userPassword});
  }
  catch (error) {
    return res.status(500).send('Error creating user');
  }

  res.json(userCreated);
}

export async function confirmUser (req: Request, res: Response) {
  const { emailtoken } = req.params;
  if (!emailtoken) {
    // const resobj = { ok: false, message: 'Empty required params' };
    res.status(400);
    res.json('Empty required params');
    return;
  }

  await authService.confirmUser({ emailtoken });

  if (!CONFIRM_PAGE) {
    throw new Error('CONFIRM_PAGE is not defined');
  }

  res.redirect(CONFIRM_PAGE);
}
