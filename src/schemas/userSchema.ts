import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Email is not valid'),
    firstname: string({
      required_error: 'firstname is required'
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

export const updateUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required'
    }).email('Email is not valid'),
    firstname: string({
      required_error: 'firstname is required'
    }),
    lastname: string({
      required_error: 'lastname is required'
    })
  })
})

export const requestChangePasswordSchema = object({
  body: object({
    email: string({
      required_error: 'email is required'
    }).email('email is not valid')
  })
})

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    passwordResetCode: string()
  }),
  body: object({
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

export type CreateUserInput = TypeOf<typeof createUserSchema>['body']
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params']
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body']
export type RequestChangePasswordInput = TypeOf<typeof requestChangePasswordSchema>['body']
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>
