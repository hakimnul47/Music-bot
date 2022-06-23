const mongoose = require("mongoose")

module.exports = mongoose.model(
    "djRoleSetup",
        new mongoose.Schema({
            guildId: String,
            enabled: Boolean,
            djRoleId: String,
        })
);