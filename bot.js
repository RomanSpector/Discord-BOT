const Discord = require("discord.js");
const bot = new Discord.Client();
const cmd = require("./comms.js");

let config = require("./botconfig.json"); 
let prefix = config.prefix;

const channelID = "761857830923665418";
const ReactMsg= "817331548256731167";

bot.on("ready",  () => { 
    console.log(`Запустился бот ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => { 
        console.log(link);
    });

    bot.channels.fetch(channelID)
    .then(force => { 
        return force.messages.fetch(ReactMsg, true)
    }).then(message => {
        message.react(message.guild.emojis.cache.get("765835628667207700"));
        message.react(message.guild.emojis.cache.get("765835626334388234"));
        console.log(message.content);
    })
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

bot.on("messageReactionAdd", (messageReaction, user) => {
    if (user.bot) return
    let emoji = messageReaction.emoji
    let message = messageReaction.message
    let guild = emoji.guild
    let members = guild.members
    let guildMember = members.cache.get(user.id)

    message.channel.send(message.id)

    if ( message.id == ReactMsg && guildMember) {
        message.channel.send('здаррова')
        if ( emoji.name == "SataniaThumbsUp" ) {
            guildMember.roles.add("815996884811907104");
        }

        if ( emoji.name == "KannaZoom" ) {
            guildMember.roles.add("815997204871380992");
            message.channel.send("я долбаеб и не выдаю роль")
        } 
    }
})

bot.on("messageReactionRemove", (messageReaction, user) => {
    if (user.bot) return
    let emoji = messageReaction.emoji
    let message = messageReaction.message
    let guild = emoji.guild
    let members = guild.members
    let guildMember = members.cache.get(user.id)

    if ( message.id == ReactMsg && guildMember) {
        if ( emoji.name == "SataniaThumbsUp" ) {
            guildMember.roles.remove("815996884811907104");
        }

        if ( emoji.name == "KannaZoom" ) {
            guildMember.roles.remove("815997204871380992");
        } 
    }
})

bot.login(process.env.TOKEN);
