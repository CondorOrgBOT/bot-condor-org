const Discord = require(`discord.js`)

module.exports = {
    name: "discord",
    aliases: ["ds", "support", "soporte"],
    desc: "Sirve para ver el discord oficial de Kuby",
    run: async (client, message, args, prefix) => {
        return message.reply({embeds: [
            new Discord.MessageEmbed()
            .setTitle(`${client.user.username} Discord`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`Si necesitas ayuda soporte o tienes alguna duda, \npuedes unirte a nuestro discord oficial! \nhttps://discord.gg/f8V9CAXY4g`)
            .setColor(client.color)
            .setTimestamp()
            .setFooter(`${client.user.username} Support`)
        ]})
    }
}