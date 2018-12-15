const Discord = require("discord.js");
const client = new Discord.Client();
 
client.on("ready", () => {
  console.log("I am ready!");
});
var now;
 
client.on("message", (msg) => {
  if (msg.content.startsWith("ping")) {
    msg.channel.send("pong!");
  }
	 if(msg.content.includes("wtf")||(msg.content.includes("fuck"))||(msg.content.includes("bitch"))){
   msg.delete();
   msg.reply("***bad words are disable in server***:rage:");
  }

});
const config = require('./config.json');

function to_hex(i) {
var int = i;
var hex = int.toString(16);
return hex.length === 1 ? '0'+hex : hex;
}

const servers = config.servers;

function changeColor() {
for (let index = 0; index < servers.length; ++index) {
var g=(Math.random()*1000)%255;
var r=(Math.random()*1000)%255;
var b=(Math.random()*1000)%255;
var zet='#'+to_hex(g)+to_hex(r)+to_hex(b);
client.guilds.get(servers[index]).roles.find('name', config.roleName).setColor(zet)
    .catch(console.error);
 
if(config.logging){
console.log(`[ColorChanger] Changed color to ${zet} in server: ${servers[index]}`);
}

}
}


client.on('ready', () => {
console.log(`Logged in as ${client.user.username}!`);
if(config.speed < 10){console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1);}
setInterval(changeColor, config.speed);
});

 
client.login(process.env.TOKEN);