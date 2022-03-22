import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import { CommandInteraction } from 'discord.js'

@Command({
  scope: 'GUILDS',
  options: {
    name: 'level',
    description: 'level description',
    options: []
  }
})
export default class Level extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {
    // Your code here
  }
}