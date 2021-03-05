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
    })
    .catch(console.error)
    .then(message => {
        message.react(message.guild.emojis.cache.get("765835628667207700"));
        message.react(message.guild.emojis.cache.get("765835626334388234"));
        console.log(message.content);
    })
    .catch(console.error)
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
    let members = emoji.guild.members
    //let guildMember = members.cache.get(user.id)

    message.channel.send("message.id: " + message.id)
    message.channel.send("ReactMsg: " + ReactMsg)

    if ( message.id == ReactMsg ) {
        if ( emoji.name == "SataniaThumbsUp" ) {
            members.fetch(user.id)
            .then(member => member.roles.add("813395409204150282"))
            .catch(console.error);
        }

        if ( emoji.name == "KannaZoom" ) {
            members.fetch(user.id)
            .then(member => member.roles.add("813395306720264193"))
            .catch(console.error);
        }
    }
})

bot.on("messageReactionRemove", (messageReaction, user) => {
    if (user.bot) return
    let emoji = messageReaction.emoji
    let message = messageReaction.message
    let members = emoji.guild.members
    let guildMember = members.cache.get(user.id)

    message.channel.send("message.id: " + message.id)
    message.channel.send("ReactMsg: " + ReactMsg)

    if ( message.id == ReactMsg ) {
        if ( emoji.name == "SataniaThumbsUp" ) {
            members.fetch(user.id)
            .then(member => member.roles.remove("813395409204150282"))
            .catch(console.error);
        }

        if ( emoji.name == "KannaZoom" ) {
            members.fetch(user.id)
            .then(member => member.roles.remove("813395306720264193"))
            .catch(console.error);
        }
    }
})

bot.login(process.env.TOKEN);
