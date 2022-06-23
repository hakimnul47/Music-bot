const mongoose = require("mongoose")

module.exports = mongoose.model(
    "trackEnd",
        new mongoose.Schema({
            guildId: String,
            messageId: String,
        })
);