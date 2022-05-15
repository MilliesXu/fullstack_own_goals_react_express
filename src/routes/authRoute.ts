import express from 'express'

import { createSessionHandler, deleteSessionHandler } from '../controllers/authController'
import { createSessionSchema } from '../schemas/authSchema'
import validateRequest from '../middlewares/validateRequest'
import deserializerUser from '../middlewares/deserializeUser'

const authRoute = express.Router()

authRoute.post('/', validateRequest(createSessionSchema), createSessionHandler)
authRoute.delete('/', deserializerUser, deleteSessionHandler)

export default authRoute
