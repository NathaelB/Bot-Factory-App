import { Event, BaseEvent } from 'ioc:factory/Core/Event'
import {CommandInteraction, GuildMember, Interaction} from 'discord.js'
import TicketBuilder from "App/builder/Ticket";
import Ticket from "App/database/models/Ticket";
import PermissionMissing from "App/utils/MessageComponent";

@Event('interactionCreate')
export default class CloseTicket extends BaseEvent {
  public async run (interaction: CommandInteraction): Promise<void> {
    if (!interaction.isButton()) return
    if (interaction.customId === 'close-ticket') {
      const member = await interaction.guild!.members.resolve(interaction.user.id) as GuildMember
      const ticket = await TicketBuilder.get(interaction.channelId) as Ticket

      if (ticket.user_id === member.user.id) {
        await interaction.reply({
          content: "fermeture du ticket",
          ephemeral: true
        })
        await TicketBuilder.remove(ticket.channel_id, interaction)
        return
      }
      await PermissionMissing(interaction)
    }
  }
}