const config = require("./botconfig.json"); 
const Discord = require("discord.js");

let prefix = config.prefix;
let wow_class = "`warrior/priest/deathknight/rogue/shaman/paladin/druid/mage/hunter/warlock`";
let markdown = `Вы можете отформатировать свой код, чтобы его было гораздо легче читать, используя форматирование Discord "markdown":
\\\`\\\`\\\`lua
--ВАШ КОД
\\\`\\\`\\\`
• \` - это "обратная стрелка", обычно расположена слева от клавиши 1, а не апостроф.
Если вы сомневаетесь скопируйте вставьте вышеизложенное и добавьте свой код
• Как бонус, можно использовать подсветку синтаксиса:
  ◘ Используйте имя языка, который вы используете после "обратной стрелки", обеспечивает подсветку синтаксиса.
  ◘ "lua" is the language used in WA custom code blocks.`;

let UnitClass = {};
UnitClass.warrior     = "Warrior"
UnitClass.warlock     = "warlock"
UnitClass.druid       = "Druid"
UnitClass.paladin     = "paladin"
UnitClass.hunter      = "Hunter"
UnitClass.mage        = "mage"
UnitClass.rogue       = "Rogue"
UnitClass.priest      = "Priest"
UnitClass.shaman      = "Shaman"
UnitClass.deathknight = "Death Knight"

function SendMarkdown(message) {
    message.channel.send(markdown)
};

function SetRole(message, guildMember, table) {
    let msgRole = table[1]
    if (!msgRole) return message.channel.send(`!role ${wow_class}`);
    if ( UnitClass[msgRole] ) {
        let UnitRole = message.guild.roles.cache.find(role =>
            role.name.replace(" ", "").toLowerCase() === msgRole
        );
        if (UnitRole) {
            guildMember.roles.add(UnitRole.id);
            message.channel.send("<@" + message.author.id + ">" + " получает роль: " + UnitRole.name)
        }
    } else {
        message.channel.send(`!role ${wow_class}`)
    };
};

function GetLib(message) {
    message.channel.send("https://yadi.sk/d/9wxHrNwl_13LbA");
}

function GetWeakAuras(message) {
    message.channel.send("https://github.com/Bunny67/WeakAuras-WotLK");
}

function GetHelp(message) {
    message.channel.send("\n!wa - последняя версия аддона\n!lib - библиотеки\n!role [class] - получить роль по классу");
}

function GetTriggerActivation(message) {
    message.channel.send(`
Требуется для активации = custom
\`\`\`lua
function(trigger)
    return trigger[1] and (trigger[2] or trigger[3])
end
\`\`\`
    `)
};

function GetCLEU(message) {
    message.channel.send(`
CLEU = COMBOT_LOG_EVENT_UNFILTERED
event: \`CLEU\` or \`CLEU:subEvent1:subEvent2:etc\`
\`\`\`lua
function(event, ...)
    local timestamp, subEvent, sourceGUID, sourceName, sourceFlags, destGUID, destName, destFlags, spellID, spellName, spellSchool, missType, amountMissed = ...
end
\`\`\`
    `)
};

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
    {
        name: "`",
        out: SendMarkdown,
        about: "Get markdown"
    },
    {
        name: "customactivation",
        out: GetTriggerActivation,
        about: "Get trigger activation"
    },
    {
        name: "cleu",
        out: GetCLEU,
        about: "Get CLEU"
    },
];


module.exports.comms = comms_list;
