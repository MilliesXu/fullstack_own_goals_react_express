import { Request, Response, NextFunction } from 'express'

import { MyError } from '../middlewares/errorHandler'
import { CreateSessionInput } from '../schemas/authSchema'
import { findUserByEmail, validatePassword } from '../services/userService'
import { signInJWT, verifyJWT } from '../utils/jwt'
import { createSession, deleteSession, findSessionWithId } from '../services/sessionService'

export const createSessionHandler = async (req: Request<{}, {}, CreateSessionInput>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const user = await findUserByEmail(email)
    await validatePassword(user, password)
    const session = await createSession(user._id)
    const accessToken = signInJWT({ userId: user._id, session: session._id }, 'ACCESS_TOKEN_PRIVATE')
    const refreshToken = signInJWT({ userId: user._id, session: session._id }, 'REFRESH_TOKEN_PRIVATE')

    res.cookie('accessToken', accessToken, {
      secure: false,
      httpOnly: true
    })
    res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true
    })
    return res.send({
      firstname: user.firstname,
      lastname: user.lastname,
      verified: user.verified
    })
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}

export const deleteSessionHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionId = res.locals.user.session
    const session = await findSessionWithId(sessionId)
    await deleteSession(session)

    return res.clearCookie('accessToken')
      .clearCookie('refreshToken')
      .send({
        successMessage: 'You have logged out'
      })
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}

export const recreateAccessTokenHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies

    const decoded = verifyJWT<{ session: string }>(refreshToken, 'REFRESH_TOKEN_PUBLIC')

    if (!decoded) {
      throw new MyError('Unauthorized', 401)
    }

    const sessionId = decoded.session
    const session = await findSessionWithId(sessionId)

    if (session.valid) {
      const accessToken = signInJWT({ userId: session.user, session: session._id }, 'ACCESS_TOKEN_PRIVATE')
      res.cookie('accessToken', accessToken, {
        secure: false,
        httpOnly: true
      })
    }

    return res.send()
  } catch (error: any) {
    return res.send()
  }
}
