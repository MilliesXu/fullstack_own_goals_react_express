import { getModelForClass, prop, modelOptions, Severity, pre, DocumentType } from '@typegoose/typegoose'
import argon2 from 'argon2'
import { nanoid } from 'nanoid'

// eslint-disable-next-line no-use-before-define
@pre<User>('save', async function () {
  if (!this.isModified('password')) return

  const hashedPassword = await argon2.hash(this.password)

  this.password = hashedPassword
})
@modelOptions({
  schemaOptions: {
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class User {
  @prop({ lowercase: true, type: String, required: true, unique: true })
    email: string

  @prop({ required: true, type: String })
    firstname: string

  @prop({ required: true, type: String })
    lastname: string

  @prop({ required: true, type: String })
    password: string

  @prop({ required: true, type: String, default: () => nanoid() })
    verificationCode: string

  @prop({ type: String || null })
    passwordResetCode: string | null

  @prop({ type: Boolean, default: false })
    verified: Boolean

  async validatePassword (this: DocumentType<User>, candidatePassword: string) {
    try {
      return argon2.verify(this.password, candidatePassword)
    } catch (Error: any) {
      return false
    }
  }
}

export const userPrivateFields = [
  'password',
  'verificationCode',
  'passwordResetCode',
  'createdAt',
  'updatedAt',
  '__v'
]

const UserModel = getModelForClass(User)

export default UserModel
