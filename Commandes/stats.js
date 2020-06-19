const Discord = require('discord.js');
const moment = require('moment');

module.exports.run = (client, message, args) => {
    const membre = message.mentions.members.first() || message.member;
    // if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }

    message.channel.send({
        embed: {
            color: 0xe43333,
            title: `Statistiques du l'utilisateur **${membre.user.username}**`,
            thumbnail: {
                url: membre.user.displayAvatarURL
            },
            fields: [
                {
                    name: 'ID du détenue :',
                    value: membre.id 
                },
                {
                    name: 'Crée le :',
                    value: moment.utc(membre.user.createdAt).format("LL")
                },
                {
                    name: 'Activité :',
                    value: membre.user.presence.game ? membre.user.presence.game.name : 'Cet utilisateur ne fait aucune activité'
                },
                {
                    name: 'Incarcéré depuis le :',
                    value: moment.utc(membre.joinedAt).format('LL')
                }
            ],
            footer: {
                text: `Informations du détenue ${membre.user.username}`
            }
        }
    });
};

module.exports.help = {
    name: "stats"
}
