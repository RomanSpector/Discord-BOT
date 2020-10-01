const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send('\n!WA\n!class\n!DM\n!slot');
};
module.exports.help = {
    name: "help"
};
