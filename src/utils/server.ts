import express from 'express'
import 'dotenv/config'

import routes from '../routes'
import errorHandler from '../middlewares/errorHandler'
import middlewares from '../middlewares'

function createServer () {
  const app = express()
  middlewares(app)
  routes(app)
  app.use(errorHandler)

  return app
}

export default createServer
