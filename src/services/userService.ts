import { DocumentType } from '@typegoose/typegoose'

import { MyError } from '../middlewares/errorHandler'
import UserModel, { User } from '../models/userModel'

export const createUser = async (input: Partial<User>) => {
  return await UserModel.create(input)
}

export const findUserById = async (id: string) => {
  const user = await UserModel.findById(id)

  if (!user) throw new MyError('User not found', 404)

  return user
}

export const verifyUser = async (user: DocumentType<User>, verificationCode: string) => {
  if (!user.verified) {
    if (user.verificationCode === verificationCode) {
      user.verified = true

      await user.save()
    } else {
      throw new MyError('Verification failed', 403)
    }
  }

  return user
}

export const findUserByEmail = async (email: string) => {
  const user = await UserModel.findOne({ email })

  if (!user) throw new MyError('Invalid email or password', 400)

  return user
}

export const validatePassword = async (user: DocumentType<User>, password: string) => {
  if (!user.verified) throw new MyError('User account is not validate', 400)

  const isValid = await user.validatePassword(password)

  if (!isValid) throw new MyError('Invalid email or password', 400)
}
