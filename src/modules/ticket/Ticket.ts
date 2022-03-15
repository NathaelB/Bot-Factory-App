import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import { CommandInteraction, Snowflake } from 'discord.js'
import Config from "App/utils/Config";
import {JsonObject} from "App/types";

@Command({
  scope: 'GUILDS',
  options: {
    name: 'ticket',
    description: 'ticket description',
    options: []
  },
  permissions: [
    {id: Config.get<JsonObject>('ROLE').ADMIN, type:'ROLE', permission: true}
  ]
})
export default class Ticket extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {
    await interaction.reply({
      content: "Tu es beau",
      ephemeral: true
    })
  }
}