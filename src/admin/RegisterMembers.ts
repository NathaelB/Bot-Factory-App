import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import {CommandInteraction, GuildMember} from 'discord.js'
import Config from "App/utils/Config"
import UserBuilder from "App/builder/User";

const roleAdmin: string = Config.get('ROLE_ADMIN')

@Command({
  scope: 'GUILDS',
  options: {
    name: 'registermembers',
    description: "Permet d'enregister la totalité des membres présent sur le discord",
    options: []
  },
  permissions: [
    {id: roleAdmin, type: 'ROLE', permission: true}
  ]
})
export default class RegisterMembers extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {

    const members = await interaction.guild!.members.fetch()
    await Promise.all(members.map((member: GuildMember) => UserBuilder.init(member.user.id)))
  }
}