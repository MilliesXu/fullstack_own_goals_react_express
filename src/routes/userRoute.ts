import express from 'express'

import {
  createUserHandler,
  verificationUserHandler,
  updateUserHandler,
  getUserHandler,
  requestChangePasswordHandler,
  resetPasswordHandler
} from '../controllers/userController'
import {
  createUserSchema,
  verifyUserSchema,
  updateUserSchema,
  requestChangePasswordSchema,
  resetPasswordSchema
} from '../schemas/userSchema'
import validateRequest from '../middlewares/validateRequest'
import deserializerUser from '../middlewares/deserializeUser'

const userRoute = express.Router()

userRoute.post('/', validateRequest(createUserSchema), createUserHandler)
userRoute.put('/', deserializerUser, validateRequest(updateUserSchema), updateUserHandler)
userRoute.get('/', deserializerUser, getUserHandler)
userRoute.get('/requestChangePassword', validateRequest(requestChangePasswordSchema), requestChangePasswordHandler)
userRoute.post('/resetPassword/:id/:passwordResetCode', validateRequest(resetPasswordSchema), resetPasswordHandler)
userRoute.get('/:id/:verificationCode', validateRequest(verifyUserSchema), verificationUserHandler)

export default userRoute
