const Discord = require('discord.js');
const prefix = "b#";
const client = new Discord.Client();
const tpoints = {};

client.login(process.env.BOT_TOKEN);

client.on('ready', () => { 
  console.log(`Loggen in As ${client.user.username}`)
 client.user.setGame(`${prefix}help on ${client.guilds.size} Guild(s)`, "https://twitch.tv/F4res")
 client.user.setStatus(`Idel`)
});


var dat = JSON.parse("{}");
function forEachObject(obj, func) {
    Object.keys(obj).forEach(function (key) { func(key, obj[key]) })
}
client.on("ready", () => {
    var guild;
    while (!guild)
        guild = client.guilds.find("name", "BreakBot Support")
    guild.fetchInvites().then((data) => {
        data.forEach((Invite, key, map) => {
            var Inv = Invite.code;
            dat[Inv] = Invite.uses;
        })
    })
})
client.on("guildMemberAdd", (member) => {
    let channel = member.guild.channels.find('name', 'welcomer');
    if (!channel) {
        console.log("!channel fails");
        return;
    }
    if (member.id == client.user.id) {
        return;
    }
    console.log('made it till here!');
    var guild;
    while (!guild)
        guild = client.guilds.find("name", "BreakBot Support")
    guild.fetchInvites().then((data) => {
        data.forEach((Invite, key, map) => {
            var Inv = Invite.code;
            if (dat[Inv])
                if (dat[Inv] < Invite.uses) {
                  var embed = new Discord.RichEmbed()
                  .setAuthor(`${member.user.username}`, member.avatarURL)
                  .setTitle(`New User joined!`)
                  .addField(`He is `, member)
                  .addField(`Nmber `, member.guild.memberCount)
                  .addField(`Invited By `, Invite.inviter ,true)
                  .addField(`Invite Code `, Invite.code)
                  .setTimestamp()
                  .setColor("GREEN")
                  .setFooter(" ")
 channel.send(embed)           
 member.addRole(member.guild.roles.find('name', "◆ Member ◆ ")); 
 }
            dat[Inv] = Invite.uses;
        })
    })
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
    .addField(`${prefix}bot`, `**To see the bot status**`)
    .addField(`${prefix}uptime`, `**To see the bot uptime**`)
    .addField(`${prefix}server`, `**To see the server informations**`)
    .addField(`${prefix}setVoice`, `**To set up Voice Online Count Room**`)
    .addField(`${prefix}setChannels`, `**To set Channels Count Room**`)
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
      if(!message.member.roles.find('name', "◆ Support ◆")) return message.reply(`**You Don't have ◆ Support ◆ Role**`);
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
      if(!message.member.roles.find('name', "◆ Support ◆")) return message.reply(`**You Don't have ◆ Support ◆ Role**`);
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
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply(`You Don't have **Mute_Members** Permission!`);
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
      if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(`You Don't have **Ban_Members** Permission!`);
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
            p.ban();
        log.send({embed})
    }
});


client.on('message', message => {
    if(message.content === prefix + "ban list"){
      if(!message.member.roles.find('name', "◆ Support ◆")) return message.reply(`**You Don't have ◆ Support ◆ Role**`);
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
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You Don't have **ADMINISTRATOR** Permission!`);
    var embed = new Discord.RichEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL)
    .addField(`:id: **Server ID**`, message.guild.id, true)
    .addField(`:crown: **Owned By**`, `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator} [${message.guild.owner.user.id}]`, true)
    .addField(`:speech_balloon: **Channels [${message.guild.channels.size}]**`, `${message.guild.channels.filter(channel => channel.type == 'text').size} text | ${message.guild.channels.filter(channel => channel.type == 'voice').size} voice`)
    .addField(`:closed_lock_with_key:  **Roles**`,`**[${message.guild.roles.size}]**`, true)
    .addField(`:calendar: **Created At**`, message.guild.createdAt.toLocaleString(), true)
    .addField(`:busts_in_silhouette: **Members [${message.guild.memberCount}]**`, `**${message.guild.members.filter(m=>m.presence.status !== "offline").size}** Online`, true)
    .setColor("WHITE")
    .setTimestamp()
    .setFooter(" ")
    message.channel.send({embed})
  }
});


client.on('message', message => {
  if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
      if(message.content.toLowerCase().startsWith(prefix + "uptime")) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`You Don't have **ADMINISTRATOR** Permission!`);
        let upTime = process.uptime();
  
        let days = Math.floor(upTime / 86400);
        upTime %= 86400;
  
        let hrs = Math.floor(upTime / 3600);
        upTime %= 3600;
  
        let min = Math.floor(upTime / 60);
        let sec = Math.floor(upTime % 60);

        message.channel.send(`Uptime : ${days} Day, ${hrs} Hours, ${min} Minutes, ${sec} Secounds`)
    }
});


//displayers
client.on('message',async message => {
  if(message.content.startsWith(prefix + "setVoice")) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`You Don't have **MANAGE_CHANNELS** Permission!`);
  message.channel.send('✅| **Done**');
  message.guild.createChannel(`Voice Online : [ ${message.guild.members.filter(m => m.voiceChannel).size} ]` , 'voice').then(c => {
    console.log(`Voice online channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(function() {
      c.setName(`Voice Online ⇏「 ${message.guild.members.filter(m => m.voiceChannel).size} 」`)
    },1000);
  });
  }
});


client.on('message',async message => {
  if(message.content.startsWith(prefix + "setChannels")) {
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(`You Don't have **MANAGE_CHANNELS** Permission!`);
  message.channel.send('✅| **Done**');
  message.guild.createChannel(`Members Count : [ ${message.guild.channels.size} ]` , 'voice').then(c => {
    console.log(`Count Members channel setup for guild: \n ${message.guild.name}`);
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(function() {
      c.setName(`Rooms Created ⇏「 ${message.guild.channels.size} 」`)
    },1000);
  });
  }
});


client.on('message',async message => {  
  client.users.forEach(m => {
    if(m.bot) return;
    if(!tpoints[m.id]) tpoints[m.id] = {points: 0, id: m.id};
});


  if(message.author.bot || message.channel.type === 'dm') return;
  let args = message.content.split(' ');
  let member = message.member;
  let mention = message.mentions.users.first();
  let guild = message.guild;
  let author = message.author;

  let rPoints = Math.floor(Math.random() * 4) + 1;// Random Points
  tpoints[author.id].points += rPoints;
  if(args[0] === `${prefix}top`) {
    let _textPointer = 1;
    let _textArray = Object.values(tpoints);
    let _topText = _textArray.slice(0, 5).map(r => `**\`.${_textPointer++}\` | <@${r.id}> \`XP: ${r.points}\`**`).sort((a, b) => a > b).join('\n');
    
    let embed = new Discord.RichEmbed();
    embed.setAuthor(message.author.username, message.author.avatarURL);
    embed.setThumbnail(message.guild.iconURL);
    embed.addField(`**TOP 5 TEXT 💬**`, _topText, true);
    embed.setTimestamp()
    embed.setColor("BLACK")
    embed.setFooter(" ");
    message.channel.send(embed).catch(e => {
      if(e) return message.channel.send(`**. Error; \`${e.message}\`**`);
    });
  }
  if(args[0] === `${prefix}me`){
      message.channel.send(`${r.points}`)
  }
});
