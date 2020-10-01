const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send('class:\n!warr\n!pala\n!cat');
};
module.exports.help = {
    name: "class"
};
