import express from 'express'

import { createSessionHandler } from '../controllers/authController'
import { createSessionSchema } from '../schemas/authSchema'
import validateRequest from '../middlewares/validateRequest'

const authRoute = express.Router()

authRoute.post('/', validateRequest(createSessionSchema), createSessionHandler)

export default authRoute
