import connectDB from './utils/connect'
import log from './utils/logger'
import createServer from './utils/server'

const port = parseInt(process.env.PORT as string) || 5000

const app = createServer()

app.listen(port, () => {
  log.info(`Server is running on port: ${port}`)

  connectDB()
})
