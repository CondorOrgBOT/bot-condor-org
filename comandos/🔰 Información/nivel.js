const Levels = require('discord-xp');
const Discord = require(`discord.js`);
module.exports = {
    name: "nivel",
    aliases: ["level", "rank"],
    desc: "Sirve para ver tu nivel",
    run: async (client, message, args, prefix) => {
        const usuario = await Levels.fetch(message.author.id, message.guild.id);
        const xpSiguienteNivel = await Levels.xpFor(usuario.level+1);

        return message.reply({embeds: [
            new Discord.MessageEmbed()
            .setTitle(`📈 Sistema de Niveles`)
            .setDescription(`**Eres nivel \`${usuario.level}\`**\nNecesitas \`${xpSiguienteNivel - usuario.xp}xp\` para subida de nivel.`)
            .setFooter(client.user.username, client.user.avatarURL())
            .setColor(client.color)
        ]})
    }
}