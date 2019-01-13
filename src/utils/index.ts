import { Request, Response, RequestHandler } from "express";
import chalk from 'chalk'
import fetch from 'node-fetch'
import { existsSync } from 'fs'
const ralphQuote = `I'm bad, and that's good.\nI will never be good, and that's not bad.\nThere's no one I'd rather be than me.`

/* .ralphrc config helpers */
export const safeConfigImport = async (filePath: string): Promise<Object> => {
  if(existsSync(filePath)) {
    const config = await import(filePath)
    return config.default
  } else {
    return {}
  }
}

const config: any = safeConfigImport(`${process.cwd()}.ralphrc.json`)

interface AsyncResponse extends Response {
  data: string;
  request: Object;
}

interface Options {
  message: string;
  code: number,
  json: Object
}

const loggingResponse = (res: Response, options: Options): any => {
  console.log(chalk.magenta(`Sending back ${options.message}.`))
  console.log(chalk.magenta(new Date().toDateString()))
  console.log(chalk.red(`* * * * * WRECKED * * * * * `))
  return res.status(options.code).json(options.json)
}

/* WRECKING UTILS */

export const errorRoulette: RequestHandler = (req, res, next):any => {
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
            message: 'Ralph: Four oh Four!',
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
            message: 'error.',
            title: 'Ralph: bad gateway.',
          },
        ],
      },
    })
    default:
    return next()
  }
}

/* REQUEST BUILDING UTILS */

const getApiDomain = (host: string) => {
  return new URL(host).hostname;
}

export const getUrlAndHeaders = (req: Request): Object => {
  const host: string = req.query.host
  const headers: object = parseHeaders(host, req)
  return { host, headers}
}

export const handoff = (method: string) => (res: Response, { url, headers }: { url: string, headers: any }) => {
  return fetch(url, {
    method,
    headers,
  })
  .then((response: any) => {
    return response.json()
  })
  .then((responseJson: Object) => {
    return res.send(responseJson)
  })
  .catch((err: Error) => console.error(err))
}
interface HeaderAcc {
  [key: string]: any
}

export const findAndSetHeaders = (req: Request) => (headerObject: HeaderAcc, headerKey: string):any => {
  if(!req.get(headerKey)) {
    return headerObject
  }
  return headerObject[headerKey] = req.get(headerKey)
}


export const parseHeaders = (hostname: string, req: Request): object => {
  const headerKeys: Array<string> = config[getApiDomain(hostname)]
  const findAndSetHeadersWithRequest = findAndSetHeaders(req)
  const headerAcc: HeaderAcc = {}

  return headerKeys.reduce(findAndSetHeadersWithRequest, headerAcc)
}

const randomNumber = (num: number): number => Math.round(Math.random() * num)
