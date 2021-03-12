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
UnitClass.warlock     = "Warlock"
UnitClass.druid       = "Druid"
UnitClass.paladin     = "Paladin"
UnitClass.hunter      = "Hunter"
UnitClass.mage        = "Mage"
UnitClass.rogue       = "Rogue"
UnitClass.priest      = "Priest"
UnitClass.shaman      = "Shaman"
UnitClass.deathknight = "Death Knight"

function SendMarkdown(message) {
    message.channel.send(markdown)
};

function SetRole(message, guildMember, table) {
    let msgRole = table[1].toLowerCase()
    if (!msgRole) return message.channel.send(`!role ${wow_class}`);

    guildMember.roles.cache.find(role => 
        role.name.toLowerCase() == msgRole
    )
 
    if ( UnitClass[msgRole] ) {
        let UnitRole = message.guild.roles.cache.find(role =>
            role.name.replace(" ", "").toLowerCase() === msgRole
        );

        if ( UnitRole && table[2].toLowerCase() === "remove" ) {
            guildMember.roles.remove(UnitRole.id);
            return message.channel.send("<@" + message.author.id + ">" + " удаляет роль: " + UnitRole.name)
        } 
        
        if ( UnitRole ) {
            if (guildMember.roles.cache.find(role => 
                role.name.toLowerCase() == msgRole)) {
                return message.channel.send("<@" + message.author.id + ">" + " у Вас уже есть данная роль. Выберите другую или добавьте `remove`, чтобы удалить эту роль")
            } else {
            guildMember.roles.add(UnitRole.id);
            message.channel.send("<@" + message.author.id + ">" + " получает роль: " + UnitRole.name
        )}}

    } else {
        message.channel.send(`!role ${wow_class}`)
    };

};

function GetLib(message) {
    message.channel.send("https://yadi.sk/d/9wxHrNwl_13LbA");
};

function GetWeakAuras(message) {
    message.channel.send("https://github.com/Bunny67/WeakAuras-WotLK");
};

function GetHelp(message) {
    message.channel.send("\n!wa - последняя версия аддона\n!lib - библиотеки");
};

function GetHowImportr(message) {
    message.channel.send(`**How to import?**
**1**. Open the WeakAuras interface by clicking tthe WA icon by you minimap *(command /wa)*
**2**. In the upper left area of th WeakAuras interface click the import button
**3**. Paste the string into the window with Ctrl+V (or command-V on a Mac)
**4**. A box will appear showing some basic information about the WeakAuras.
The Show Code button will let you review any custom code before importing.
The import button will save the WeakAuras to your configuration
**5**. Once imported, you'll find the options panel for this WeakAura on the right of side of the interface.
For most users, the Display tab and maybe Custom Options tab will have settings to customize what you have just imported.
https://media.discordapp.net/attachments/761857830923665418/819819748974919740/import.png?width=396&height=634`)
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
https://wow.gamepedia.com/COMBAT_LOG_EVENT
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
        name: "role",
        out: SetRole,
        about: "Set role"
    },
    {
        name: "import",
        out: GetHowImportr,
        about: "Get link how import"
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
