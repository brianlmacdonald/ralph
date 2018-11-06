import { Request, Response, RequestHandler } from "express";
const ralphQuote = `I'm bad, and that's good.\nI will never be good, and that's not bad.\nThere's no one I'd rather be than me.`
const chalk = require('chalk')

interface Options {
  message: string;
  code: number,
  json: Object
}

const loggingResponse = (res: Response, options: Options): any => {
  console.log(chalk.magenta(`Sending back ${options.message}.`))
  console.log(chalk.magenta(new Date()))
  console.log(chalk.red(`* * * * * WRECKED * * * * * `))
  return res.status(options.code).json(options.json)
}

const errorRoulette: RequestHandler = (req, res, next):any => {
  const randomNumber: Number = Math.round(Math.random() * 3);
  console.log(chalk.red(`* * * * * WRECKED * * * * * `))
  console.log(chalk.red(`${ralphQuote}'`))
  console.log(chalk.cyan(`${req.query.host}`))
  switch(randomNumber) {
    case 0:
    return loggingResponse(res, {
      code: 404,
      message: 'a 404',
      json: {
        errors: [
          {
            status: 404,
            message: 'Ralph: standard.',
            title: 'Ralph: Not found.'
          }
        ]
      }
    })
    case 1:
    return loggingResponse(res, {
      code: 200,
      message: 'some empty data',
      json: {},
    })
    case 2:
    return setTimeout(() => loggingResponse(res, {
      code: 418,
      message: 'latency',
      json: {
        errors: [
          {
            status: 404,
            message: 'Ralph: latency',
            title: 'Ralph: latency',
          },
        ],
      },
    }), 60000)
    case 3:
    return loggingResponse(res, {
      code: 502,
      message: 'bad gateway eror',
      json: {
        errors: [
          {
            status: 502,
            message: 'Ralph: bad gateway.',
            title: 'Ralph: bad gateway.',
          },
        ],
      },
    })
    default:
    return next()
  }
}

const makeHeaders = (url: string, req: Request): Object => {
  const headers: Object = { }
  if (url.includes('dashboard')) {
    //@ts-ignore
    headers['xo-member-token'] = req.get('xo-member-token')
    //@ts-ignore
    headers['Content-Type'] = req.get('Content-Type')
  } else if (url.includes('qa-api.weddings')) {
    //@ts-ignore
    headers['Application-Type'] = req.get('Application-Type')
    //@ts-ignore
    headers['membership-session-token'] = req.get('membership-session-token')
  }
  return headers
}

const randomNumber = (num: number): number => Math.round(Math.random() * num)

module.exports = { makeHeaders, randomNumber, errorRoulette }
