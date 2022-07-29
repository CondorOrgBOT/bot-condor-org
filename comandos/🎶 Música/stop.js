const Discord = require('discord.js')

module.exports = {
    name: "stop",
    aliases: ["desconectar", "leavevc", "leave", "disconnect"],
    desc: "Sirve para desconectar al bot de la sala de voz",
    run: async (client, message, args, prefix) => {
        //comprobaciones previas
        const queue = client.distube.getQueue(message);
        if(!queue) return message.reply(`❌ **No hay ninguna canción reproduciéndose!**`);
        if(!message.member.voice?.channel) return message.reply(`❌ **Tienes que estar en un canal de voz para ejecutar este comando!**`);
        if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply(`❌ **Tienes que estar en el mismo canal de voz __QUE YO__ para ejecutar este comando!**`);
        client.distube.stop(message);
        return message.reply({embeds: [
            new Discord.MessageEmbed()
            .setTitle('__Desconectandome__')
            .setDescription(`**💀 Desconectado del Canal correctamente**`)
            .setColor("BLACK")
            .setFooter({text: `Musica | Kuby`})
        ]})
    }
}