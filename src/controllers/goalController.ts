import { Request, Response, NextFunction } from 'express'

import { MyError } from '../middlewares/errorHandler'
import { CreateGoalInput, DeleteGoalParams } from '../schemas/goalSchema'
import { createGoal, findGoals, findGoalById, deleteGoal } from '../services/goalService'

export const createGoalHandler = async (req: Request<{}, {}, CreateGoalInput>, res: Response, next: NextFunction) => {
  try {
    const body = req.body
    const userId = res.locals.user.userId
    const goal = await createGoal(body, userId)

    res.send({
      goal,
      successMessage: 'Successfully create goal'
    })
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}

export const findGoalsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = res.locals.user.userId
    const goals = await findGoals(userId)

    res.send(goals)
  } catch (error: any) {
    next(new MyError(error.mesage, error.code))
  }
}

export const deleteGoalHandler = async (req: Request<DeleteGoalParams>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const userId = res.locals.user.userId

    const goal = await findGoalById(id)
    await deleteGoal(goal, userId)

    res.send({
      successMessage: 'Successfully delete goal'
    })
  } catch (error: any) {
    next(new MyError(error.message, error.code))
  }
}
