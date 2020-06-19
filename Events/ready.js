module.exports = async(client) => {

    client.user.setPresence({
        game: {
            name: "Bot Guapa V1"
        }
    })
};