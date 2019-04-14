const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const fs = require("fs")
const config = require('./config.json');

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setPresence({
				game :
				{
					name: 'на глупое человечество',
					type: 3
				},
				status: 'online'
			})
});
function changeColor() {
for (let index = 0; index < servers.length; ++index) {
var kl=(Math.round((Math.random()*10000000000))%16777216);
var zet='#'+kl.toString(16);
client.guilds.get(servers[index]).roles.find('name', config.roleName).setColor(zet)
    .catch(console.error);
var f=client.channels.get("535391187411140608");
		var emb = {
					embed: {
					title:zet,
					color:kl
					}
					};
				f.send(emb);
				
if(config.logging){
console.log(`[ColorChanger] Changed color to ${zet} in server: ${servers[index]}`);
}
}
}
 
client.on("message", (msg) => {
  if (msg.content.startsWith("ping")) {
    msg.channel.send("pong!");
  }
if (msg.content==="ch") {
    changeColor();
	msg.channel.send("ok:ok_hand: :wink: ");
  }
if (msg.content.startsWith("pick"))
		{
			
			var p1=msg.content.indexOf(' ');
			var text=msg.content.substring(p1+1);
			p1=text.indexOf(' ');
			var ch_id=text.substring(0,p1);
			text=text.substring(p1+1);
			p1=text.indexOf(' ');
			var m_id=text.substring(0,p1);
			text=text.substring(p1+1);
			var em_id=text;
			if (text.startsWith('<'))
				{
					p1=text.indexOf(':');
					text=text.substring(p1+1);
					p1=text.indexOf(':');
					em_id=text.substring(p1+1,text.length-1);
				}
			if (client.channels.get(ch_id))
			{
				client.channels.get(ch_id).fetchMessages({around: m_id, limit: 1}).then(
			messages => {
				if (messages.first())
					{
						messages.first().react(em_id).catch(msg.reply("**ERROR!!**"));
						msg.delete();
					}else
				msg.reply("**ERROR!!**");
			})
			} else
				msg.reply("**ERROR!!**");
		}
	if (msg.content.startsWith("-h"))
		{
			msg.react("➕"); 
			msg.react("➖");
		}
});

const servers = config.servers;

client.on('ready', () => {
console.log(`Logged in as ${client.user.username}!`);
if(config.speed < 10){console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1);}
setInterval(changeColor, config.speed);
});
client.login(process.env.TOKEN);