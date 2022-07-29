const Discord = require(`discord.js`)

module.exports = {
    name: "ping",
    aliases: ["latencia", "ms"],
    desc: "Sirve para ver la latencia del Bot",
    run: async (client, message, args, prefix) => {
        return message.reply({embeds: [
            new Discord.MessageEmbed()
            .setTitle(`📶 El ping del bot es`)
            .setDescription(`**Ping MS:** \`${client.ws.ping}ms\``)
            .setColor(client.color)
        ]})
    }
}