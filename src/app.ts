import express from 'express'
import 'dotenv/config'

import connectDB from './utils/connect'
import log from './utils/logger'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'
import middlewares from './middlewares'

const port = parseInt(process.env.PORT as string) || 5000

const app = express()

app.listen(port, () => {
  log.info(`Server is running on port: ${port}`)

  connectDB()
  middlewares(app)
  routes(app)
  app.use(errorHandler)
})
