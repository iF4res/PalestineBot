const Discord = require('discord.js');
const prefix = "$";
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('ready', () => { 
  console.log('Hi')
});
