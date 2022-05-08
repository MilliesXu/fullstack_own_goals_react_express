import { DocumentType } from '@typegoose/typegoose'
import { MyError } from '../middlewares/errorHandler'
import GoalModel, { Goal } from '../models/goalModel'

export const createGoal = async (body: Partial<Goal>, userId: string) => {
  return await GoalModel.create({ ...body, user: userId })
}

export const findGoals = async (userId: string) => {
  const goals = await GoalModel.find({ user: userId })

  return goals
}

export const findGoalById = async (id: string) => {
  const goal = await GoalModel.findById(id)

  if (!goal) throw new MyError('Goal is not exist', 404)

  return goal
}

export const deleteGoal = async (goal: DocumentType<Goal>, userId: string) => {
  if (goal.user?.toString() === userId) {
    await goal.delete()
  } else {
    throw new MyError('Unauthorized', 403)
  }
}
