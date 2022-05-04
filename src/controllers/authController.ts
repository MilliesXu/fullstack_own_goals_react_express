import { Request, Response, NextFunction } from 'express'

import { MyError } from '../middlewares/errorHandler'
import { CreateSessionInput } from '../schemas/authSchema'
import { findUserByEmail, validatePassword } from '../services/userService'
import { signInJWT } from '../utils/jwt'

export const createSessionHandler = async (req: Request<{}, {}, CreateSessionInput>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const user = await findUserByEmail(email)
    await validatePassword(user, password)
    const accessToken = signInJWT({ userId: user._id }, 'ACCESS_TOKEN_PRIVATE')
    const refreshToken = signInJWT({ userId: user._id }, 'REFRESH_TOKEN_PRIVATE')

    return res.send({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      verified: user.verified,
      accessToken,
      refreshToken
    })
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}
