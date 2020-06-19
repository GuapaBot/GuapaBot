const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fs = require('fs');

fs.readdir('./Commandes/', (error, f) => {
    if (error) { return console.error(error); }
        let commandes = f.filter(f => f.split('.').pop() === 'js');
        if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }

        commandes.forEach((f) => {
            let commande = require(`./Commandes/${f}`);
            console.log(`${f} commande chargée !`);
            client.commands.set(commande.help.name, commande);
        });
});

fs.readdir('./Events/', (error, f) => {
    if (error) { return console.error(error); }
        console.log(`${f.length} events chargés`);

        f.forEach((f) => {
            let events = require(`./Events/${f}`);
            let event = f.split('.')[0];
            client.on(event, events.bind(null, client));
        });
});


const DiscordAntiSpam = require("discord-anti-spam");
const AntiSpam = new DiscordAntiSpam({
  warnThreshold: 3, 
  banThreshold: 7, 
  maxInterval: 2000, 
  warnMessage: "{@user}, S'il te plait arrête de spammer", 
  banMessage: "**{user_tag}** a été banni pour avoir spam.", 
  maxDuplicatesWarning: 7, 
  maxDuplicatesBan: 15, 
  deleteMessagesAfterBanForPastDays: 1, 
  exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR", "MANAGE_GUILD", "BAN_MEMBERS"], 
  ignoreBots: true, 
  verbose: false, 
  ignoredUsers: [], 
  ignoredRoles: [], 
  ignoredGuilds: [], 
  ignoredChannels: [] 
});
 
AntiSpam.on("warnEmit", (member) => console.log(`Attempt to warn ${member.user.tag}.`));
AntiSpam.on("warnAdd", (member) => console.log(`${member.user.tag} a été averti.`));
AntiSpam.on("kickEmit", (member) => console.log(`Attempt to kick ${member.user.tag}.`));
AntiSpam.on("kickAdd", (member) => console.log(`${member.user.tag} a été kick.`));
AntiSpam.on("banEmit", (member) => console.log(`Attempt to ban ${member.user.tag}.`));
AntiSpam.on("banAdd", (member) => console.log(`${member.user.tag} a été banni.`));
AntiSpam.on("dataReset", () => console.log("Le module cache a été clear."));
 
client.on("ready", () => console.log(`Logged in as ${client.user.tag}.`));
 
client.on("message", (msg) => {
  AntiSpam.message(msg);
});

client.on("guildMemberAdd", user =>{
  let joinEmbed = new Discord.RichEmbed()
  .setColor("#52f411")
  .setAuthor(user.user.username, user.user.displayAvatarURL)
  .setDescription(":grin: Wsh " + user + " bienvenue a toi en 𝔾𝕒𝕣𝕕𝕒𝕧 :police_officer:")
  .setFooter(`Nous sommes désormais ${user.guild.memberCount} personnes !`)
  user.guild.channels.get("722175732263944324").send(joinEmbed)
});

client.on("guildMemberRemove", user =>{
  let leaveEmbed = new Discord.RichEmbed()
  .setColor("#f41111")
  .setAuthor(user.user.username, user.user.displayAvatarURL)
  .setDescription(":angry: Oh ! " + user + " est libérable il quitte 𝕃𝕒 𝔾𝕒𝕣𝕕𝕒𝕧 👮 !")
  .setFooter("Nous sommes désormais ${user.guild.memberCount} personnes !")
  user.guild.channels.get("722175732263944324").send(leaveEmbed)
});

client.login(process.env.TOKEN);
