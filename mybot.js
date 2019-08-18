const discord = require("discord.js");
const client = new discord.Client();
const {
    Client,
    RichEmbed
} = require('discord.js');
const fs = require("fs")
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
var v=config.v;
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
	f=Math.floor(Math.random()*10+5);
	let r="UPDATE Users SET points=points+"+f+" WHERE id_d="+v;
	db.run(r);
}
client.on("message", (msg) => {
  add(msg.author.id);
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
	if (msg.content.startsWith("-h"))
		{
			msg.react("➕"); 
			msg.react("➖");
		}
	if (msg.content==="vi")
		{
			var e=Math.round(Math.random()*v.length);
			msg.channel.send(v[e]);
			msg.delete();
		}
	if (msg.content=="leave"&&msg.author.id=="465931840398557194")
		{
			 msg.channel.send("Goodbay :wave: ")
			 setTimeout(function(){msg.guild.leave()},100);
		}
	if (msg.content=="cr"&&msg.author.id=="465931840398557194")
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
            		.setColor(14614685)
					.setDescription("Ваши баллы: "+f+":cherry_blossom:");
				msg.reply(emb)},150);
		}
	if (msg.content=="ava")
		{
			var emb = new RichEmbed()
            .setColor(14614685)
 			.setImage(msg.author.avatarURL);

        	msg.reply(emb)
		}
});

const servers = ["381829822982389771","471630590806851584"];

client.on('ready', () => {
    setInterval(changeColor, config.speed);});

client.login(process.env.TOKEN);