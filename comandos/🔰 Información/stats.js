const Discord = require(`discord.js`)

module.exports = {
    name: "estadistica",
    aliases: ["stats", "estadisticas", "estadistica-bot", "stats-bot", "bot-stats", "estadisticas-bot"],
    desc: "Sirve para ver la latencia del Bot",
    run: async (client, message, args, prefix) => {
        return message.reply({embeds: [
            new Discord.MessageEmbed()
            .setTitle(`📈 Estadisticas ${client.user.username}`)
            .setDescription(`**Ping:** \`${client.ws.ping}ms\`\n**Comandos:** \`${client.commands.size}\` \n**Servidores:** \`${client.guilds.cache.size}\``)
            .setColor(client.color)
        ]})
    }
}