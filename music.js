const discord = require("discord.js");
var search = require('youtube-search');
const ytdl = require('ytdl-core');
function Music(q,d,client) {
	this.d = d;
	this.q = q;
	this.client = client;
    this.add_m = async function (msg, sq) {
        if (!msg.member.voiceChannel)
            return msg.channel.send('You need to be in a voice channel to play music!');
        var perm = msg.member.voiceChannel.permissionsFor(client.user);
        if (!perm.has("CONNECT"))
            return msg.channel.send('I need the permissions to join in your voice channel!')
        if (!perm.has("SPEAK"))
            return msg.channel.send('I need the permissions to speak in your voice channel!')
        var s = msg.content.substring(msg.content.indexOf(" ") + 1, msg.content.length);
        var opts = {
            key: process.env.KEY,
            MaxResults: 1,
            type: "video"
        }
        var res = await search(s, opts);
        var e = res.results[0].link;
        var Info = await ytdl.getInfo(e);
        var song = {
            title: Info.title,
            url: Info.video_url,
            author: msg.author.username
        }
        if (sq) {
            sq.songs.push(song);
            msg.channel.send(`${song.title} has been added to the queue!`);
        } else {
            var q_const = {
                voice: msg.member.voiceChannel,
                connection: null,
                songs: [],
                playing: true,
                volume: 5
            }
            q_const.songs.push(song);
            var con = await q_const.voice.join();
            q_const.connection = con;
            q.m.set(msg.guild.id, q_const);
            this.play(msg.guild, q_const.songs[0]);
            msg.channel.send(`${song.title} has been added to the queue!`);
        }
    }
    this.play = function (guild, song) {
        const sq = q.m.get(guild.id);
        if (!song) {
            sq.voice.leave();
            q.m.delete(guild.id);
            return;
        }
        const disp = sq.connection.playStream(ytdl(song.url))
            .on('end', () => {
                sq.songs.shift();
                this.play(guild, sq.songs[0]);
            });
        d.m.set(guild.id, disp);
        disp.setVolumeLogarithmic(sq.volume / 5);
    }

    this.np = function (msg, sq) {
        msg.channel.send("Now playing: " + sq.songs[0].title)
    }
    this.pause = async function (msg, sq) {
        const disp = d.m.get(msg.guild.id);
        if (!disp)
            msg.channel.send("Not musiс");
        await disp.pause();
        return msg.channel.send("Paused");
    }
    this.resume = async function (msg, sq) {
        const disp = d.m.get(msg.guild.id);
        if (!disp)
            msg.channel.send("Not music");
        await disp.resume();
        return msg.channel.send("Resumed");
    }

    this.end = function (msg, sq) {
        if (!msg.member.voiceChannel) return msg.channel.send('You have to be in a voice channel to end the music!');
        sq.songs = [];
        sq.connection.dispatcher.end();
    }

    this.get_q = function (msg, sq) {
        let embed = new Discord.RichEmbed()
            .setTitle('Queue')
            .setColor(14614685)
        for (var i = 0; i < Math.min(10, sq.songs.length); i++) {
            embed.addField(":cherry_blossom: **" + (i + 1) + ".** " + sq.songs[i].title, "Added by: **" + sq.songs[i].author + "**");
        }
        msg.channel.send(embed);
    }

    this.skip = function (msg, sq) {
        if (!msg.member.voiceChannel) return msg.channel.send('You have to be in a voice channel to skip the music!');
        if (!sq) return msg.channel.send('Songs ended');
        sq.connection.dispatcher.end();
    }
}

module.exports = Music;