import { Request, Response, NextFunction } from 'express'

import { MyError } from '../middlewares/errorHandler'
import { CreateUserInput, VerifyUserInput } from '../schemas/userSchema'
import { createUser, findUserById, verifyUser } from '../services/userService'
import sendEmail from '../utils/mailer'
import { signInJWT } from '../utils/jwt'

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    const user = await createUser(body)

    await sendEmail({
      from: 'test@email.com',
      to: user.email,
      subject: 'Please verify your account',
      text: `Verification Code ${user.verificationCode}, Id : ${user._id}`
    })

    return res.send({
      successMessage: 'Verification email has been sent to your email'
    })
  } catch (error: any) {
    if (error.code === 11000) next(new MyError('Email is already been used', 403))

    next(new MyError(error.message, error.code))
  }
}

export const verificationUserHandler = async (req: Request<VerifyUserInput>, res: Response, next: NextFunction) => {
  try {
    const { id, verificationCode } = req.params

    const user = await findUserById(id)
    const userVerified = await verifyUser(user, verificationCode)
    const accessToken = signInJWT({ userId: userVerified._id }, 'ACCESS_TOKEN_PRIVATE')
    const refreshToken = signInJWT({ userId: userVerified._id }, 'REFRESH_TOKEN_PRIVATE')

    return res.send({
      _id: userVerified._id,
      firstname: userVerified.firstname,
      lastname: userVerified.lastname,
      email: userVerified.email,
      verified: userVerified.verified,
      accessToken,
      refreshToken
    })
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}