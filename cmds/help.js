const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send('\n!wa\n!class\n!dm\n!slot');
};
module.exports.help = {
    name: "help"
};
