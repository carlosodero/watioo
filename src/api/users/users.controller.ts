import type { Request, Response } from 'express';
import { hashSync } from 'bcrypt';
import * as userService from './users.service.js';
import { validatePartialUser } from './users.validation.js';

export async function getUsers(req: Request, res: Response) {
  const users = await userService.getUsers();
  if (!users) {
    res.status(500).json({ error: 'Error getting users' });
    return;
  }
  res.json(users);
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'ID is required' });
    return;
  }
  const user = await userService.getUserById({ id });
  res.json(user);
}

export async function getUserByUsername(req: Request, res: Response) {
  const { username } = req.params;
  if (!username) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  const user = await userService.getUserByUsername(username);
  res.json(user);
}

export async function updateUserById(req: Request, res: Response) {
  const { id } = req.params;
  const newProps = req.body;
  if (!id) {
    res.status(400).json({ error: 'ID is required' });
    return;
  }

  const validData = validatePartialUser(req.body);

  if (!validData.success) {
    return res.status(400).send('Invalid data');
  }

  if (newProps.password) {
    newProps.password = hashSync(newProps.password, 10);
  }

  const user = await userService.updateUserById(id, newProps);
  res.json(user);
}

export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'ID is required' });
    return;
  }
  const user = await userService.deleteUserById( id );
  res.json(user);
}
