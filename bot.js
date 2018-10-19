const Discord = require('discord.js');
const prefix = "#";
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
        var embed = new Discord.RichEmbed();
        embed.setAuthor(`${message.guild.name}`, message.guild.iconURL)
        embed.addField(`:id: **Server ID**`, `${message.guild.id}`)
        embed.addField(`:calendar: **Created On**`, `${message.guild.createdAt}`)
        embed.addField(`:crown: **Owned By**`, `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator} [${message.guild.owner.user.id}]`)
        embed.addField(`:speech_balloon: **Channels [${message.guild.channels.size}]**`, `${message.guild.channels.filter(e => e.type === "text").size} text | ${message.guild.channels.filter(e => e.type === "voice").size} Voice`)
        embed.addField(`:busts_in_silhouette: **Members [${message.guild.memberCount}]**`, `**${message.guild.members.filter(a => a.presence.status !== 'offline').size}** Online`)
        embed.addField(`:earth_africa: **Others**`, `**Region:** ${message.guild.region} \n**Verification Level:** ${message.guild.verificationLevel}`)
        embed.addField(`:closed_lock_with_key: **Roles**`, `**[${message.guild.roles.size}]**`)
        embed.setTimestamp()
        embed.setColor("RANDOM")
        embed.setFooter(" ")
        message.channel.send({embed})
    }
});


client.on("message", (message) => {
    /// Codes Development.
   if (message.content.startsWith("#ticket")) {     /// Codes Development.
        const reason = message.content.split(" ").slice(1).join(" ");     /// Codes Development.
        if (!message.guild.roles.exists("name", "◆ Support ◆ ")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// Codes Development.
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "◆ Support ◆ ");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });    /// Codes Development.
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Staff** will be here soon to help.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("#close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
        message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`#confirm\`. This will time out in 10 seconds and be cancelled.`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === '#confirm', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })    /// Codes Development.
                    .then((collected) => {
                        message.channel.delete();
                    })    /// Codes Development.
                    .catch(() => {
                        m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                            m2.delete();
                        }, 3000);
                    });
            });
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
