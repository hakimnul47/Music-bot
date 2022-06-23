//DJS Require
const {
    Client,
    Collection
} = require("discord.js");
const {
    Token
} = require("./config.json");

// Erela Require

const {
    nodes,
    SpotifyClientID,
    SpotifySecret
} = require("./config.json")
const Spotify = require("better-erela.js-spotify").default;
const Apple = require("better-erela.js-apple").default;
const {
    Manager
} = require("erela.js");

// Create Client

const client = new Client({
    partials: ['CHANNEL'],
    intents: 32767
});

// Create collections

client.commands = new Collection();
client.buttons = new Collection();

//Handlers

require("./Handlers/commandsHandler")(client);
require("./Handlers/eventsHandler")(client);
require("./Handlers/buttonHandler")(client);
require("./Handlers/antiCrash")(client);

//Erela Config

client.manager = new Manager({
    nodes,
    plugins: [
        new Spotify({
            clientID: SpotifyClientID,
            clientSecret: SpotifySecret,
        }),
        new Apple(),
    ],
    send: (id, payload) => {
        let guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
});

module.exports = client;

client.login(Token);