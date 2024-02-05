import type { Request, Response } from 'express';
import * as userService from './users.service.js';

export async function getUsers(req: Request, res: Response) {
  const users = await userService.getUsers();
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

export async function getUserByName(req: Request, res: Response) {
  const { username } = req.params;
  if (!username) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  const user = await userService.getUserByName({ username });
  res.json(user);
}

export async function updateUserById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'ID is required' });
    return;
  }
  const user = await userService.updateUserById(id, req.body);
  res.json(user);
}

export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ error: 'ID is required' });
    return;
  }
  const user = await userService.deleteUserById({ id });
  res.json(user);
}
