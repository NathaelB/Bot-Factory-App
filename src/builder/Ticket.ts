import Ticket from "App/database/models/Ticket";
import {Interaction, TextChannel, User} from "discord.js";

export default class TicketBuilder {

    private static $instance: TicketBuilder
    private channelId: string

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
        await channel.delete()
        return await ticket.delete()
    }
}