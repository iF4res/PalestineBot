const Discord = require('discord.js');
const prefix = "$";
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => { 
  console.log('Loggen in As ${client.user.username}')
 client.user.setGame(`PalestineBot | ${client.guilds.size}/25`, "https://twitch.tv/F4res")
 client.user.setStatus(`Idel`)
});


client.on('message', mesage => {
  if(message.content.startsWith(prefix + 'help')){
    var embed = new Discord.RichEmbed()
    .setTitle(`${client.user.username}#${client.user.discrimination}'s Help`)
    .addField('${prefix}help', `**To Get the help List**`)
    .addField('${prefix}warn', `**To Warn a user**`)
    .setColor("RANDOM")
    .setTimestamps()
    .setFooter(" ")
    message.channel.send({embed})
  }
});


client.on('message', message => {
  let p = message.mentions.members.first();
  let reason = message.content.split(" ").slice(2).join(' ');
  let log = message.guild.channels.find('name', "log");
  if(message.content.startsWith(prefiz + "warn")){
    if(!p) return message.reply(`**Mention a User!**`);
           message.delete();
    if(!log) return message.channel.send(`**No Rome named #log found**`);
           message.delete();
    if(reason.lenth < 1) return message.reply(`**Set a Reason**);
           message.delete();
    var embed = new Discord.RichEmbed()
    .setTitle(`New Warning!`)
    .addField(`For`, `<@${p.user.id}>`)
    .addField(`By`, `<@${message.author.id}>`)
    .addField(`Reason`, reason)
    .addField(`In Chat`, `<#${message.channel.id}>`)
    .setColor("WHITE")
    .setTimestamps()
    .setFooter(" ")
           message.channel.send(`${p} ` + reason
           log.send({embed})
           message.delete();
  }
});
