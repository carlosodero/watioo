import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type {User} from '../interfaces/user.js';

const { JWT_SECRET } = process.env;

interface RequestExtended extends Request {
  user: User;
}

function unauthorized (res: Response) {
  res.status(401);
  res.json('Unauthorized');
}

const verifyToken = (req: RequestExtended, res: Response, check: string ): boolean => {

  const authHeader = req.headers.authorization;
  let pass = true;
  if (authHeader) {

    const token = authHeader;
    if (!token) {
      return false;
    }

    const secret = JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    jwt.verify(token, secret, (err, user) => {
      if (err) {
        pass = false;
      }

      if (check === 'isadmin') {

        if (!user.isAdmin) {
          pass = false;
        }
        
      }

      if (check === 'isuser') {

        if ( (user.userId !== req.params.id) && !user.isAdmin ) {
          pass = false;
        }
      }

    });
  } else {
    pass = false;
  }

  return pass;
};

const verifyTokenAndAuthorization = (req: RequestExtended, res: Response, next: NextFunction) => {
  const pass = verifyToken(req, res, 'isuser');
  if ( !pass ) {
    unauthorized(res);
  } else {
    next();
  }
};

const verifyTokenAndAdmin = (req: RequestExtended, res: Response, next: NextFunction) => {
  const pass = verifyToken(req, res, 'isadmin');
  if ( !pass ) {
    unauthorized(res);
  } else {
    next();
  }
};

export {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
};
