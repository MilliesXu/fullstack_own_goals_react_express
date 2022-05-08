import { getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose'
import { User } from './userModel'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Session {
  @prop({ ref: () => User })
    user: Ref<User>

  @prop({ type: Boolean, default: true })
    valid: boolean
}

const SessionModel = getModelForClass(Session)
export default SessionModel
