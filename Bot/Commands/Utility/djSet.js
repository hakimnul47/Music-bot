const {
    CommandInteraction,
    MessageEmbed
} = require("discord.js");
const DB = require("../../Structures/Schemas/djRoles");

module.exports = {
    name: "dj-set",
    description: "Set the DJ Role.",
    userPermissions: ["ADMINISTRATOR"],
    options: [{
        name: "role",
        description: "DJ Role.",
        type: 8,
        required: true,
    }, ],

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async execute(interaction, client) {

        const {
            options,
            member,
            guild,
            channel
        } = interaction;

        role = interaction.options.getRole("role")

        roleId = role.id

        const DB_found = await DB.findOne({
            guildId: guild.id
        });
        if (DB_found) await DB_found.updateOne({
            enabled: true,
            djRoleId: roleId
        });
        else await DB.create({
            guildId: guild.id,
            enabled: true,
            djRoleId: roleId
        });

        interaction.reply({
            embeds: [new MessageEmbed().setDescription(`DJ Role set to ${role} and above.`).setColor("BLURPLE").setTimestamp()],
            ephemeral: true
        })

    }
}