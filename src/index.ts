import express, {json} from 'express';
import cors from 'cors';
import './database.js';
import apiRouter from './api/router.js';

const server = express();
const port = process.env.PORT || 3000;

server.use(json());
server.use(cors({ origin: true }));
server.use(apiRouter);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
