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
        .setTimestamp()
        .setFooter(" ")
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
        .setTitle(`New Mute!`)
        .addField(`For`, `<@${p.user.id}>`)
        .addField(`By`, `<@${message.author.id}>`)
        .addField(`Reason`, reason)
        .addField(`In Chat`, `<#${message.channel.id}>`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter(" ")
            p.addRole(message.guild.roles.find('name', "Muted"));
            message.channel.send(`**تم حفظ السبب وستتم مراجعته من قبل المسؤولين**`)
            message.delete();
        log.send({embed})
    }
});


client.on('message', message => {
    let log = message.guild.channels.find('name', "log");
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "unmute")){
        if(!p) return message.reply(`Mention a User!`);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**:x: | This Command is Just for Adminstration**`);
            message.delete();
        if(!p.roles.find('name', "Muted")) return message.reply(`**تم فك الاسكات عت هذا العضو مسبقاً**`)
        var embed = new Discord.RichEmbed()
        .setTitle(`New Unmute!`)
        .addField(`For`, `<@${p.user.id}>`)
        .addField(`By`, `<@${message.author.id}>`)
        .addField(`In Chat`, `<#${message.channel.id}>`)
        .setColor("PURPLE")
        .setTimestamp()
        .setFooter(" ")
            p.removeRole(message.guild.roles.find('name', "Muted"));
            message.channel.send(`<@${message.author.id}>, **Done**`)
            message.delete();
        log.send({embed})
    }
});


client.on('message', message => {
    if(message.content.startsWith(prefix + "support")){
        var embed = new Discord.RichEmbed()
        .setTitle(`ClickHere`)
        .setDescription(`PalestineBot Support Server`)
        .setURL("https://discord.gg/yRHuwq")
        .setColor("BLACK")
        .setTimestamp()
        .setFooter(" ")
        message.channel.send({embed})
    }
});


client.on('message', message => {
    if(message.content.startsWith(prefix + "invite")){
        var embed = new Discord.RichEmbed()
        .setTitle(`ClickHere`)
        .setDescription(`PalestineBot Bot Invite`)
        .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter(" ")
        message.channel.send({embed})
    }
});


client.on('message', message => {
    if(message.content.startsWith(prefix + "bot")){
        var embed = new Discord.RichEmbed()
        .setTitle(`${client.user.username}'s Status`)
        .setThumbnail(client.user.avatarURL)
        .addField(`Channels`, `${client.channels.size}`)
        .addField(`Users`, `${client.users.size}`)
        .addField(`Guilds`, `${client.guilds.size}`)
        .setColor("RANDOM")
        .setTimestamp()
        .setFooter(" ")
        message.channel.send({embed})
    }
});


client.on('message', message => {

    if (message.content.startsWith(prefix + `lock`)) {
                        if(!message.channel.guild) return message.reply(' This command only for servers');

if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('No Perms');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false

           }).then(() => {
               message.channel.send("Done")
           });
             }
           });


client.on('message', message => {
    let args = message.content.split(" ").slice(1);
if (message.content.startsWith(prefix + 'clear')) {
 let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 101) return message.reply("**🛑 || يجب ان يكون عدد المسح أقل من 100 .**").then(messages => messages.delete(5000))
    if (!messagecount) return message.reply("**💡 || أختر كميه الرسائل المراد مسحها .**").then(messages => messages.delete(5000))
    message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages));
    message.channel.send(`\`${args}\` : __عدد الرسائل التي تم مسحها __ `).then(messages => messages.delete(5000));
  }
  });
