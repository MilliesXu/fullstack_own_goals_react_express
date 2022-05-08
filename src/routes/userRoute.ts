import express from 'express'

import { createUserHandler, verificationUserHandler, updateUserHandler, getUserHandler } from '../controllers/userController'
import { createUserSchema, verifyUserSchema, updateUserSchema } from '../schemas/userSchema'
import validateRequest from '../middlewares/validateRequest'
import deserializerUser from '../middlewares/deserializeUser'

const userRoute = express.Router()

userRoute.post('/', validateRequest(createUserSchema), createUserHandler)
userRoute.put('/', deserializerUser, validateRequest(updateUserSchema), updateUserHandler)
userRoute.get('/', deserializerUser, getUserHandler)
userRoute.get('/:id/:verificationCode', validateRequest(verifyUserSchema), verificationUserHandler)

export default userRoute
