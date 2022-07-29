const Discord = require(`discord.js`)

module.exports = {
    name: "condor",
    aliases: [],
    desc: "No soy un comando :c",
    run: async (client, message, args, prefix) => {
        return message.reply({embeds: [
            new Discord.MessageEmbed()
            .setTitle(`${client.user.username}`)
            .setDescription(`Deja de usarme como comando. \nNo soy un comando...`)
            .setColor(client.color)
        ]})
    }
}