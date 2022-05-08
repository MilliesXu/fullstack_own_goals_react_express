import { Request, Response, NextFunction } from 'express'
import { isNumber } from 'lodash'

export class MyError extends Error {
  private code: number

  constructor (message: string, code: number) {
    super(message)
    this.code = code
  }
}

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const message = err.message ? err.message : 'Internal server error'
  const code = isNumber(err.code) ? err.code : 500

  res.status(code).send({
    errorMessage: message,
    stack: process.env.NODE_ENV as string === 'development' ? err.stack : null
  })
}

export default errorHandler
