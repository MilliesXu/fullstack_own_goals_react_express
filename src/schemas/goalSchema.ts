import { object, string, TypeOf } from 'zod'

export const createGoalSchema = object({
  body: object({
    text: string({
      required_error: 'text is required'
    })
  })
})

export const deleteGoalSchema = object({
  params: object({
    id: string()
  })
})

export type CreateGoalInput = TypeOf<typeof createGoalSchema>['body']
export type DeleteGoalParams = TypeOf<typeof deleteGoalSchema>['params']
