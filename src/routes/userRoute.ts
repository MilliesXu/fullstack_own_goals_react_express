import express from 'express'

import { createUserHandler, verificationUserHandler } from '../controllers/userController'
import { createuserSchema, verifyUserSchema } from '../schemas/userSchema'
import validateRequest from '../middlewares/validateRequest'

const userRoute = express.Router()

userRoute.post('/', validateRequest(createuserSchema), createUserHandler)
userRoute.get('/:id/:verificationCode', validateRequest(verifyUserSchema), verificationUserHandler)

export default userRoute
