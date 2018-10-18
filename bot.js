const Discord = require('discord.js');
const prefix = "#";
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}`)
client.user.setGame(`${prefix}help | ${client.guilds.size} Servers`, "https://twitch.tv/F4res")
client.user.setStatus('Idel')
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


client.on('guildMemberAdd', member => {
    let welcomer = member.guild.channels.find('name', "welcomer");
    var embed = new Discord.RichEmbed();
    embed.setAuthor(`${member.user.username}#${member.user.discrimnator}`, member.user.avatarURL)
    embed.addField(`Welcome`, member)
    embed.addField(`You are the member number`, member.guild.memberCount)
    embed.setColor('RANDOM')
    embed.setTimestamp()
    embed.setFooter(" ")
    member.addRole(member.guild.roles.find('name', "◆ Member ◆"));
    welcomer.send({embed})
});



var wait = new Set();
client.on("message", function(message) {
	if( wait.has(message.author.id) ) { 
		message.channel.send("please cooldown")
	} else {
	 	wait.add(message.author.id)	
	}	
});
