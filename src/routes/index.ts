import { Express } from 'express'

import authRoute from './authRoute'
import goalRoute from './goalRoute'
import userRoute from './userRoute'

export default (app: Express) => {
  app.use('/api/user', userRoute)
  app.use('/api/session', authRoute)
  app.use('/api/goals', goalRoute)
}
