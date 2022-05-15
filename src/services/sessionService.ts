import { DocumentType } from '@typegoose/typegoose'

import { MyError } from '../middlewares/errorHandler'
import SessionModel, { Session } from '../models/sessionModel'

export const createSession = async (userId: string) => {
  let session = await SessionModel.findOne({ user: userId })

  if (!session) session = await SessionModel.create({ user: userId })

  return session
}

export const findSessionWithId = async (id: string) => {
  const session = await SessionModel.findById(id)

  if (!session) throw new MyError('Unauthorized', 401)

  return session
}

export const deleteSession = async (session: DocumentType<Session>) => {
  session.valid = false

  return await session.save()
}
