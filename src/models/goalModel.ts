import { getModelForClass, prop, modelOptions, Ref } from '@typegoose/typegoose'
import { User } from './userModel'

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Goal {
  @prop({ ref: () => User })
    user: Ref<User>

  @prop({ type: String })
    text: string
}

const GoalModel = getModelForClass(Goal)
export default GoalModel
