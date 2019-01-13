import { Request, Response, NextFunction } from 'express-serve-static-core';
import { TokenIndexer } from 'morgan';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const finalHandler = require('finalhandler');
const cors = require('cors');
const wreckKit = require('../APP/');
const chalk = require('chalk')

const port = 8080;

const app = express();

module.exports = app
  .use(morgan((tokens: TokenIndexer, req: Request, res: Response) => {
  return `${chalk.blue(tokens.method(req, res))} ${chalk.green(tokens.url(req, res))} ${chalk.red(tokens['response-time'](req, res))}`
  }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(bodyParser.raw())
  .use('/*', cors())
  .use('/wreck', wreckKit)
  .use((req: Request, res: Response, next: NextFunction) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found.');
      Object.defineProperty(err, 'status', {
        value: 404,
        writable: false,
      });
      next(err);
    }
  })
  .use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err, '<== Error in finalHandler');
    finalHandler(req, res)(err);
  });

const server = app.listen(port, 'localhost', () => {
  const { address, port } = server.address();
  console.log(chalk.yellow(`---- Ralph v0.0.1 ----`))
  console.log(chalk.red(`I'm gonna wreck it!!`));
  console.log(chalk.magenta(`wrecking on http://${address}:${port}`))
});
