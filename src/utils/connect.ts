import mongoose from 'mongoose'

import log from './logger'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string)

    log.info(`Successfully connect to database ${conn.connection.host}`)
  } catch (error: any) {
    log.error(error)
    process.exit(1)
  }
}

export default connectDB
