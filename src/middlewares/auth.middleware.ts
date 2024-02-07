import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../api/users/users.service.js';
import type {User} from '../interfaces/user.js';

interface RequestWithUser extends Request {
  user?: User;
}

function unauthorized (res: Response) {
  res.status(401);
  res.json('Unauthorized');
}

function middleware (req: RequestWithUser, res: Response, next: NextFunction) {
  const publicRoutes = [
    '/login',
    '/register',
    '/users/changepasswordrequest',
    '/users/changepassword',
    '/confirm'
  ];

  const requestUrl = req.url;

  const isPublicRoute = publicRoutes.some((publicRoute) => {
    const includePublicRoute = requestUrl.includes(publicRoute);
    return includePublicRoute;
  });

  if (isPublicRoute) {
    next();
    return;
  }

  const token = req.headers.authorization;

  if (!token) {
    unauthorized(res);
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  jwt.verify(token, secret, async (error, payload) => {
    if (error) {
      console.error('ERROR!', error.message);
      return unauthorized(res);
    } else if (!payload || typeof payload === 'string') {
      return unauthorized(res);
    }
    req.user = await userService.getUserByUsername( payload.username );
    return next();
  });
}

export default middleware;
