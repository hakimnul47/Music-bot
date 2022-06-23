const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
const DB = require("../../Structures/Schemas/djRoles");

module.exports = {
    id: "enableDjRole",
    permission: "ADMINISTRATOR",

    async execute(interaction, client) {

        const {
            guild
        } = interaction

        const DB_found = await DB.findOne({
            guildId: guild.id
        });
        if (DB_found) await DB_found.updateOne({
            enabled: true
        });
        else await DB.create({
            guildID: guild.id,
            enabled: true
        });

        interaction.reply({
            embeds: [new MessageEmbed().setDescription(`DJ Role has now been enabled`).setColor("BLURPLE").setTimestamp()],
            ephemeral: true
        })

    }
}