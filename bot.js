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
    .setTitle(`${client.user.username}#${client.user.discriminator}'s Help`)
    .addField(`${prefix}help`, `**To Get the help List**`)
    .addField(`${prefix}warn`, `**To Warn a user**`)
    .addField(`${prefix}mute`, `**To Mute a user**`)
    .addField(`${prefix}unmute`, `**To Unmute a user**`)
    .addField(`${prefix}bot`, `**To see the bot status**`)
    .setColor("GREEN")
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


client.on('message', message => {
    let log = message.guild.channels.find('name', 'log');
    let reason = message.content.split(" ").slice(2).join(' ');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "mute")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**❌ | This Command is Just for Adminstration**`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
        if(reason.length < 1) return message.reply(`Set a reason!`)
      if(p.roles.find('name', "Muted")) return message.reply(`**This user is Muted before**`);
        var embed = new Discord.RichEmbed()
        .setTitle(`New Mute!`)
        .addField(`For`, `<@${p.user.id}>`)
        .addField(`By`, `<@${message.author.id}>`)
        .addField(`Reason`, reason)
        .addField(`In Chat`, `<#${message.channel.id}>`)
        .setColor("PURPLE")
        .setTimestamp()
        .setFooter(" ")
            message.channel.send(`**تم حفظ السبب وستتم مراجعته من قبل المسؤولين**`)
            message.delete();
            p.addRole(message.guild.roles.find('name', "Muted"));
        log.send({embed})
    }
});


client.on('message', message => {
    let log = message.guild.channels.find('name', 'log');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "unmute")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**❌ | This Command is Just for Adminstration**`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
      if(!p.roles.find('name', "Muted")) return message.reply(`**This user is not Muted**`);
        var embed = new Discord.RichEmbed()
        .setTitle(`New Mute!`)
        .addField(`For`, `<@${p.user.id}>`)
        .addField(`By`, `<@${message.author.id}>`)
        .addField(`In Chat`, `<#${message.channel.id}>`)
        .setColor("PURPLE")
        .setTimestamp()
        .setFooter(" ")
            message.channel.send(`**<@${message.author.id}>, Done**`)
            message.delete();
            p.removeRole(message.guild.roles.find('name', "Muted"));
        log.send({embed})
    }
});


client.on('message', message => {
  if(message.content.startsWith(prefix + "bot")){
    var embed = new Discord.RichEmbed()
    .setTitle(`${client.user.username}#${client.user.discriminator}'s Status`)
    .addField(`Guilds`, `${client.guilds.size}`)
    .addField(`Channels`, `${client.channels.size}`)
    .addField(`Users`, `${client.users.size}`)
    .setColor("ORANGE")
    .setTimestamp()
    .setFooter(" ")
    message.channel.send({embed})
  }
});
