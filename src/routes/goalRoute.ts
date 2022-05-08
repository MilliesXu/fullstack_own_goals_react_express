import express from 'express'

import validateRequest from '../middlewares/validateRequest'
import deserializerUser from '../middlewares/deserializeUser'
import { createGoalSchema, deleteGoalSchema } from '../schemas/goalSchema'
import { createGoalHandler, deleteGoalHandler, findGoalsHandler } from '../controllers/goalController'

const goalRoute = express.Router()

goalRoute.post('/', deserializerUser, validateRequest(createGoalSchema), createGoalHandler)
goalRoute.get('/', deserializerUser, findGoalsHandler)
goalRoute.delete('/:id', deserializerUser, validateRequest(deleteGoalSchema), deleteGoalHandler)

export default goalRoute
