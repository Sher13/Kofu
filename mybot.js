const discord = require("discord.js");
const client = new discord.Client();
const {
    Client,
    RichEmbed
} = require('discord.js');
const fs = require("fs");
var search = require('youtube-search');
const welc = require('./welc.json');
const ytdl = require('ytdl-core');
const config = require('./config.json');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('db/users.db');
client.on("ready", () => {
    console.log("I am ready!");
    client.user.setPresence({
        game: {
            name: 'на глупое человечество',
            type: 3
        },
        status: 'online'
    })
});
var v=config.vs;
function changeColor() {
	var kl = (Math.round((Math.random() * 10000000000)) % 16777216);
    var zet = '#' + kl.toString(16);
	
    for (let index = 0; index < servers.length; ++index) {
        client.guilds.get(servers[index]).roles.find('name', config.roleName).setColor(zet);
    }
	var f = client.channels.get("535391187411140608");
        var emb = {
            embed: {
                title: zet,
                color: kl
            }
        };
        f.send(emb);

}
function ff(msg,s)
{
	if (msg.embeds[0]){
	if (msg.embeds[0].description&&msg.embeds[0].description.includes(s))
		return true;
	if (msg.embeds[0].title&&msg.embeds[0].title.includes(s))
		return true;
	if (msg.embeds[0].author&&msg.embeds[0].author.name&&msg.embeds[0].author.name.includes(s))
		return true;
	for(var i=0;i<msg.embeds[0].fields.length;i++)
		{
			if (msg.embeds[0].fields[i].name.includes(s))
				return true;
			if (msg.embeds[0].fields[i].value.includes(s))
				return true;
		}
		return false;
	} else
		return false;
}
function shuffle(v)
{
	for(var i=0;i<v.length;i++)
		{
			var e=(Math.floor(Math.random()*v.length))%v.length;
			var t=v[e];
			v[e]=v[i];
			v[i]=t;
		}
	return v;
}
function nw(v)
{
	let sql="INSERT INTO Users(id_d) VALUES ("+v+")";
		db.run(sql);			
}
function add(v)
{
	var f=2;
	let sql="SELECT points FROM Users WHERE id_d= ?"
			let id_d=v;
    		db.get(sql, [id_d], (err, row) => {
				return row
					? f=2
					: nw(v);
			});
	f=Math.floor(Math.random()*5+5);
	let r="UPDATE Users SET points=points+"+f+" WHERE id_d="+v;
	db.run(r);
}

client.on("message", (msg) => {
  add(msg.author.id);
  if (msg.content.startsWith("ping")) {
    msg.channel.send("pong!");
  }
  if (msg.content=="r")
	  msg.member.setNickname("Розочка🌸");
  if (msg.content=="t")
	  msg.member.setNickname("Тюльпанчик🌷");
  if (msg.content=="l")
	  msg.member.setNickname("Лилия⚜️");
  if (msg.content=="cr"&&(msg.author.id=="361571289384747012"||msg.author.id=="465931840398557194"))
	  {
		  var role="";
		  if (msg.guild.id=="470179380824506368")
			  role="476520273479335937";
		  if (msg.guild.id=="471630590806851584")
			  role="494465327476899840";
		  var e=msg.guild.members.array();
		  for(var i=0;i<e.length;i++)
		  {
			 if (e[i].roles.has(role)) {
			 	try {
					e[i].setNickname("Цветочек🌼")
				} catch(er){
					msg.channel.send("Error");
				};
			 }
		  }
	  }
	if (msg.content=="cr1"&&(msg.author.id=="361571289384747012"||msg.author.id=="465931840398557194"))
	  {
		  var role="";
		  if (msg.guild.id=="470179380824506368")
			  role="476520273479335937";
		  if (msg.guild.id=="471630590806851584")
			  role="494465327476899840";
		  var e=msg.guild.members.array();
		  for(var i=0;i<e.length;i++)
			  {
				  if (e[i].roles.has(role)) {
			 		try {
					     e[i].setNickname("Цветочек🌼")
					} catch(er){
						msg.channel.send("Error");
					};
				  }
			  }
	  }
if (msg.content==="ch") {
    changeColor();
	msg.channel.send("ok:ok_hand: :wink: ");
  }
if (msg.content.startsWith("say")&&msg.author.id=="465931840398557194")
	{
		var p1=msg.content.indexOf(' ');
			var text=msg.content.substring(p1+1);
			p1=text.indexOf(' ');
			var ch_id=text.substring(0,p1);
			text=text.substring(p1+1);
			client.channels.get(ch_id).send(text);
	}
if (msg.content.startsWith("pick")&&msg.author.id=="465931840398557194")
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
			try {
				client.channels.get(ch_id).fetchMessages({around: m_id, limit: 1}).then(
			messages => { messages.first().react(em_id);
			})
			} catch(e)
				{
					msg.reply("**ERROR!!**");
				}
			msg.delete();
		}
	if (msg.content.startsWith("hh"))
		{
			msg.react("➕"); 
			msg.react("➖");
		}
	if (msg.content==="vi")
		{
			var e=Math.round(Math.random()*v.length);
			var emb = new RichEmbed()
            .setColor(16648050)
 			.setImage(v[e]);
			msg.channel.send(emb);
			msg.delete();
		}
	if (msg.content=="leave"&&msg.author.id=="465931840398557194")
		{
			 msg.channel.send("Goodbay :wave: ")
			 setTimeout(function(){msg.guild.leave()},100);
		}
	if (msg.content=="create"&&msg.author.id=="465931840398557194")
		{
			 let sql ='CREATE TABLE [Users] ([id] INTEGER NOT NULL PRIMARY KEY,[id_d] VARCHAR(30),[points] INTEGER DEFAULT 0)';
			db.run(sql);
    	}
	if (msg.content=="get")
		{
			var f=0;
			let sql="SELECT points FROM Users WHERE id_d= ?"
			let id_d=msg.author.id;
    		db.get(sql, [id_d], (err, row) => {
				return row
					? f=row.points
					: msg.reply(`Ууупс, что-то пошло не так. Подожди минутку и попробуй снова :wink: :cherry_blossom: `);
			});
			setTimeout(function(){
				var emb = new RichEmbed()
            		.setColor(16648050)
					.setDescription("Ваши баллы: "+f+":cherry_blossom:");
				msg.reply(emb)},150);
		}
	if (msg.content=="ava")
		{
			var emb = new RichEmbed()
            .setColor(16648050)
 			.setImage(msg.author.avatarURL);

        	msg.reply(emb)
		}
	if (msg.author.id=="315926021457051650"&&ff(msg,"Server bumped"))
		{
			msg.channel.send("ok");
			setTimeout(function(){msg.channel.send("Пора бампать.<@&613799917718077450>" );},14400000);
		}
	if (msg.author.id=="464272403766444044"&&ff(msg,"Сервер Up"))
		{
			msg.channel.send("ok");
			setTimeout(function(){msg.channel.send("Пора бампать.<@&613799917718077450>" );},14400000);
		}
	if (msg.content.startsWith("add")&&msg.author.id=="465931840398557194")
		{
			var df=msg.content.split(" ");
			welc.ms.push({img:df[1],emg:df[2]});
			fs.writeFile("welc.json",JSON.stringify(welc),function(err, result) {
				if (err) msg.channel.send('error', err)
				else
					msg.channel.send("ok");
   			});
		}
});
function iden(f,f1,member,ms,role,kl)
{
	if (member){
	var nw=Math.floor(Math.random()*ms.length)%ms.length;
				var fl=0;
				var emb = new RichEmbed()
					.setImage(ms[nw].img)
					.setTitle("Кто я? Нажми правильную реакцию:)");
				f.send("<@"+member.id+">",emb)
					.then(res=>{
						var em=new Array(0);
						em.push(ms[nw].emg);
					while(em.length!=5)
					{
						var w=Math.floor(Math.random()*ms.length)%ms.length;
						var fl=1;
						for(var i=0;i<em.length;i++)
							if (em[i]==ms[w].emg)
								fl=0;
						if (fl==1)
							em.push(ms[w].emg);
					}
					em=shuffle(em);
				for(var i=0;i<em.length;i++)
				res.react(em[i]);
				por=0;
				const filter=(react,user)=>user.id ==member.id;
				const collector = res.createReactionCollector(filter);
				let timerId = setTimeout(function(){
					if (member._roles.length==0){
					f.send("<@"+member.id+"> "+"Время ожидания истекло. Прощай.");
					member.kick();
					}
				},900000);
					collector.on('collect', (reaction, reactionCollector) => {
				if (reaction.emoji.name==ms[nw].emg)
				{
					f1.send("<@"+member.id+"> "+"Отлично, выбери <#611883715190194196> и приступай.")
					clearTimeout(timerId);
					member.addRole(role)
					collector.stop();
				}
				else
				{
					if (kl==2){
					f.send("К сожалению, ты ошибся. Осталась одна попытка.");
					collector.stop();
					clearTimeout(timerId);
					iden(f,f1,member,ms,role,kl+1);
					}
					if (kl==1){
					f.send("К сожалению, ты ошибся. У тебя есть еще 2 попытки.");
					collector.stop();
					clearTimeout(timerId);
					iden(f,f1,member,ms,role,kl+1);
					}
					if (kl==3)
						{
							f.send("К сожалению, ты ошибся. Прощай");
							collector.stop();
							clearTimeout(timerId);
							setTimeout(function(){member.kick()},10000);
						}
				}
			});	
				});
	}
}
client.on('guildMemberAdd', member => {
	if (member.guild.id=="611111608219074570") {
	var ms=welc.ms;
	var nw=Math.floor(Math.random()*ms.length)%ms.length;
  	var f = client.channels.get("618171844775641088");
	var f1 = client.channels.get("611111608219074572");
	iden(f,f1,member,ms,"611251294807654453",1);
	}
	if (member.guild.id=="471630590806851584") {
	var ms=welc.ms;
	var nw=Math.floor(Math.random()*ms.length)%ms.length;
  	var f = client.channels.get("571749559689019408");
	var f1 = client.channels.get("619552846328627201");
	iden(f,f1,member,ms,"494932346655604736",1);
	}
});
client.on("voiceStateUpdate", (ol,nw) =>{
	if (nw.guild.id=="471630590806851584"){
	if(nw.voiceChannelID)
		nw.addRole("620182672618160137");
	else
		nw.removeRole("620182672618160137");
	}
})
const servers = ["381829822982389771","471630590806851584"];

client.on('ready', () => {
    setInterval(changeColor, config.speed);});

client.login(process.env.TOKEN);