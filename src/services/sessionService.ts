import { MyError } from '../middlewares/errorHandler'
import SessionModel from '../models/sessionModel'

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
