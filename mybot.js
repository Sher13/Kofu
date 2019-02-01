const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const fs = require("fs")
var cin = fs.readFileSync("file.txt", "utf8");
var c = fs.readFileSync("f1.txt", "utf8");
var tl=c;
const config = require('./config.json');
var dateTime = require('node-datetime');
var fl=cin;
function flag(){
	fl=1;
	fs.writeFileSync("file.txt", fl);
}
function tli(){
	tl=1;
	fs.writeFileSync("f1.txt", tl);
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
if (msg.content.includes(" char"))
	{
		var mess=msg.content.substring(0,msg.content.indexOf(" char"));
		var e=per(mess);
		msg.reply(e);
	}
	 if(msg.content.includes("wtf")||(msg.content.includes("fuck"))||(msg.content.includes("bitch"))){
   msg.delete();
   msg.reply("***bad words are disable in server***:rage:");
  }
var id="465931840398557194";
var rus="204590199932452864";
var us=client.users.get(id);
var o =msg.author.id;
var dt = dateTime.create();
		var data=new Date(dt.now())+"";
		var tm=data.substring(16,18);
		console.log(tm);
if (fl==1&&o==rus&&us.presence.status=="offline"&&msg.content.includes("<@465931840398557194>"))
	{
		msg.reply("Мне жаль. Аля сейчас офлайн");
		if (tm>=5&&tm<17)
			{
				var emb = {
					embed: {
					title:" **Скорее всего Аля сейчас на учебе. Ей очень скучно, но видимо сейчас важная пара**",
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
					title: "**Аля ушла спать. Она уже скучает. А вообще тебе тоже пора спать** :heart: ",
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

/*if ((tm>14||tm<=2)&&us.presence.status!="offline"&&tl==1&&o==id)
			{
				msg.reply('ok');
				var s = ["Куцкер иди спать, ты опять убиваешь свой режим.", "Руслан, я знаю, что в глубине души ты хочешь спать.", "Кодинг это не главное в жизни. Спать намного лучше. ", "Возможно, именно в этот момент, ты соберешься и пойдешь спать. Поверь мне это круто", "Сон не для слабаков"];
				var r=Math.round((Math.random()*1000))%5;
				msg.channel.send(r+" "+s[r]+" ");
				var emb = {
					embed: {
					title:"**"+s[r]+"**",
					color:"14614685",
					image:
						{
							url: "https://cdn.discordapp.com/attachments/534380967130038274/534471005150642176/nya14.gif"
						}
					}
					};
				msg.channel.send(emb);
				tl=0;
				fs.writeFileSync("f1.txt", tl);
			}*/
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
 if (msg.content.startsWith("кусь"))
	 {
		var embed = new RichEmbed()
            .setColor(14614685)
            .setDescription('<@' + msg.author.id + '> укусил ' + msg.content.substring(msg.content.indexOf("<"), msg.content.indexOf(">") + 1) )
 		.setImage("https://cdn.discordapp.com/attachments/534380967130038274/541017392021635072/8e352a6a1ef64e8b3a6bc16d8783949e.gif");

        msg.reply(embed);
	 }
	if (msg.content.includes("Куцкер злой")||msg.content.includes("Куцкер Злой")||msg.content.includes("куцкер Злой")||msg.content.includes("куцкер злой"))
	{
		var emb = {
					embed: {
					title: "**Ня. Вот. Не будь злым. Кушай.**\n ",
					color:"14614685",
					image:
						{
							url: "https://cdn.discordapp.com/attachments/534380967130038274/534424030627889152/nya10.gif"
						}
					}
					};
				msg.channel.send(emb);
	}
	var ifedle = [
        "https://media1.tenor.com/images/78095c007974aceb72b91aeb7ee54a71/tenor.gif?itemid=5095865",
        "https://media.tenor.com/images/2e7cc2d6a4f39473abc2015fee593b40/tenor.gif",
        'https://69.media.tumblr.com/eb891f0d3ef2edadd539878c01ec0774/tumblr_ohqd4cfTzn1vmoyzro1_500.gif',
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
        "https://69.media.tumblr.com/58782c40408faced4be4738f95e687da/tumblr_mzvivm4cyN1sj63e7o1_500.gif",
        "https://69.media.tumblr.com/1ae47d6e18225d1395e6a3a25ab6535e/tumblr_nj489xfa4I1u7oqn0o1_400.gif",
        "https://69.media.tumblr.com/ab355fef4660bf6b1b04df5572068229/tumblr_nzf68mv6HN1satyyro1_500.gif",
        "https://69.media.tumblr.com/042929284fce471220173a6166c7c3b9/tumblr_ohqe4bCZ621reyllgo1_500.gif",
        "https://69.media.tumblr.com/04cd98d0cd043c9952ee522949187f47/tumblr_no02veHJNL1uu7scvo1_500.gif"
    ];

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    if (msg.content.toLowerCase().startsWith('сладких снов')) {

        var embed = new RichEmbed()
        // Set the title of the field
        //.setTitle()
        // Set the color of the embed
            .setColor(0x180a05)
            // Set the main content of the embed
            .setDescription('<@' + msg.author.id + '> пожелал сладких снов ' + msg.content.substring(msg.content.indexOf("<"), msg.content.indexOf(">") + 1) )
            // Send the embed to the same channel as the message
            .setImage(ifedle[getRandomInt(0, 7)]);

        msg.reply(embed);

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
setInterval(tli, config.kr);
});
fs.writeFileSync("file.txt", fl) ; 
client.login(process.env.TOKEN);