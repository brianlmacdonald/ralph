import { IncomingMessage, ServerResponse } from "http";

const http = require('http')

const port: string = '8080'
const hostname: string= '127.0.0.1'

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello world\n')
})

server.listen(port, hostname, () => {
  console.log("I'm gonna wreck it!")
})