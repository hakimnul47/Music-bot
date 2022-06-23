const {
    MessageEmbed
} = require("discord.js");
const {
    ErrorChannelID
} = require("./config.json");
module.exports = async (client) => {

    process.on('unhandledRejection', (reason, p) => {
        client.channels.cache.get(ErrorChannelID).send({
            embeds: [new MessageEmbed().setColor("RED").setDescription(`Crash Handler:\n\n Reason: ${reason}\n\n P: ${p}`)]
        })
    })
    process.on("uncaughtException", (err, origin) => {
        client.channels.cache.get(ErrorChannelID).send({
            embeds: [new MessageEmbed().setColor("RED").setDescription(`Crash Handler:\n\nError: ${err}\n\nOrigin: ${origin}`)]
        })
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        client.channels.cache.get(ErrorChannelID).send({
            embeds: [new MessageEmbed().setColor("RED").setDescription(`Crash Handler:\n\nError: ${err}\n\nOrigin: ${origin}`)]
        })
    });
    process.on('multipleResolves', (type, promise, reason) => {
        client.channels.cache.get(ErrorChannelID).send({
            embeds: [new MessageEmbed().setColor("RED").setDescription(`Crash Handler:\n\Type: ${type}\n\nPromise: ${promise}\n\nReason: ${reason}`)]
        })

    });

}