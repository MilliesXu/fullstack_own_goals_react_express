import { Request, Response, NextFunction } from 'express'

import { MyError } from '../middlewares/errorHandler'
import {
  CreateUserInput,
  VerifyUserInput,
  UpdateUserInput,
  RequestChangePasswordInput,
  ResetPasswordInput
} from '../schemas/userSchema'
import {
  createUser,
  findUserById,
  verifyUser,
  updateUser,
  findUserByEmail,
  setPasswordResetCode,
  setPassword
} from '../services/userService'
import sendEmail from '../utils/mailer'
import { signInJWT } from '../utils/jwt'
import { createSession } from '../services/sessionService'
import { omit } from 'lodash'
import { userPrivateFields } from '../models/userModel'

export const createUserHandler = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    const user = await createUser(body)

    await sendEmail({
      from: 'test@email.com',
      to: user.email,
      subject: 'Please verify your account',
      text: `http://127.0.0.1:3000/verify/${user._id}/${user.verificationCode}`
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
    const session = await createSession(user._id)
    const accessToken = signInJWT({ userId: userVerified._id, session: session._id }, 'ACCESS_TOKEN_PRIVATE')
    const refreshToken = signInJWT({ userId: userVerified._id, session: session._id }, 'REFRESH_TOKEN_PRIVATE')

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

export const updateUserHandler = async (req: Request<{}, {}, UpdateUserInput>, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    const user = await findUserById(res.locals.user.userId)
    const userUpdated = await updateUser(user._id, body)

    res.send({
      firstname: userUpdated.firstname,
      lastname: userUpdated.lastname,
      email: userUpdated.email,
      verified: userUpdated.verified
    })
  } catch (error: any) {
    if (error.code === 11000) next(new MyError('Email is already been used', 403))

    next(new MyError(error.message, error.code))
  }
}

export const getUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await findUserById(res.locals.user.userId)

    res.send(omit(user.toJSON(), userPrivateFields))
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}

export const requestChangePasswordHandler = async (req: Request<{}, {}, RequestChangePasswordInput>, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body
    const user = await findUserByEmail(email)
    const userUpdated = await setPasswordResetCode(user)

    await sendEmail({
      from: 'test@email.com',
      to: userUpdated.email,
      subject: 'Please verify your account',
      text: `http://127.0.0.1:3000/resetPassword/${userUpdated._id}/${userUpdated.passwordResetCode}`
    })

    return res.send({
      successMessage: 'An email has been sent to your email address'
    })
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}

export const resetPasswordHandler = async (req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response, next: NextFunction) => {
  try {
    const { id, passwordResetCode } = req.params
    const { password } = req.body

    const user = await findUserById(id)
    await setPassword(user, passwordResetCode, password)

    res.send({
      successMessage: 'Your password has been changed'
    })
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}
