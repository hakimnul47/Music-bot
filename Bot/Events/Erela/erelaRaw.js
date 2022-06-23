const client = require("../../Structures/index.js");

client.on("raw", (d) => client.manager.updateVoiceState(d));