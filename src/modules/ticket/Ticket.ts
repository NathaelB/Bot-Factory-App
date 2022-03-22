import { Command, BaseCommand } from 'ioc:factory/Core/Command'
import {
  CommandInteraction, GuildMember,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Snowflake,
  TextChannel
} from 'discord.js'
import Config from "App/utils/Config";
import {JsonObject} from "App/types";
import {Colors} from "@discord-factory/colorize";
import TicketBuilder from "App/builder/Ticket";
import {openTicket} from "App/modules/ticket/types";

const roleAdmin: string = Config.get('ROLE_ADMIN')

@Command({
  scope: 'GUILDS',
  options: {
    name: 'ticket',
    description: 'ticket description',
    options: [
      {name:"close", type: 'SUB_COMMAND', description: "Supprimer de force un ticket"}
    ]
  },
  permissions: [
    {id: roleAdmin, type: 'ROLE', permission: true}
  ]
})
export default class Ticket extends BaseCommand {
  public async run (interaction: CommandInteraction): Promise<void> {
    if (interaction.options.getSubcommand() === 'close') {
      const channelId = interaction.channelId
      const channel = await interaction.guild!.channels.resolve(channelId) as TextChannel
      if (channel.parentId === Config.get('CATEGORY').TICKET) {
        await TicketBuilder.remove(channel.id, interaction)
        return
      }
      await interaction.reply({
        embeds: [new MessageEmbed({
          description: "Tu n'es pas dans un ticket !",
          color: Colors.INVISIBLE
        })],
        ephemeral: true
      })
      return
    }
    const ticketChannelId = Config.get('CHANNEL').TICKET
    const channel = await interaction.guild!.channels.resolve(ticketChannelId) as TextChannel

    const embed = new MessageEmbed({
      title: "Create ticket",
      description: "If you want to open a ticket, it's very simple, just click on the button below!",
      color: Colors.CYAN_400
    })


    await channel.send({
      embeds: [embed],
      components: [new MessageActionRow({
        components: [openTicket]
      })]
    })

  }
}