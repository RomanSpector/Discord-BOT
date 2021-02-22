const config = require('./botconfig.json'); 
const Discord = require('discord.js');

let prefix = config.prefix;
let wow_class = '`warrior/priest/dk/rogue/shaman/paladin/druid/mage/hunter/warlock`';

function test(message) {
    message.channel.send('Test!')
}

function SetRole(message, guildMember, table) {
    if ( !table[1] ) return message.channel.send(`!role ${wow_class}`);
    let role = message.guild.roles.cache.find(role => role.name === table[1]);
    if ( role ) {
        guildMember.roles.add(role.id);
        message.channel.send("<@" + message.author.id + ">" + " получил роль: " + role.name)
    } else {
        message.channel.send(`!role ${wow_class}`)
    }
};

function GetLib(message) {
    message.channel.send('https://yadi.sk/d/9wxHrNwl_13LbA');
}

function GetWeakAuras(message) {
    message.channel.send('https://github.com/Bunny67/WeakAuras-WotLK');
}

function GetHelp(message) {
    message.channel.send('\n!wa - последняя версия аддона\n!lib - библиотеки\n!role [class]');
}

var comms_list = [
    {
        name: "test",
        out: test,
        about: "Тестовая команда"
    },
    {
        name: "role",
        out: SetRole,
        about: "Set role"
    },
    {
        name: "lib",
        out: GetLib,
        about: "Get lib"
    },
    {
        name: "wa",
        out: GetWeakAuras,
        about: "Get WeakAuras"
    },
    {
        name: "help",
        out: GetHelp,
        about: "Get help"
    },
];


module.exports.comms = comms_list;