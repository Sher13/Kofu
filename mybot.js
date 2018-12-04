const Discord = require("discord.js");
const client = new Discord.Client();
 
client.on("ready", () => {
  console.log("I am ready!");
});
var now;
 
client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.send("pong!");
  }
	if (message.content.includes("date")) {
   now=new Date();
  }
if (message.content.includes("now")) {
     message.channel.send(now);
  }

});
 
client.login(process.env.TOKEN);