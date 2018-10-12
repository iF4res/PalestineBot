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
    .setTitle(`${client.user.username}#${client.user.discrimination}'s Help`)
    .addField('${prefix}help', `**To Get the help List**`)
    .addField('${prefix}warn', `**To Warn a user**`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(" ")
    message.channel.send({embed})
  }
});
