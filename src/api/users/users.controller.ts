import { Request, Response } from 'express';
import * as userService from './users.service.js';

export async function getUsers(req: Request, res: Response) {
    const users = await userService.getUsers();
    res.json(users);
}
