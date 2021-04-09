import express from 'express';

import Youch from 'youch';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

import './database';

const http = require('http');

class App {
  constructor() {
    this.server = express();
    this.app = http.Server(this.server);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'production') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      if (
        process.env.NODE_ENV === 'test' ||
        process.env.NODE_ENV === 'development'
      ) {
        // eslint-disable-next-line no-console
        console.log(err);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().app;
