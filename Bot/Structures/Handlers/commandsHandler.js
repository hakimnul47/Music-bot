const {
    Perms
} = require("../Validation/permissions");
const {
    Client,
    Application,
    ApplicationCommand
} = require("discord.js");
const {
    promisify
} = require("util");
const glob = require("glob");
const PG = promisify(glob)
const Ascii = require("ascii-table");
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const {
    Token
} = require('../config.json');
const {
    ClientID
} = require('../config.json');

/**
 * 
 * @param { Client } client
 * 
 */

module.exports = async (client) => {

    const Table = new Ascii("Weave Commands")

    CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name)
            return Table.addRow(file.split("/")[7], "❌ FAILED", "Missing a name.")

        if (!command.description)
            return Table.addRow(file.split("/")[7], "❌ FAILED", "Missing a description.")

        if (command.permission) {
            if (Perms.includes(command.permission))
                command.defaultPermission = false;
            else
                return Table.addRow(command.name, "❌ FAILED", "Permission is invalid.")
        }

        client.commands.set(command.name, command);

        CommandsArray.push(command);

        await Table.addRow(command.name, "Loaded")

        console.log(Table.toString());

    });

    client.on("ready", async () => {

        const rest = new REST({
            version: '9'
        }).setToken(Token)
        await rest.put(Routes.applicationCommands(ClientID), {
            body: CommandsArray
        })

        console.log("🛠️  Weave Music Commands Set")

    });

}