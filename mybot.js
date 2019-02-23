const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const fs = require("fs")
const config = require('./config.json');

client.on("ready", () => {
  console.log("I am ready!");
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

});

const servers = config.servers;

client.on('ready', () => {
console.log(`Logged in as ${client.user.username}!`);
if(config.speed < 10){console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1);}
setInterval(changeColor, config.speed);
});
client.login(process.env.TOKEN);