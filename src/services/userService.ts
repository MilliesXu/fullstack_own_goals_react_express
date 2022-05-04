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
