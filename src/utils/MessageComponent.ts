import {CommandInteraction, Interaction, MessageEmbed} from "discord.js";
import {Colors} from "@discord-factory/colorize";

export default async function PermissionMissing (interaction: CommandInteraction) {
    await interaction.reply({
        embeds: [new MessageEmbed({
            description: "Permission insuffisante !",
            color: Colors.INVISIBLE
        })],
        ephemeral: true
    })
}