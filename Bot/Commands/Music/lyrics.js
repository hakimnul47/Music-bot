const {
    MessageEmbed
} = require("discord.js");
const genius = require("genius-lyrics");
const gClient = new genius.Client();

module.exports = {
    name: "lyrics",
    description: "Lyrics for the current song.",

    async execute(interaction, client) {

        const {
            options,
            member,
            guild
        } = interaction;
        const VoiceChannel = member.voice.channel;

        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: member.voice.channel.id,
            textChannel: interaction.channelId,
            selfDeafen: true
        });

        if (!player.playing && !player.paused) return interaction.reply({
            content: "🔸 |  There is nothing in the queue.",
            ephemeral: true
        })

        const track = player.queue.current;
        const trackTitle = track.title.replace("(Official Video)", "").replace("(Official Audio)", "");
        const actualTrack = await gClient.songs.search(trackTitle);
        const searches = actualTrack[0];
        const lyrics = await searches.lyrics();

        const lyricsEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(`🔹 |  Lyrics for **${trackTitle}**`)
            .setDescription(lyrics)
            .setTimestamp()
        return interaction.reply({
            embeds: [lyricsEmbed]
        })
    }

}