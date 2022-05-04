import { Express } from 'express'

import userRoute from './userRoute'

export default (app: Express) => {
  app.use('/api/user', userRoute)
}
