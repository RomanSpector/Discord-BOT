const Discord = require("discord.js");
const bot = new Discord.Client();
const cmd = require("./comms.js");

let config = require("./botconfig.json"); 
let prefix = config.prefix;

const channelID = "750386219120328805";
const ReactMsg= "818461072763256873";

const Emojis = {
    SataniaThumbsUp : "815996884811907104",
    KannaZoom : "815997204871380992",
}

bot.on("ready",  () => { 
    console.log(`Запустился бот ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => { 
        console.log(link);
    });

    bot.channels.fetch(channelID)
    .then(force => { 
        return force.messages.fetch(ReactMsg, true)
    })
    // .then(message => {

    //     message.react(message.guild.emojis.cache.get("765835628667207700"));
    //     message.react(message.guild.emojis.cache.get("765835626334388234"));
    //     console.log(message.content);
    // }).then(reactions => {
    //     console.log(reactions)
    // })
});

bot.on("message", (message) => {
  if ( message.author.bot ) return;
  if ( message.channel.type == "dm" ) return;
  if ( !message.content.startsWith(prefix) ) return;

  if ( message.channel.name == "bot-commands"
  || message.author.discriminator == 5943 ) {
        let guildMember = message.member;
        let comm = message.content.trim() + " ";
        let cmd_name = comm.slice(0, comm.indexOf(" "));
        let messArr = comm.split(" ");

        for (key in cmd.comms) {
            var command = prefix + cmd.comms[key].name;
            if ( command == cmd_name ) {
                cmd.comms[key].out(message, guildMember, messArr);
            }
        };
    };
});

function GetGuildMember(guild, userID) {
    return guild.members.cache.find(GuildMember => GuildMember.id == userID )
}

bot.on("messageReactionAdd", (messageReaction, user) => {
    if (user.bot) return
    let emoji = messageReaction.emoji
    let message = messageReaction.message
    let guild = emoji.guild
    let member = GetGuildMember(guild, user.id)

    if ( message.id == ReactMsg ) {
        if ( Emojis[emoji.name] ) {
            member.roles.add(Emojis[emoji.name])
        }
    }
})

bot.on("messageReactionRemove", (messageReaction, user) => {
    if (user.bot) return
    let emoji = messageReaction.emoji
    let message = messageReaction.message
    let guild = emoji.guild
    let member = GetGuildMember(guild, user.id)

    if ( message.id == ReactMsg ) {
        if ( Emojis[emoji.name] ) {
            member.roles.remove(Emojis[emoji.name])
        }
    }
})

function getLogsChannel(guild) {
    return guild.channels.cache.find((channel) => channel.name == "moderator-only");
}

// Announce join/left
bot.on('guildMemberAdd', (member) => {
    let welcomembed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} just joined!`, member.user.avatarURL())
        .setColor("00FF00");
    getLogsChannel(member.guild).send(welcomembed).catch((err) => console.log(err));
});

bot.on('guildMemberRemove', (member) => {
    let welcomembed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag} just left!`, member.user.avatarURL())
        .setColor("FF0000");
    getLogsChannel().send(welcomembed).catch((err) => console.log(err));
});


bot.login(process.env.TOKEN);
