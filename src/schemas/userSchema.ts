import { object, string, TypeOf } from 'zod'

export const createuserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Email is not valid'),
    firstname: string({
      required_error: 'firsname is required'
    }),
    lastname: string({
      required_error: 'lastname is required'
    }),
    password: string({
      required_error: 'password is required'
    }).min(6, 'password must be longer than 6 characters'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required'
    })
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'password must be match',
    path: ['passwordConfirmation']
  })
})

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string()
  })
})

export type CreateUserInput = TypeOf<typeof createuserSchema>['body']
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params']
