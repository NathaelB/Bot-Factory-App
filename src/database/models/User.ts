import { Model, BaseModel, Uuid, beforeCreate } from '@discord-factory/storage-next'

@Model('user')
export default class User extends BaseModel<User> {
  public id: string

  public user_id: string

  public exp: number

  public level: number

  @beforeCreate()
  protected createUUID (model: User) {
    model.id = Uuid.generateV4()
  }
}