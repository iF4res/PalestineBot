const Discord = require('discord.js');
const prefix = "$";
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => { 
  console.log('Loggen in As ${client.user.username}')
 client.user.setGame(`PalestineBot | ${client.guilds.size}/25`, "https://twitch.tv/F4res")
 client.user.setStatus(`Idel`)
});


client.on('message', message => {
  if(message.content.startsWith(prefix + 'help')){
    var embed = new Discord.RichEmbed()
    .setTitle(`${client.user.username}#${client.user.discrimation}'s Help`)
    .addField(`${prefix}help`, `**To Get the help List**`)
    .addField(`${prefix}warn`, `**To Warn a user**`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(" ")
    message.channel.send({embed})
  }
});


client.on('message', message => {
    let log = message.guild.channels.find('name', 'log');
    let reason = message.content.split(" ").slice(2).join(' ');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "warn")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**❌ | This Command is Just for Adminstration**`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
        if(reason.length < 1) return message.reply(`Set a reason!`)
        var embed = new Discord.RichEmbed()
        .setTitle(`New Warning!`)
        .addField(`For`, `<@${p.user.id}>`)
        .addField(`By`, `<@${message.author.id}>`)
        .addField(`Reason`, reason)
        .addField(`In Chat`, `<#${message.channel.id}>`)
        .setColor("WHITE")
        .setTimestamp()
        .setFooter(" ")
            message.channel.send(`${p} ` + reason)
            message.delete();
        log.send({embed})
    }
});
