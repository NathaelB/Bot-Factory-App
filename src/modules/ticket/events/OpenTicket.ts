import { Event, BaseEvent } from 'ioc:factory/Core/Event'
import {
  CategoryChannel,
  Interaction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  TextChannel
} from 'discord.js'
import TicketBuilder from "App/builder/Ticket";
import Config from "App/utils/Config";
import {Application} from "@discord-factory/core-next";
import {Colors} from "@discord-factory/colorize";
import {addMember, closeButton, removeMember} from "App/modules/ticket/types";

@Event('interactionCreate')
export default class OpenTicket extends BaseEvent {
  public async run (interaction: Interaction): Promise<void> {
    if (!interaction.isButton()) return
    if (interaction.customId === 'ticket-open') {
      if (!await TicketBuilder.verifByUser(interaction.user)) {
        const category = await interaction.guild!.channels.resolve(Config.get('CATEGORY').TICKET) as CategoryChannel
        const channel = await category.guild.channels.create(`ticket-${interaction.user.username}`,{
          parent: category,
          type: 'GUILD_TEXT',
          permissionOverwrites: [
            { id: interaction.guild!.roles.everyone.id, deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']},
            { id: interaction.user.id, allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'], deny: ['CREATE_INSTANT_INVITE', 'MENTION_EVERYONE']},
            { id: Config.get('ROLE_SUPPORT'), allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES']},
          ]
        }) as TextChannel

        const responseReaction = new MessageEmbed({
          author: {name: `Ton ticket a été crée`, iconURL: Application.getClient().user!.displayAvatarURL()},
          description: `${channel}`,
          color: Colors.INVISIBLE
        })

        await interaction.reply({
          embeds: [responseReaction],
          ephemeral: true
        })

        await TicketBuilder.init(channel.id, interaction.user)


        const row = new MessageActionRow({
          type: 'ACTION_ROW',
          components: [closeButton, addMember, removeMember]
        })

        const msg = new MessageEmbed({
          author: {name: `Ticket de ${interaction.user.username}`, iconURL: `${interaction.user!.displayAvatarURL()}`},
          description: `Bienvenue dans votre ${interaction.user},`,
          color: Colors.INVISIBLE
        })

        await channel.send({
          embeds: [msg],
          components: [row]
        })
        return
      }

      const ticket = await TicketBuilder.getByUser(interaction.user)
      const channel = interaction.guild?.channels.resolve(ticket.channel_id) as TextChannel

      await interaction.reply({
        embeds: [new MessageEmbed({
          author: { name: `Tu as déjà un ticket ouvert`, iconURL: Application.getClient().user!.displayAvatarURL()},
          description: `Tu ne peux pas ouvrir un nouveau ticket, car tu en as déjà un : ${channel}`,
          color: Colors.INVISIBLE
        })],
        ephemeral: true
      })
    }
  }
}