import { object, string, TypeOf } from 'zod'

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Email is not valid'),
    password: string({
      required_error: 'Password is required'
    }).min(6, 'Password must at least has 6 characters')
  })
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>['body']
