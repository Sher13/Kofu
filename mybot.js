const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});
function changeColor() {
for (let index = 0; index < servers.length; ++index) {
var zet='#'+((Math.random()*10000000000)%16777216).toString(16);
client.guilds.get(servers[index]).roles.find('name', config.roleName).setColor(zet)
    .catch(console.error);
 
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
var o =msg.author.id;
/*if (msg.content.includes("<@204590199932452864>"))
	msg.channel.send("Ужасный ужасный человек. Забудь его ник")
if (msg.content=="Вообще то он классный!!!"&&o=="532969529857409063")
	msg.channel.send("Ну такоооое. А ты знал, что он садист?")
if (msg.content=="А ты слышала, что он говорил об этом? Это только эстетика, а не то, без чего нельзя жить!"&&o=="532969529857409063")
	msg.channel.send("Меня пугает твоя осведомленность в данном вопросе :thinking: ")*/
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




client.on('ready', () => {
console.log(`Logged in as ${client.user.username}!`);
if(config.speed < 10){console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1);}
setInterval(changeColor, config.speed);
});

 
client.login(process.env.TOKEN);