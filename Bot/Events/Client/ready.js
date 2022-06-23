const {
    Database
} = require("../../Structures/config.json")
const {
    mongoose
} = require('mongoose')
const DB_COUNTER = require("../../Structures/Schemas/songsPlayed");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {

        console.log("🛠️  Weave Music Online")

        client.manager.init(client.user.id);

        setInterval(async function() {
            const DBFoundCounter = await DB_COUNTER.findOne({
                ident: "counter"
            });
            client.user.setActivity(`to ${DBFoundCounter.songsPlayed} songs today! `, {
                type: "LISTENING",
            })
        }, 10000)

        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("🛠️  Now connected to Mongo DB")
        }).catch((err) => {
            console.log(err)
        })

    }
}