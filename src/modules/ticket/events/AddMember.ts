import { Event, BaseEvent } from 'ioc:factory/Core/Event'
import {
  CommandInteraction,
  GuildMember,
  Interaction,
  Message,
  MessageEmbed,
  Role,
  TextChannel
} from 'discord.js'
import TicketBuilder from "App/builder/Ticket";
import Ticket from "App/database/models/Ticket";
import Config from "App/utils/Config";
import PermissionMissing from "App/utils/MessageComponent";
import {Colors} from "@discord-factory/colorize";

@Event('interactionCreate')
export default class AddMember extends BaseEvent {
  public async run (interaction: CommandInteraction): Promise<void> {
    if (!interaction.isButton()) return
    if (interaction.customId === "ticket-add-member") {
      const roleSupport = await interaction.guild!.roles.resolve(Config.get('ROLE_SUPPORT')) as Role
      const ticket = await TicketBuilder.get(interaction.channelId) as Ticket
      const member = await interaction.guild!.members.resolve(interaction.user.id) as GuildMember
      if (ticket.user_id === interaction.user.id || member.roles.cache.has(roleSupport.id)) {
        const filter = () => {
          return ticket.user_id === interaction.user.id || member.roles.cache.has(roleSupport.id)
        }
        await interaction.reply({
          embeds: [new MessageEmbed({
            description: "Veuillez indiquer l'id de l'utilisateur",
            color: Colors.INVISIBLE
          })],
          ephemeral: true
        })
        const channel = interaction.channel as TextChannel
        interaction.channel!
            .createMessageCollector({filter, max: 1,})
            .on('collect', async (message: Message) => {
              const target = await message.guild!.members.resolve(message.content) as GuildMember;
              if (!target) {
                await message.reply({
                  embeds: [new MessageEmbed({
                    description: "L'utilisateur n'existe pas !",
                    color: Colors.INVISIBLE
                  })],

                })
                return
              }
              await message.reply({
                embeds: [new MessageEmbed({
                  description: `L'utilisateur: ${target.user} a été ajouté au ticket !`,
                  color: Colors.INVISIBLE
                })],
              })
              await channel.permissionOverwrites.edit(
                  target!.id, {
                    VIEW_CHANNEL: true,
                    READ_MESSAGE_HISTORY: true,
                    SEND_MESSAGES: true,
                    CREATE_INSTANT_INVITE: false,
                    MENTION_EVERYONE: false
                  }
              );
            })
        return
      }
      await PermissionMissing(interaction)
    }
  }
}