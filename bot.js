const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');
const cmd = require("./comms.js");

let config = require('./botconfig.json'); 
let prefix = config.prefix;

bot.on('ready',  () => { 
    console.log(`Запустился бот ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => { 
        console.log(link);
    });
});

bot.on('message', (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm" || message.channel.name != "основной") return;
  if(!message.content.startsWith(prefix)) return;

  let guildMember = message.member;
  let comm = message.content.trim() + " ";
  let comm_name = comm.slice(0, comm.indexOf(" "));
  let messArr = comm.split(" ");

  for (key in cmd.comms) {
      var command = prefix + cmd.comms[key].name;
      if ( command == comm_name ) {
          cmd.comms[comm_count].out(message, guildMember, messArr);
      }
  }
});

bot.login(process.env.TOKEN);
