const Discord = require('discord.js');
const config = require('./config/config.json')
const fs = require('fs');
require('colors')

const client = new Discord.Client({
    restTimeOffset: 0,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    ],
})

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.color = config.color;

//bienvenida
client.on("guildMemberAdd", (member) => {
    let canal = client.channels.cache.get('1002575732314230785'); 
    canal.send(`${member.user}`);
    canal.send({embeds: [
        new Discord.MessageEmbed()
        .setTitle(`__Bienvenid@ a ${member.guild.name}__`)
        .setThumbnail(member.user.displayAvatarURL())
        .setImage('https://cdn.discordapp.com/attachments/1002575566421106750/1002586777736978513/standard_3.gif')
        .setDescription(`**Usuario de Discord** \n\`${member.user.username}\` \n \n**ID Usuario** \n\`${member.user.id}\``)
        .setFooter('Bienvenido a CONDOR, disfruta de la comunidad')
        .setColor(client.color)
    ]})
});
//end

//salidas logs
client.on("guildMemberRemove", (member) => {
    let canal = client.channels.cache.get('1002587650567446608'); 
    canal.send(`${member.user}`);
    canal.send({embeds: [
        new Discord.MessageEmbed()
        .setTitle(`__Ha salido de ${member.guild.name}__`)
        .setThumbnail(member.user.displayAvatarURL())
        .setImage('https://cdn.discordapp.com/attachments/1002575566421106750/1002590212934877194/standard_4.gif')
        .setDescription(`**Usuario de Discord** \n\`${member.user.username}\` \n \n**ID Usuario** \n\`${member.user.id}\``)
        .setFooter('Ha salido de CONDOR, esperamos que vuelvas')
        .setColor("#960005")
    ]})
   
});
//end

//presencia v2
client.on("ready", () => {
    const estados = [
        {
            tipo: "WATCHING",
            contenido: `Twitter @CondorORG!`,
            opcionesestado: "dnd",
        },
        {
            tipo: "WATCHING",
            contenido: `${client.commands.size} comandos!`,
            opcionesestado: "dnd",
        },
        {
            tipo: "PLAYING",
            contenido: `!help | Condor`,
            opcionesestado: "dnd"
        },
    ];

    async function activarestado() {
        const estado = Math.floor(Math.random() * estados.length);

        try{
            client.user.setPresence({
                activities:[
                    {
                        name:estados[estado].contenido,
                        type:estados[estado].tipo
                    },
                ],
                status:estados[estado].opcionesestado
            });

        } catch (error) {
            console.error(error);
        }
    }
    setInterval(activarestado, 10000)
    console.log('Presencia Activada correctamente'.magenta)
})

//Sistema de Idiomas
client.la = {};
let idiomas = fs.readdirSync('./idiomas').filter(archivo => archivo.endsWith(".json")).map(idioma => idioma.replace(/.json/, ""));
console.log(idiomas)
for(const idioma of idiomas){
    client.la[idioma] = require(`./idiomas/${idioma}`)
}
Object.freeze(client.la)

function requerirhandlers() {
    ["command", "events", "distube", "reaccion_roles", "tickets", "sugerencias", "sorteos", "niveles"].forEach(handler => {
        try {
            require(`./handlers/${handler}`)(client, Discord)
        } catch (e) {
            console.warn(e)
        }
    })
}
requerirhandlers();

client.login(config.token).catch(() => console.log(`-[X]- NO HAS ESPECIFICADO UN TOKEN VALIDO O TE FALTAN INTENTOS -[X]-\n [-] ACTIVA LOS INTENTOS EN https://discord.dev [-]`.red))