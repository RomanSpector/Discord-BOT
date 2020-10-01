const Discord = require('discord.js'); 
let config = require('./botconfig.json'); 
let prefix = config.prefix;

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs');


fs.readdir('./cmds',(err,files)=>{
  if(err) console.log(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) console.log("Нет команд для загрузки!");
  console.log(`Загружено ${jsfiles.length} команд`);
  jsfiles.forEach((f,i) =>{
    let props = require(`./cmds/${f}`);
    console.log(`${i+1}.${f} Загружен!`);
    bot.commands.set(props.help.name,props);
  })

})

bot.on('ready', () => { 
    console.log(`Запустился бот ${bot.user.username}`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => { 
        console.log(link);
    });
});

bot.on('message', message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    let user = message.author.username;
    let userid = message.author.id;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if(!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length))
    if(cmd) cmd.run(bot,message,args);
});

bot.login(process.env.TOKEN);