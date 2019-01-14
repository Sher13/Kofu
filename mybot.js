const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
var cin = fs.readFileSync("file.txt", "utf8");
const config = require('./config.json');
var dateTime = require('node-datetime');
var fl=cin;
function flag(){
	fl=1;
	fs.writeFileSync("file.txt", fl);
}
 function per(s)
{
	var n=s.length;
	var ans="";
	for(var i=0;i<n;i++)
		{
			ans+=s[i].charCodeAt()+" ";
		}
	return ans;
}
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
	 if(msg.content.includes("wtf")||(msg.content.includes("fuck"))||(msg.content.includes("bitch"))){
   msg.delete();
   msg.reply("***bad words are disable in server***:rage:");
  }
var id="465931840398557194";
var rus="204590199932452864";
var us=client.users.get(id);
if (fl==1&&o==id&&us.presence.status=="offline"&&msg.content.includes("<@465931840398557194>"))
	{
		msg.reply("Мне жаль. Аля сейчас офлайн");
		var dt = dateTime.create();
		var data=new Date(dt.now())+"";
		var tm=data.substring(16,18);
		if (tm>=8&&tm<20)
			{
				var emb = {
					embed: {
					title: "**Скорее всего Аля сейчас на учебе. Ей очень скучно, но видимо сейчас важная пара**",
					color:"14614685",
					image:
						{
							url: "https://cdn.discordapp.com/attachments/534380967130038274/534427113281814540/nya12.gif"
						}
					}
					};
				msg.channel.send(emb);
				
			}
		else
			{
				var emb = {
					embed: {
					title: "**Аля ушла спать.Она дико извинялась и просила передать, что скучает** :heart: ",
					color:"14614685",
					image:
						{
							url: "https://cdn.discordapp.com/attachments/534380967130038274/534420063013437460/nya13.gif"
						}
					}
					};
				msg.channel.send(emb);
			}
		fl=0;
	}
if (msg.content.includes("скушать <@465931840398557194>"))
	{
		var emb = {
					embed: {
					title: "**Алю нельзя кушать. А Куцкер жёпа. Воть.**\n ",
					color:"14614685",
					image:
						{
							url: "https://cdn.discordapp.com/attachments/534380967130038274/534421438677909526/nya11.gif"
						}
					}
					};
				setTimeout(function (){msg.channel.send(emb)},2000);
	}
	if (msg.content.includes("Куцкер злой")||msg.content.includes("Куцкер Злой")||msg.content.includes("куцкер Злой")||msg.content.includes("куцкер Злой"))
	{
		var emb = {
					embed: {
					title: "**Ня. Вот не будь злым. Кушай.**\n ",
					color:"14614685",
					image:
						{
							url: "https://cdn.discordapp.com/attachments/534380967130038274/534424030627889152/nya10.gif"
						}
					}
					};
				msg.channel.send(emb);
	}
});
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
setInterval(flag, config.kuc);
});
fs.writeFileSync("file.txt", fl) ; 
client.login(process.env.TOKEN);