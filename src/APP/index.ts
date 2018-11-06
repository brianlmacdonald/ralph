import { Request, Response, NextFunction } from 'express-serve-static-core';
const router = require('express').Router();
const chalk = require('chalk')
const fetch = require('node-fetch')
const utils = require('../utils')

interface AsyncResponse extends Response {
  data: string;
  request: Object;
}

router.get(
  '*',
  (req: Request, res: Response, next: NextFunction) => {
    if (utils.randomNumber(9) <= -1) {
      return utils.errorRoulette(req, res, next)
    }
    const url = req.query.host;

    const headers = utils.makeHeaders(url, req)
    return fetch(url, {
      method: 'GET',
      headers,
    })
    .then((response: AsyncResponse) => {
      return response.json()
    })
    .then((responseJson: Object) => {
      console.log(chalk.cyan(`I can't complain. I got my bricks. I got my stump.`))
      return res.send(responseJson);
    })
    .catch((err: Error) => console.error(err));
  }
)

module.exports = router;
