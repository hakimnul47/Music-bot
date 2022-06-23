const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");

module.exports = {
    name: "commands",
    description: "View all the commands.",

    async execute(interaction, client) {

        mainEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`Commands`)
            .setDescription("**Music Related Commands:**\n> /play - Supports Spotify and Apple Music\n> /volume - Adjust the volume\n> /pause - Pause the player\n> /resume - Resume the player\n> /skip - Skip the current playing song\n> /np - View the current playing song\n> /shuffle - Shuffle the queue\n> /queue - View the current queue\n> /lyrics - Get the lyrics of the current playing song\n> /stop - Stop the player completely\n\n**Utility Commands:**\n> /help - General help command\n> /commands - Where you are currently\n> /stats - View important statistics of Weave\n> /config - Configure certain settings -> e.g DJ")
            .setTimestamp()

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setStyle('LINK')
                .setLabel("Discord Support Server")
                .setURL('https://discord.gg/r9zyJQdGGt'),
                new MessageButton()
                .setStyle('LINK')
                .setLabel("Add Weave")
                .setURL('https://discord.com/api/oauth2/authorize?client_id=985972679263805492&permissions=414501432577&scope=bot%20applications.commands'),
            )

        interaction.reply({
            embeds: [mainEmbed],
            components: [row]
        })
    }
}