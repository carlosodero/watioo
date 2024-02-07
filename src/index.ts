import express, {json} from 'express';
import cors from 'cors';
import './database.js';
import authMiddleware from './middlewares/auth.middleware.js';
import apiRouter from './api/router.js';
// import generateUserData from './scripts/generate.users.js';

const server = express();
const port = process.env.PORT || 3000;

server.use(json());
server.use(cors({ origin: true }));
server.use(authMiddleware);
server.use(apiRouter);
// generateUserData();

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
