import { Express } from 'express'

import authRoute from './authRoute'
import userRoute from './userRoute'

export default (app: Express) => {
  app.use('/api/user', userRoute)
  app.use('/api/session', authRoute)
}
