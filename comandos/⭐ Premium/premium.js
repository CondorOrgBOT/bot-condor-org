const Discord = require(`discord.js`)

module.exports = {
    name: "premium",
    desc: "Sirve para comprobar si eres Premium",
    premium: true,
    run: async (client, message, args, prefix) => {
        return message.reply({embeds: [
            new Discord.MessageEmbed()
            .setTitle(`⭐ Premium`)
            .setDescription(`**Condor Premium:** \`Si\`\n*__Posees la versión PREMIUM de Condor__*`)
            .setFooter("Condor | Sistema Premium")
            .setColor("FFCD00")
        ]})
    }
}