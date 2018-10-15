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
    .addField(`${prefix}ban list`, `**To see the ban reasons**`)
    .addField(`${prefix}ban`, `**To ban a user**`)
    .addField(`${prefix}server`, `**To see some server imformation!**`)
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
        if(!message.member.roles.find('name', "staff")) return message.reply(`**You Don't have __staff__ Role**`);
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
        if(!message.member.roles.find('name', "staff")) return message.reply(`**You Don't have __staff__ Role**`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
        if(reason.length < 1) return message.reply(`Set a reason!`)
        if(!reason.includes("https://prntscr.com/")) return message.reply(`**The reason must be https://prntscr.com photo**`);
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
        if(!message.member.roles.find('name', "staff")) return message.reply(`**You Don't have __staff__ Role**`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
      if(!p.roles.find('name', "Muted")) return message.reply(`**This user is not Muted**`);
        var embed = new Discord.RichEmbed()
        .setTitle(`New Unmute!`)
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
    let log = message.guild.channels.find('name', 'log');
    let reason = message.content.split(" ").slice(2).join(' ');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "ban")){
        if(!message.member.roles.find('name', "staff")) return message.reply(`**You Don't have __staff__ Role**`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
        if(reason.length < 1) return message.reply(`Set a reason!`);
    if(reason.includes('0')) reason = reason.replace('0', '**نشر سيرفرات الخاص**'); 
    if(reason.includes('1')) reason = reason.replace('1', '**سب في الرومات الصوتيه**');
    if(reason.includes('2')) reason = reason.replace('2', '**استخدام برامج تغيير صوت**');
    if(reason.includes('3')) reason = reason.replace('3', '**ازعاج الاداره والاعضاء في الرومات العامه**');
    if(reason.includes('4')) reason = reason.replace('4', '**سب الشخص مسبات قويه ولم ياخذ ميوت**');
    if(reason.includes('5')) reason = reason.replace('5', '**اسم مسيء - غير لائق**');
    if(reason.includes('6')) reason = reason.replace('6', '**سب الاهل**');
    if(reason.includes('7')) reason = reason.replace('7', '**صوره غير لائقه**');
    if(reason.includes('8')) reason = reason.replace('8', '**عنصريه**');
    if(reason.includes('9')) reason = reason.replace('9', '**دخول باكثر من حساب ومو متبند**');
        var embed = new Discord.RichEmbed()
        .setTitle(`New Ban!`)
        .addField(`For`, `<@${p.user.id}>`)
        .addField(`By`, `<@${message.author.id}>`)
        .addField(`Reason`, reason)
        .addField(`In Chat`, `<#${message.channel.id}>`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter(" ")
            message.channel.send(`<@${message.author.id}>, **Done**`)
            message.delete();
        log.send({embed})
    }
});


client.on('message', message => {
    if(message.content === prefix + "ban list"){
        if(!message.member.roles.find('name', "staff")) return message.reply(`**You Don't have __staff__ Role**`);
        var embed = new Discord.RichEmbed()
        .setTitle('Ban Reasons!')
        .addField(`$ban @Mention 0`, `**نشر سيرفرات الخاص**`)
        .addField(`$ban @Mention 1`, `**سب في الرومات الصوتيه**`)
        .addField(`$ban @Mention 2`, `**استخدام برامج تغيير صوت**`)
        .addField(`$ban @Mention 3`, `**ازعاج الاداره والاعضاء في الرومات العامه**`)
        .addField(`$ban @Mention 4`, `**سب الشخص مسبات قويه ولم ياخذ ميوت**`)
        .addField(`$ban @Mention 5`, `**اسم مسيء - غير لائق**`)
        .addField(`$ban @Mention 6`, `**سب الاهل**`)
        .addField(`$ban @Mention 7`, `**صوره غير لائقه**`)
        .addField(`$ban @Mention 8`, `**عنصريه**`)
        .addField(`$ban @Mention 9`, `**دخول باكثر من حساب ومو متبند**`)
        .setColor("BLACK")
        .setTimestamp()
        .setFooter(" ")
        message.channel.send({embed})
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


client.on('message', message => {
    if(message.content.startsWith(prefix + "server")){
        var embed = new Discord.RichEmbed()
        .setAuthor(message.guild.name)
        .addField(`:id: Server ID`, message.guild.id)
        .addField(`:crown: Owned By`, `${message.guild.owner.user.username} [${message.guild.owner.user.id}]`)
        .addField(`:speech_balloon: Channels`, `${message.guild.channels.filter(channel => channel.type == 'text').size} Text | ${message.guild.channels.filter(channel => channel.type == 'voice').size} Voice`)
        .addField(`:closed_lock_with_key: Roles [${message.guild.roles.size}]`, `****`)
        .addField(`:busts_in_silhouette: Members [${message.guild.users.size()}]`, `**${message.guild.members.filter(m => m.presence.status !== 'online').size}** Online`)
        .addField(`:calendar: Created On`, message.guild.createdAt.toLocaleString() ,true)
        .setTimestamp()
        .setColor("RANDOM")
        .setFooter(" ")
        message.channel.send({embed})
    }
});
