const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');
const fs = require("fs")
const config = require('./config.json');
var search = require('youtube-search');
const sqlite3 = require('sqlite3').verbose();
const queue = new Map();
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
var q=new Map();
var d=new Map();
async function add_m(msg,sq)
{
	if (!msg.member.voiceChannel)
		return msg.channel.send('You need to be in a voice channel to play music!');
	var perm=msg.member.voiceChannel.permissionsFor(client.user);
	if (!perm.has("CONNECT"))
		return msg.channel.send('I need the permissions to join in your voice channel!')
	if (!perm.has("SPEAK"))
		return msg.channel.send('I need the permissions to speak in your voice channel!')
	var s=msg.content.substring(msg.content.indexOf(" ")+1,msg.content.length);
	var opts={
		key:"AIzaSyCCgTfGaHs_IZjcakdu2F6_ZEtCqgf1zao",
		MaxResults:1,
		type:"video"
	}
	var res=await search(s,opts);
	var e=res.results[0].link;
	var Info=await ytdl.getInfo(e);
	var song={
		title:Info.title,
		url:Info.video_url,
		author:msg.author.username
	}
	if (sq){
		sq.songs.push(song);
		msg.channel.send(`${song.title} has been added to the queue!`);
	} else
		{
			var q_const={
				voice:msg.member.voiceChannel,
				connection:null,
				songs:[],
				playing:true,
				volume:5				
			}
			q_const.songs.push(song);
			var con=await q_const.voice.join();
			q_const.connection=con;
			q.set(msg.guild.id,q_const);
			play(msg.guild,q_const.songs[0]);
			msg.channel.send(`${song.title} has been added to the queue!`);
		}
}
function play(guild,song)
{
	const sq=q.get(guild.id);
	if (!song)
		{
			sq.voice.leave();
			q.delete(guild.id);
			return;
		}
	const disp=sq.connection.playStream(ytdl(song.url))
		.on('end', () => {
			sq.songs.shift();
			play(guild, sq.songs[0]);
		});
	d.set(guild.id,disp);
	disp.setVolumeLogarithmic(sq.volume / 5);
}
function np(msg,sq)
{
	msg.channel.send("Now playing: "+sq.songs[0].title)
}
async function pause(msg,sq)
{
	const disp=d.get(msg.guild.id);
	if (!disp)
		msg.channel.send("Not musiс");
	await disp.pause();
	return msg.channel.send("Paused");
}
async function resume(msg,sq)
{
	const disp=d.get(msg.guild.id);
	if (!disp)
		msg.channel.send("Not music");
	await disp.resume();
	return msg.channel.send("Resumed");
}
function end(msg,sq)
{
	if (!msg.member.voiceChannel) return msg.channel.send('You have to be in a voice channel to end the music!');
	sq.songs=[];
	sq.connection.dispatcher.end();
}
function get_q(msg,sq)
{
	let embed=new Discord.RichEmbed()
	.setTitle('Queue')
	.setColor(14614685)
	for(var i=0;i<Math.min(10,sq.songs.length);i++)
		{
			embed.addField(":cherry_blossom: **"+(i+1)+".** "+sq.songs[i].title,"Added by: **"+sq.songs[i].author+"**");
		}
	msg.channel.send(embed);
}
function skip(msg,sq)
{
	if (!msg.member.voiceChannel) return msg.channel.send('You have to be in a voice channel to skip the music!');
	if (!sq) return msg.channel.send('Songs ended');
	sq.connection.dispatcher.end();
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
	var sq=q.get(msg.guild.id);
	if (msg.content.startsWith(`${config.prefix}play`)||msg.content.startsWith(`${config.prefix}p `))
		add_m(msg,sq);
	if (msg.content==`${config.prefix}np`)
		np(msg,sq);
	if (msg.content==`${config.prefix}pause`)
		pause(msg,sq);
	if (msg.content==`${config.prefix}end`||msg.content==`${config.prefix}leave`)
		end(msg,sq);
	if (msg.content==`${config.prefix}queue`||msg.content==`${config.prefix}q`)
		get_q(msg,sq);
	if (msg.content==`${config.prefix}skip`||msg.content==`${config.prefix}s`)
		skip(msg,sq);
	if (msg.content==`${config.prefix}resume`||msg.content==`${config.prefix}r`)
		resume(msg,sq);
	if (msg.content==`${config.prefix}help`)
		{
			let embed = new Discord.RichEmbed()
			.setColor(14614685)
			.setTitle("Music")
			.addField(":cherry_blossom: `play` or `p`", "Play url or search a video on youtube.")
			.addField(":cherry_blossom: `np`", "Shows what is playing right now.")
			.addField(":cherry_blossom: `queue` or `q`", "Shows the queue.")
			.addField(":cherry_blossom: `skip` or `s`", "Skips the currently playing song.")
			.addField(":cherry_blossom: `pause`", "Pause the currently playing song.")
			.addField(":cherry_blossom: `resume` or `r`", "Resume the paused song.")
			.addField(":cherry_blossom: `end` or `leave`", "Stop listening to music.")
			msg.channel.send(embed);
		}
});

const servers = ["381829822982389771","471630590806851584"];

client.on('ready', () => {
    setInterval(changeColor, config.speed);});

client.login(process.env.TOKEN);