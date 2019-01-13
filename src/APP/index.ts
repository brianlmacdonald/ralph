import { Request, Response, NextFunction } from 'express-serve-static-core';
const router = require('express').Router();
const chalk = require('chalk')
const utils = require('../utils')

const getRequest = utils.handoff('GET')
const putRequest = utils.handoff('PUT')
const postRequest = utils.handoff('POST')
const deleteRequest = utils.handoff('DELETE')

interface AsyncResponse extends Response {
  data: string;
  request: Object;
}


/* GET */
router.get(
  '*',
  (req: Request, res: Response, next: NextFunction) => {
    if (utils.randomNumber(10) <= 11) {
      return utils.errorRoulette(req, res, next)
    }

    const { url, headers } = utils.getUrlAndHeaders(req)
    return getRequest(res, utils.getUrlAndHeaders(req))
  }
)

/* POST */
router.post('*', (req: Request, res: Response, next: NextFunction) => {
  if (utils.randomNumber(10) <= 11) {
    return utils.errorRoulette(req, res, next)
  }

  return postRequest(res, utils.getUrlAndHeaders(req))
})

/* DELETE */

router.delete('*', (req: Request, res: Response, next: NextFunction) => {
  if (utils.randomNumber(10) <= 11) {
    return utils.errorRoulette(req, res, next)
  }

  return deleteRequest(res, utils.getUrlAndHeaders(req))
})

/* PUT */

router.put('*', (req: Request, res: Response, next: NextFunction) => {
  const { url, headers } = utils.getUrlAndHeaders()

  if (utils.randomNumber(10) <= 11) {
    return utils.errorRoulette(req, res, next)
  }

  return putRequest(res, utils.getUrlAndHeaders(req))
})

module.exports = router;
