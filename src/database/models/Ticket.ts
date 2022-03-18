import { Model, BaseModel, Uuid, beforeCreate } from '@discord-factory/storage-next'

@Model('ticket')
export default class Ticket extends BaseModel<Ticket> {
  public id: string

  public channel_id: string
  public user_id: string

  @beforeCreate()
  protected createUUID (model: Ticket) {
    model.id = Uuid.generateV4()
  }
}