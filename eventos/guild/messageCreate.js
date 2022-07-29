const config = require(`${process.cwd()}/config/config.json`)
const serverSchema = require(`${process.cwd()}/modelos/servidor.js`)
const { asegurar_todo } = require(`${process.cwd()}/handlers/funciones.js`)
const Discord = require(`discord.js`)

module.exports = async (client, message) => {
    if (!message.guild || !message.channel || message.author.bot) return;
    await asegurar_todo(message.guild.id, message.author.id);
    let data = await serverSchema.findOne({guildID: message.guild.id})
    if (!message.content.startsWith(data.prefijo)) return;
    const args = message.content.slice(data.prefijo.length).trim().split(" ");
    const cmd = args.shift()?.toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));
    if (command) {
        //Respuesta de comandos para owners
        if (command.owner) {
            if (!config.ownerIDS.includes(message.author.id)) return message.reply(`❌ **Solo los dueños de este bot pueden ejecutar este comando!**\n**Dueños del bot:** ${config.ownerIDS.map(ownerid => `<@${ownerid}>`)}`)
        }

        //Respuesta de expiración de premium
        if(command.premium){
            if(data.premium){
                if(data.premium <= Date.now()) return message.reply({embeds: [
                    new Discord.MessageEmbed()
                    .setTitle(`❌ Premium `)
                    .setDescription(`Condor Premium: \`No\`\n*__Tu version PREMIUM de Condor ha expirado__*`)
                    .setColor("RED")
                    .setFooter("Condor | Sistema Premium")
                ]})
            } else {
                return message.reply("❌ **Este es un comando premium!**")
            }
        }

        //Respuesta de permisos del bot
        if(command.permisos_bot){
            if(!message.guild.me.permissions.has(command.permisos_bot)) return message.reply(`❌ **No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos ${command.permisos_bot.map(permiso => `\`${permiso}\``).join(", ")}`)
        }

        //Respuesta de que no tienes suficientes permisos para ejec comandos
        if(command.permisos){
            if(!message.member.permissions.has(command.permisos)) return message.reply(`❌ **No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos ${command.permisos.map(permiso => `\`${permiso}\``).join(", ")}`)
        }

        //Ejecutar el comando
        command.run(client, message, args, data.prefijo, data.idioma);
    } else {

        //Respuesta no encuentra el comando
        return message.reply("❌ No he encontrado el comando que me has especificado!");
    }

}