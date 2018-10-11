const Discord = require('discord.js');
const prefix = "$";
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => { 
  console.log('Loggen in As ${client.user.username}')
 client.user.setGame(`PalestineBot By F4res`, "https://twitch.tv/F4res")
 client.user.setStatus(`Idel`)
});


client.on('message', message => {
    let log = message.guild.channels.find('name', 'log');
    let reason = message.content.split(" ").slice(2).join(' ');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "warn")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**:x: | This Command is Just for Adminstration**`);
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
            message.channel.send(`${p} ` + reason)
            message.delete();
        log.send({embed})
    }
});


client.on('message', message => {
    let log = message.guild.channels.find('name', 'log');
    let reason = message.content.split(" ").slice(2).join(' ');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "ban")){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**:x: | This Command is Just for Adminstration**`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
        if(reason.length < 1) return message.reply(`Set a reason!`)
        var embed = new Discord.RichEmbed()
        .setTitle(`New Ban!`)
        .addField(`For`, `<@${p.user.id}>`)
        .addField(`By`, `<@${message.author.id}>`)
        .addField(`Reason`, reason)
        .addField(`In Chat`, `<#${message.channel.id}>`)
        .setColor("RED")
            message.channel.send(`<@${message.author.id}>, **Done**`)
            message.delete();
        log.send({embed})
    }
});


client.on('message', message => {
    let log = message.guild.channels.find('name', "log");
    let reason = message.content.split(" ").slice(2).join(' ');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "mute")){
        if(!p) return message.reply(`Mention a User!`);
        if(reason.length < 1) return message.reply(`Set a reason!`)
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**:x: | This Command is Just for Adminstration**`);
            message.delete();
        if(p.roles.find('name', "Muted")) return message.reply(`**تم اسكات هذا العضو مسبقاً**`)
        var embed = new Discord.RichEmbed()
        .setTitle(`New Ban!`)
        .addField(`For`, `<@${p.user.id}>`)
        .addField(`By`, `<@${message.author.id}>`)
        .addField(`Reason`, reason)
        .addField(`In Chat`, `<#${message.channel.id}>`)
        .setColor("RED")
            p.addRole(message.guild.roles.find('name', "Muted"));
            message.channel.send(`**تم حفظ السبب وستتم مراجعته من قبل المسؤولين**`)
            message.delete();
        log.send({embed})
    }
});
