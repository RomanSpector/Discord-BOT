const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    message.channel.send('\n!wa - последняя версия аддона\n!class - викауры по классам\n!dm - диминишинг на неймплейтах\n!slot - номера слотов для экипировки');
};
module.exports.help = {
    name: "help"
};
