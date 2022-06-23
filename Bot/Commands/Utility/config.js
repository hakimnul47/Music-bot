const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
    name: "config",
    description: "Configure Weave.",
    userPermissions: ["ADMINISTRATOR"],

    async execute(interaction, client) {

        mainEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`${interaction.guild.name}'s Config`)
            .setDescription("Please select from the buttons below to configure the following.")
            .setTimestamp()

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('djConfig') //DONE
                .setStyle('DANGER')
                .setLabel('DJ Role'),
            )

        interaction.reply({
            embeds: [mainEmbed],
            components: [row],
            ephemeral: true
        })
    }
}