import { Request, Response, NextFunction } from 'express'

import { MyError } from '../middlewares/errorHandler'
import { CreateSessionInput } from '../schemas/authSchema'
import { findUserByEmail, validatePassword } from '../services/userService'
import { signInJWT } from '../utils/jwt'
import { createSession } from '../services/sessionService'

export const createSessionHandler = async (req: Request<{}, {}, CreateSessionInput>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const user = await findUserByEmail(email)
    await validatePassword(user, password)
    const session = await createSession(user._id)
    const accessToken = signInJWT({ userId: user._id, session: session._id }, 'ACCESS_TOKEN_PRIVATE')
    const refreshToken = signInJWT({ userId: user._id, session: session._id }, 'REFRESH_TOKEN_PRIVATE')

    return res.cookie('accessToken', accessToken, {
      secure: false,
      httpOnly: true
    }).cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true
    }).send({
      firstname: user.firstname,
      lastname: user.lastname,
      verified: user.verified
    })
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}
