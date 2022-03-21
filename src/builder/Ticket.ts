import Ticket from "App/database/models/Ticket";
import {Interaction, Message, MessageAttachment, TextChannel, User} from "discord.js";
import path from "path";
import * as fs from "fs";
import Config from "App/utils/Config";

export default class TicketBuilder {

    private static $instance: TicketBuilder
    private channelId: string

    private static async createHistory (channel: TextChannel, ticket: Ticket, interaction: Interaction) {
        const historyDir = path.join(process.cwd(), 'history')
        const filePath = path.join(historyDir, `${interaction.channel?.id}.html`)

        if (!fs.existsSync(historyDir)) {
            await fs.promises.mkdir(historyDir)
        }

        const messages = await channel?.messages.fetch()

        await fs.promises.writeFile(path.join(filePath),`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
          <title>${interaction.user.username} (${interaction.user.id})</title>
        </head>
        <body class="overflow-x-hidden py-20">
          <div style="width: 50vw; margin-left: auto; margin-right: auto;" class="flex flex-col">
            ${messages!.filter((message: Message) => !message.author.bot)
            .map((message: Message) => (`
                <div class="flex space-x-5 py-5 items-center">
                  <div class="text-gray-800 font-bold flex flex-row items-center">
                    <img class="w-12 h-12 rounded-full" src="${message.author.displayAvatarURL()}"/>
                    <div class="flex flex-col">
                      <span>
                      ${message.author.username}
                      </span>
                      <span class="text-gray-500 font-normal">
                        ${message.author.id}
                      </span>
                    </div>
                  </div>
                  ${message.content && `<div>${message.content}</div>`} 
                  ${message.attachments
                .map((attachment: MessageAttachment) => `<img class="w-56 rounded-md" src="${attachment.url}" />`)
                .join('\n')
            }
                </div>
              `)).join('\n')}
          </div>
        </body>
      </html>`)

        const ticketLogChannel = interaction.guild!.channels.resolve(Config.get('CHANNEL').LOGS_TICKET) as TextChannel
        const file = new MessageAttachment(filePath)
        await ticketLogChannel.send({
            content: `Ticket de ${interaction.guild!.members.cache.get(ticket!.user_id)}`,
            files: [file],
        })
        await fs.promises.rm(historyDir, {recursive: true})
    }

    public static async get (id: string): Promise<Ticket> {
        return await Ticket.findBy('channel_id', id)
    }

    public static async getByUser (user: User): Promise<Ticket> {
        return await Ticket.findBy('user_id', user.id)
    }

    public static async verif (id: string): Promise<boolean> {
        const ticket = await this.get(id)
        return !!ticket
    }

    public static async verifByUser (user: User): Promise<boolean> {
        const ticket = await this.getByUser(user)
        return !!ticket
    }

    public static async init (id: string, user: User): Promise<Ticket | undefined> {
        return await Ticket.create({
            user_id: user.id,
            channel_id: id,
        })
    }

    public static async update (id:string, user: User): Promise<{ $persisted: boolean }> {
        const ticket = await this.get(id)
        return await ticket.update({
            user_id: user.id
        })
    }

    public static async remove (id: string, interaction: Interaction): Promise<{$deleted: boolean}> {
        const ticket = await this.get(id) as Ticket
        const channel = await interaction.guild!.channels.resolve(id) as TextChannel
        await this.createHistory(channel, ticket, interaction)
        await channel.delete()
        return await ticket.delete()
    }


}