const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
const DB = require("../../Structures/Schemas/djRoles");

module.exports = {
    name: "interactionCreate",

    /**
     * @param { Client } client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {

        const Commands = ["dj-set", "config", "help", "commands", "stats"] // Commands Array

        const {
            guild
        } = interaction

        const command = client.commands.get(interaction.commandName);

        if (interaction.isCommand()) {

            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                    .setColor("RED")
                    .setDescription("Sorry, an error has occured.")
                ]
            }) && client.commands.delete(interaction.commandName);

            if (interaction.channel.type === 'DM') return;

            if (!interaction.member.permissions.has(command.userPermissions || [])) return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Required permission: ${command.userPermissions}.`)
                ],
                ephemeral: true
            })

            if (!Commands.includes(command?.name)) {

                const DB_found = await DB.findOne({
                    guildId: guild.id
                });

                try {

                    if (DB_found.enabled === true) {

                        let role = interaction.guild.roles.cache.find(r => r.id === `${DB_found.djRoleId}`);

                        const ans = role.comparePositionTo(interaction.member.roles.highest)

                        if (ans > 0) {
                            return interaction.reply({
                                content: "🔸 DJ Mode is enabled, you do not have sufficent permissions.",
                                ephemeral: true
                            })
                        }

                    }
                } catch (error) {}

            }

            command.execute(interaction, client)

        }

    }

}