import { Request, Response, NextFunction } from 'express'
import { verifyJWT } from '../utils/jwt'
import { MyError } from './errorHandler'

const deserializerUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '')

  if (!accessToken) next(new MyError('Unauthorized', 401))

  const decoded = verifyJWT(accessToken, 'ACCESS_TOKEN_PUBLIC')

  if (!decoded) next(new MyError('Unauthorized', 401))

  res.locals.user = decoded
  next()
}

export default deserializerUser
