import express from 'express';
import cors from 'cors';
import './database';
import apiRouter from './api/router.js';
import * as dotenv from 'dotenv';

dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

console.log(port);

server.use(express.json());
server.use(cors({ origin: true }));
server.use(apiRouter);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});