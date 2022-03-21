import { Event, BaseEvent } from 'ioc:factory/Core/Event'
import {GuildMember, Message, MessageEmbed} from 'discord.js'
import UserBuilder from "App/builder/User";
import {Colors} from "@discord-factory/colorize";

@Event('messageCreate')
export default class OnMessage extends BaseEvent {
  public async run (message: Message): Promise<void> {
    if (message.author.bot) return
    if (!await UserBuilder.verif(message.author.id)) {
      await UserBuilder.init(message.author.id)
      return
    }
    const userData = await UserBuilder.get(message.author.id)
    const member = await message.guild!.members.resolve(userData.user_id) as GuildMember

    if (Math.pow(userData.exp, 0.25) >= userData.level+1) {
      await UserBuilder.modif(userData.user_id, {
        level: userData.level + 1,
      })
      await message.reply({
        embeds: [new MessageEmbed({
          description: "Level-Up",
          color: Colors.INVISIBLE
        })]
      })
      return
    }
    await UserBuilder.modif(userData.user_id, {
      exp: userData.exp+ Math.floor(Math.random() * (3 - 1) + 1)
    })
  }
}