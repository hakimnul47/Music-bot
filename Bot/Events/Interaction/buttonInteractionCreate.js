const {
    ButtonInteraction,
    MessageEmbed
} = require("discord.js")
const DB = require("../../Structures/Schemas/djRoles");

module.exports = {
    name: "interactionCreate",

    /**
     * @param {ButtonInteraction} interaction
     */

    async execute(interaction, client) {

        const Buttons = ["enableDjRole", "disableDjRole", "djConfig"] // Commands Array

        if (!interaction.isButton()) return;

        const {
            guild
        } = interaction

        const Button = client.buttons.get(interaction.customId);

        if (Button.permission && !interaction.member.permissions.has(Button.permission))
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Required permission: ${Button.permission}.`)
                ],
                ephemeral: true
            })

        if (Button.ownerOnly && interaction.member.id !== interaction.guild.ownerId)
            return interaction.reply({
                embeds: [new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`Required permission: OWNER ONLY}.`)
                ],
                ephemeral: true
            })

        if (!Buttons.includes(Button.id)) {

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

        Button.execute(interaction, client);

    }
}