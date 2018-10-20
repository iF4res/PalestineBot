const Discord = require('discord.js');
const prefix = ">";
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}`)
client.user.setGame(`${prefix}help | ${client.guilds.size} Servers`, "https://twitch.tv/F4res")
client.user.setStatus('Idel')
});

///welcome
client.on('guildMemberAdd', member => {
    let welcomer = member.guild.channels.find('name', "welcomer");
    var embed = new Discord.RichEmbed();
    embed.setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
    embed.addField(`Welcome`, member)
    embed.addField(`You are the member number`, member.guild.memberCount)
    embed.setColor('RANDOM')
    embed.setTimestamp()
    embed.setFooter(" ")
    member.addRole(member.guild.roles.find('name', "◆ Member ◆"));
    welcomer.send({embed})
});
///welcome
///general
client.on('message', message => {
    if(message.content.startsWith(prefix + "help")){
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`${client.user.username}'s Help`, client.user.avatarURL)
        embed.addField(`${prefix}help`, "**To get the help list**")
        embed.addField(`${prefix}bot`, "**To See The Bot Status**")
        embed.addField(`${prefix}warn`, "**To warn a user**")
        embed.addField(`${prefix}mute`, "**To Mute a User**")
        embed.addField(`${prefix}unmute`, "**To UnMute a User**")
        embed.addField(`${prefix}ban`, "**To ban a user**")
        embed.setTimestamp()
        embed.setColor("RANDOM")
        embed.setFooter(" ")
        message.channel.send({embed})
    }
});


client.on('message', message => {
    if(message.content.startsWith(prefix + "bot")){
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`${client.user.username}'s Status`, client.user.avatarURL)
        embed.addField(`Guilds`, `${client.guilds.size}`)
        embed.addField(`Users`, `${client.users.size}`)
        embed.addField(`Channels`, `${client.channels.size}`)
        embed.setTimestamp()
        embed.setColor("RANDOM")
        embed.setFooter(" ")
        message.channel.send({embed})
    }
});


client.on('message', message => {
    if(message.content.startsWith(prefix + "server")){
        if(!message.member.hasPermission('ADMINSTRATION')) return message.reply(`:x: | This Command is Just For Adminstration`);
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`${message.guild.name}`, message.guild.iconURL)
        embed.addField(`:id: **Server ID**`, `${message.guild.id}`)
        embed.addField(`:calendar: **Created On**`, `${message.guild.createdAt}`)
        embed.addField(`:crown: **Owned By**`, `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator} [${message.guild.owner.user.id}]`)
        embed.addField(`:speech_balloon: **Channels [${message.guild.channels.size}]**`, `${message.guild.channels.filter(e => e.type === "text").size} text | ${message.guild.channels.filter(e => e.type === "voice").size} Voice | ${message.guild.channels.filter(e => e.type === "category").size} Category`)
        embed.addField(`:busts_in_silhouette: **Members [${message.guild.memberCount}]**`, `**${message.guild.members.filter(a => a.presence.status !== 'offline').size}** Online`)
        embed.addField(`:earth_africa: **Others**`, `**Region:** ${message.guild.region} \n**Verification Level:** ${message.guild.verificationLevel}`)
        embed.addField(`:closed_lock_with_key: **Roles**`, `**[${message.guild.roles.size}]**`)
        embed.setTimestamp()
        embed.setColor("RANDOM")
        embed.setFooter(" ")
        message.channel.send({embed})
    }
});


client.on('message', message => {
    var prefix = "#";

           if (message.content.startsWith(prefix + "id")) {
                     if(!message.channel.guild) return message.reply(`هذا الأمر فقط ل السيرفرات :x:`);

                message.guild.fetchInvites().then(invs => {
      let member = client.guilds.get(message.guild.id).members.get(message.author.id);
      let personalInvites = invs.filter(i => i.inviter.id === message.author.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var moment = require('moment');
      var args = message.content.split(" ").slice(1);
let user = message.mentions.users.first();
var men = message.mentions.users.first();
 var heg;
 if(men) {
     heg = men
 } else {
     heg = message.author
 }
var mentionned = message.mentions.members.first();
  var h;
 if(mentionned) {
     h = mentionned
 } else {
     h = message.member
 }
        moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
       
    .setColor("#0a0909")
    .setAuthor(message.author.username, message.author.avatarURL) 
.addField(': دخولك لديسكورد قبل', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
.addField(': انضمامك لسيرفر قبل', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)
.addField(': عدد الدعوات', inviteCount,false)
.setFooter("TINEOUT_408")  
    message.channel.sendEmbed(id);
})
}
    

         
     });
///general
///admins
client.on('message', message => {
    let p = message.mentions.members.first();
    let reason = message.content.split(" ").slice(2).join(' ');
    let log = message.guild.channels.find('name', "log");
    if(message.content.startsWith(prefix + "warn")){
        if(!message.member.roles.find('name', "◆ Support ◆")) return message.reply(`No **◆ Support ◆** Role Find!`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
            message.delete();
        if(reason.length < 1) return message.reply(`Set a reason!`);
            message.delete();
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`${p.user.username}`, p.user.avatarURL)
        embed.setTitle(`New Warning!`)
        embed.addField(`For`, `${p}`)
        embed.addField(`By`, `<@${message.author.id}>`)
        embed.addField(`Reason`, reason)
        embed.addField(`In Chat`, `<#${message.channel.id}>`)
        embed.setTimestamp()
        embed.setColor("WHITE")
        embed.setFooter(" ")
        message.channel.send(`${p} ${reason}`)
            message.delete();
        log.send({embed})
    }
});


client.on('message', message => {
    let p = message.mentions.members.first();
    let reason = message.content.split(" ").slice(2).join(' ');
    let log = message.guild.channels.find('name', "log");
    let MutedRole = message.guild.roles.find('name', "Muted");
    if(message.content.startsWith(prefix + "mute")){
        if(!message.member.roles.find('name', "◆ Support ◆")) return message.reply(`No **◆ Support ◆** Role Found!`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
            message.delete();
        if(reason.length < 1) return message.reply(`Set a reason!`);
            message.delete();
        if(!MutedRole) return message.reply(`No **Muted** Role Found!`);
            message.delete();
        if(p.roles.find('name', "Muted")) return message.reply(`This User is Muted before!`);
            message.delete();
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`${p.user.username}`, p.user.avatarURL)
        embed.setTitle(`New Mute!`)
        embed.addField(`For`, `${p}`)
        embed.addField(`By`, `<@${message.author.id}>`)
        embed.addField(`Reason`, reason)
        embed.addField(`In Chat`, `<#${message.channel.id}>`)
        embed.setTimestamp()
        embed.setColor("PURPLE")
        embed.setFooter(" ")
        message.channel.send(`**تم حفظ السبب وستتم مراجعته من قبل المسؤولين**`)
            message.delete();
        log.send({embed})
    }
});


client.on('message', message => {
    let p = message.mentions.members.first();
    let reason = message.content.split(" ").slice(2).join(' ');
    let log = message.guild.channels.find('name', "log");
    let MutedRole = message.guild.roles.find('name', "Muted");
    if(message.content.startsWith(prefix + "unmute")){
        if(!message.member.roles.find('name', "◆ Support ◆")) return message.reply(`No **◆ Support ◆** Role Found!`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
            message.delete();
        if(reason.length < 1) return message.reply(`Set a reason!`);
            message.delete();
        if(!MutedRole) return message.reply(`No **Muted** Role Found!`);
            message.delete();
        if(!p.roles.find('name', "Muted")) return message.reply(`This User is Not Muted!`);
            message.delete();
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`${p.user.username}`, p.user.avatarURL)
        embed.setTitle(`New UnMute!`)
        embed.addField(`For`, `${p}`)
        embed.addField(`By`, `<@${message.author.id}>`)
        embed.addField(`Reason`, reason)
        embed.addField(`In Chat`, `<#${message.channel.id}>`)
        embed.setTimestamp()
        embed.setColor("PURPLE")
        embed.setFooter(" ")
        message.channel.send(`**<@${message.author.id}>, Done**`)
            message.delete();
        log.send({embed})
    }
});


client.on('message', message => {
    let log = message.guild.channels.find('name', 'log');
    let reason = message.content.split(" ").slice(2).join(' ');
    let p = message.mentions.members.first();
    if(message.content.startsWith(prefix + "ban")){
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`You Don't have **Ban_Members** Permission!`);
            message.delete();
        if(!p) return message.reply(`Mention a User!`);
            message.delete();
        if(reason.length < 1) return message.reply(`Set a reason!`);
            message.delete();
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
            p.ban();
        log.send({embed})
    }
});
///admins


client.on('ready', () => {
    var guild = client.guild.get('501839769102188567');
      setInterval(function(){
          var role = guild.roles.find(role => role.name === 'RainBow');
          if(!role) return;
          role.edit({
              color: "RANDOM"
          });
      }, 2000)
});
