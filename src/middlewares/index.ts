import express, { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export default (app: Express) => {
  app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
  app.use(cookieParser())
  app.use(express.json())
}
