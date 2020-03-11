const discord = require("discord.js");
const client = new discord.Client();
const {
    Client,
    RichEmbed
} = require('discord.js');
const fs = require("fs");
const welc = require('./welc.json');
const config = require('./config.json');
const sqlite3 = require('sqlite3').verbose();
const Music = require('./music.js');
var search = require('youtube-search');
const ytdl = require('ytdl-core');

// Const

let db = new sqlite3.Database('db/users.db');
var v = config.vs;
const servers = ["381829822982389771", "471630590806851584"];
var q = new Object;
var d = new Object;
q.m = new Map();
d.m = new Map();
var mus = new Music(q, d, client);

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

// Just function

function getRandom(l, r) {
    return Math.round((Math.random() * r)) % (r - l) + l;
}

function shuffle(v) {
    for (var i = 0; i < v.length; i++) {
        var e = getRandom(0, v.length);
        var t = v[e];
        v[e] = v[i];
        v[i] = t;
    }
    return v;
}

// Discord function

function changeColor() {
    var value = getRandom(0, 16777216);
    var color = '#' + value.toString(16);
	var role = config.roleName;
    for (let index = 0; index < servers.length; index++) {
        client.guilds.get(servers[index]).roles.find('id', role[index]).setColor(color);
    }
    var channel = client.channels.get("535391187411140608");
    var emb = {
        embed: {
            title: color,
            color: value
        }
    };
    channel.send(emb);
}

function findStrings(msg, s) {
    if (msg.embeds[0]) {
        var emb = msg.embeds[0];
        if (emb.description && emb.description.includes(s))
            return true;
        if (emb.title && emb.title.includes(s))
            return true;
        if (emb.author && emb.author.name && emb.author.name.includes(s))
            return true;
        for (var i = 0; i < emb.fields.length; i++) {
            if (emb.fields[i].name.includes(s))
                return true;
            if (emb.fields[i].value.includes(s))
                return true;
        }
        return false;
    } else
        return false;
}

function say(msg) {
    try {
        var p1 = msg.content.indexOf(' ');
        var text = msg.content.substring(p1 + 1);
        p1 = text.indexOf(' ');
        var ch_id = text.substring(0, p1);
        text = text.substring(p1 + 1);
        client.channels.get(ch_id).send(text);
        msg.delete();
    } catch {
        msg.reply("**ERROR!!**");
    }
}

function pick(msg) {
    try {
        var p1 = msg.content.indexOf(' ');
        var text = msg.content.substring(p1 + 1);
        p1 = text.indexOf(' ');
        var ch_id = text.substring(0, p1);
        text = text.substring(p1 + 1);
        p1 = text.indexOf(' ');
        var m_id = text.substring(0, p1);
        text = text.substring(p1 + 1);
        var em_id = text;
        if (text.startsWith('<')) {
            p1 = text.indexOf(':');
            text = text.substring(p1 + 1);
            p1 = text.indexOf(':');
            em_id = text.substring(p1 + 1, text.length - 1);
        }
        client.channels.get(ch_id).fetchMessages({
            around: m_id,
            limit: 1
        }).then(
            messages => {
                messages.first().react(em_id);
            })
        msg.delete();
    } catch (er) {
        msg.reply("**ERROR!!**");
        console.log(er);
    }
}

function iden(f, f1, member, ms, role, kl) {
    if (member) {
        var nw = getRandom(0, ms.length);
        var fl = 0;
        var emb = new RichEmbed()
            .setImage(ms[nw].img)
            .setTitle("Кто я? Нажми правильную реакцию:)");
        f.send("<@" + member.id + ">", emb)
            .then(res => {
                var em = new Array(0);
                em.push(ms[nw].emg);
                while (em.length != 5) {
                    var w = getRandom(0, ms.length);
                    var fl = 1;
                    for (var i = 0; i < em.length; i++)
                        if (em[i] == ms[w].emg)
                            fl = 0;
                    if (fl == 1)
                        em.push(ms[w].emg);
                }
                em = shuffle(em);
                for (var i = 0; i < em.length; i++)
                    res.react(em[i]);
                const filter = (react, user) => user.id == member.id;
                const collector = res.createReactionCollector(filter);
                let timerId = setTimeout(function() {
                    if (member._roles.length == 0) {
                        f.send("<@" + member.id + "> " + "Время ожидания истекло. Прощай.");
                        member.kick();
                    }
                }, 900000);
                collector.on('collect', (reaction, reactionCollector) => {
                    if (reaction.emoji.name == ms[nw].emg) {
                        f1.send("<@" + member.id + "> " + "Отлично, выбери <#611883715190194196> и приступай.")
                        clearTimeout(timerId);
                        member.addRole(role)
                        collector.stop();
                    } else {
                        if (kl == 2) {
                            f.send("К сожалению, ты ошибся. Осталась одна попытка.");
                            collector.stop();
                            clearTimeout(timerId);
                            iden(f, f1, member, ms, role, kl + 1);
                        }
                        if (kl == 1) {
                            f.send("К сожалению, ты ошибся. У тебя есть еще 2 попытки.");
                            collector.stop();
                            clearTimeout(timerId);
                            iden(f, f1, member, ms, role, kl + 1);
                        }
                        if (kl == 3) {
                            f.send("К сожалению, ты ошибся. Прощай");
                            collector.stop();
                            clearTimeout(timerId);
                            setTimeout(function() {
                                member.kick()
                            }, 10000);
                        }
                    }
                });
            });
    }
}

function isDigit(s) {
	if (s.charCodeAt(0) >= 97 && s.charCodeAt(0) <= 122)
		return true;
	if (s.charCodeAt(0) >= 1072 && s.charCodeAt(0) <= 1103)
		return true;
	return false;
}

function rand_word(s) {
	var a = [];
	s.toLowerCase();
	while (s.length > 0) {
		while(s.length > 0 && !isDigit(s.charAt(0))) {
			s = s.substr(1,s.length-1);
		}
		var z = "";
		var i = 0;
		if (s.length == 0)
			break;
		while(i < s.length && isDigit(s.charAt(i))) {
			z = z + s.charAt(i);
			i++;
		}
		if (z != "")
			a.push(z);
		s = s.substring(i, s.length);
	}
	var e = getRandom(0, a.length);
	return a[e];
}

function getStrof(s, w) {
	var y = s.indexOf(w);
	var ans = "";
	var i = y;
	while(i < s.length && s.charAt(i) != '.' && s.charAt(i) != '?' && s.charAt(i) != '!') {
		ans += s.charAt(i);
		i++;
	}
	i = y-1;
	while(i >= 0 && s.charAt(i) != '.' && s.charAt(i) != '?' && s.charAt(i) != '!') {
		ans = s.charAt(i) + ans;
		i--;
	}
	return ans;
}

// DataBase

function newUsers(v) {
    let sql = "INSERT INTO Users(id_d) VALUES (" + v + ")";
    db.run(sql);
}

function addPoint(v) {
    var f = 2;
    let sql = "SELECT points FROM Users WHERE id_d= ?"
    let id_d = v;
    db.get(sql, [id_d], (err, row) => {
        return row ?
            f = 2 :
            newUsers(v);
    });
    f = Math.floor(Math.random() * 5 + 5);
    let r = "UPDATE Users SET points=points+" + f + " WHERE id_d=" + v;
    db.run(r);
}

// Message

client.on("message", (msg) => {
    addPoint(msg.author.id);
    if (msg.content.startsWith("ping"))
        msg.channel.send("pong!");
    if (msg.content.startsWith("cr") && (msg.author.id == "361571289384747012" || msg.author.id == "465931840398557194")) {
        var role = "";
        if (msg.guild.id == "470179380824506368")
            role = "476520273479335937";
        if (msg.guild.id == "471630590806851584")
            role = "494465327476899840";
        var e = msg.guild.members.array();
        var s = "";
        if (msg.content.indexOf(' ') != -1)
            s = msg.content.substring(msg.content.indexOf(' ') + 1);
        for (var i = 0; i < e.length; i++) {
            if (e[i].roles.has(role)) {
                try {
                    e[i].setNickname(s)
                } catch {
                    msg.channel.send("Error");
                };
            }
        }
    }
    if (msg.content == "ch") {
        changeColor();
        msg.channel.send("ok:ok_hand: :wink: ");
    }
    if (msg.content.startsWith("say") && msg.author.id == "465931840398557194") {
        say(msg);
    }
    if (msg.content.startsWith("pick") && msg.author.id == "465931840398557194") {
        pick(msg);
    }
    if (msg.content.startsWith("hh")) {
        msg.react("➕");
        msg.react("➖");
    }
    if (msg.content.toLowerCase() == "vi") {
        var e = Math.round(Math.random() * v.length);
        var emb = new RichEmbed()
            .setColor(16648050)
            .setImage(v[e]);
        msg.channel.send(emb);
        msg.delete();
    }
    if (msg.content == "leave" && msg.author.id == "465931840398557194") {
        msg.channel.send("Goodbay :wave: ")
        setTimeout(function() {
            msg.guild.leave()
        }, 100);
    }
    if (msg.content.startsWith('ava')) {
		var emb;
		var s = msg.content;
		if (s.indexOf(' ') != -1 && s.indexOf(' ')+3 < s.length) {
		var id = s.substring(s.indexOf(' ')+3,s.length-1);
		while (id.charAt(0) < '0' || id.charAt(0) > '9')
			id = id.substring(1);
		var us = client.users.get(id);
		emb = new RichEmbed()
            .setImage(us.avatarURL);
		} else {
			emb = new RichEmbed()
            .setImage(msg.author.avatarURL);
		}
        msg.reply(emb)
	}
    
    if ((msg.author.id == "315926021457051650" && findStrings(msg, "Server bumped")) || (msg.author.id == "464272403766444044" && findStrings(msg, "Сервер Up"))) {
        msg.channel.send("ok");
        setTimeout(function() {
            msg.channel.send("Пора бампать.<@&613799917718077450>");
        }, 14400000);
    }
    if (msg.content.startsWith("add") && msg.author.id == "465931840398557194") {
        var df = msg.content.split(" ");
        welc.ms.push({
            img: df[1],
            emg: df[2]
        });
        fs.writeFile("welc.json", JSON.stringify(welc), function(err, result) {
            if (err) msg.channel.send('error', err)
            else
                msg.channel.send("ok");
        });
    }
    if (msg.content == "link") {
        let emb = new RichEmbed()
            .setColor(14614685)
            .setTitle("Links")
            .addField("‎",
                "[:cherry_blossom:](https://icpc-neerc.atlassian.net/wiki/spaces/2019/pages/293634127) Волонтерство (инфа)\n" +
                "[:cherry_blossom:](https://neerc.ifmo.ru/volunteers/year/6) Волонтерство (распределение)\n" +
                "[:cherry_blossom:](https://beautifier.io/) CodeStyle (JS)\n" +
                "[:cherry_blossom:](http://format.krzaq.cc/) CodeStyle (C++)\n" +
                "[:cherry_blossom:](http://detexify.kirelabs.org/classify.html) Latex (символы)\n" +
                "[:cherry_blossom:](https://telegra.ph/STEP-Internship-Impressions-08-05) Стажировка (текст) \n")
            .addField("‎",
                "[:cherry_blossom:](https://careers.google.com/jobs/results/129125924734935750-student-training-in-engineering-program-step-2020/?category=DATA_CENTER_OPERATIONS&category=DEVELOPER_RELATIONS&category=HARDWARE_ENGINEERING&category=INFORMATION_TECHNOLOGY&category=MANUFACTURING_SUPPLY_CHAIN&category=NETWORK_ENGINEERING&category=PRODUCT_MANAGEMENT&category=PROGRAM_MANAGEMENT&category=SOFTWARE_ENGINEERING&category=TECHNICAL_INFRASTRUCTURE_ENGINEERING&category=TECHNICAL_SOLUTIONS&category=TECHNICAL_WRITING&category=USER_EXPERIENCE&company=Google&company=YouTube&employment_type=INTERN&jex=ENTRY_LEVEL) Стажировка (Стэп) \n" +
                "[:cherry_blossom:](https://www.cambridgelms.org/main/p/splash) English \n" +
                "[:cherry_blossom:](https://docs.google.com/spreadsheets/d/e/2PACX-1vQB2--2_zcbOYlzf23p_w437MU7pngkAI_qcPn2_YijU6S77Ly4DbKS6TJF1bmnlLUp0Na9zDHxhEut/pubhtml?gid=1095503722) Расписание\n")
            .addField("‎",
                "[АиСД](http://neerc.ifmo.ru/teaching/algo/year2019/) :cherry_blossom: [Баллы](https://docs.google.com/spreadsheets/d/127iNqKqvBMTa1XrxK3B-FHi8nJdDBD-AKzxm-dcf7MM/edit)\n" +
                "[ДМ](https://neerc.ifmo.ru/~sta/2019-2020/1-discrete-math/) :cherry_blossom: [дз](http://neerc.ifmo.ru/wiki/index.php?title=%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B9_%D0%BF%D0%BE_%D0%94%D0%9C_2020_%D0%B2%D0%B5%D1%81%D0%BD%D0%B0) :cherry_blossom: [Баллы](https://docs.google.com/spreadsheets/d/1A4kakVdcD_uSYW3tYGQ4scYCEaqgShlGDZgdQIlmW0g/edit#gid=0) \n")
            .addField("‎",
                "[Прога](http://www.kgeorgiy.info//courses/prog-intro/) :cherry_blossom: [Тесты](http://www.kgeorgiy.info/git/geo/prog-intro-2019/) :cherry_blossom: [Баллы](https://docs.google.com/spreadsheets/d/e/2PACX-1vQ52PnrWGnJHzy-KAde38XDw_EoEVBzAfAnHYVb_2Mr0x1LXGwgdXZNuNoA-YO01CA96MGbwu5BhSCL/pubhtml?gid=1513769318)\n" +
                "[:cherry_blossom:](https://docs.google.com/spreadsheets/d/1EGAy2292joJBGQtA6ctgDpX7JW0TsHOMMor3FUzN_AU/edit#gid=1255137594) МатАн\n" +
                "[:cherry_blossom:](https://docs.google.com/spreadsheets/d/13zY5hJwF6AXrTRQTKcauzaOMQdilpLLcHEH6EMkOjNk/edit#gid=0) ЛинАл\n"
            )
        msg.channel.send(emb);
    }

	if (msg.author.id != "519186885331910676" && (msg.content.toLowerCase().indexOf("смерт") != -1)) {
		var citat = config.citat;
		var rd = Math.round(Math.random() * citat.length);
		msg.channel.send(citat[rd]);
	}

	if (msg.guild.id == "622954155077533696" || msg.author.id == "465931840398557194") {
		var m = msg.content;
		var fl = 0;
		if (msg.content.startsWith('qt')) {
			m = msg.content.substring(3, msg.content.length);
			fl = 1;
		}
		var rd = rand_word(m);
		var b = [];
		var versh = config.versh;
		for (var i = 0; i < versh.length; i++) 
			if (versh[i].includes(rd))
				b.push(versh[i]);
		if (b.length != 0 && (getRandom(0, 50) == 13 || fl == 1)) {
			var t = getRandom(0, b.length);
			msg.channel.send("```"+getStrof(b[t], rd)+"```");
		}
		if (fl == 1 && b.length == 0) {
			msg.reply("Извини, у меня нет стихотворений с таким словом:(");
		}
	}

    // DataBase

    if (msg.content == "create" && msg.author.id == "465931840398557194") {
        let sql = 'CREATE TABLE [Users] ([id] INTEGER NOT NULL PRIMARY KEY,[id_d] VARCHAR(30),[points] INTEGER DEFAULT 0)';
        db.run(sql);
    }
    if (msg.content == "get") {
        var f = 0;
        let sql = "SELECT points FROM Users WHERE id_d= ?"
        let id_d = msg.author.id;
        db.get(sql, [id_d], (err, row) => {
            return row ?
                f = row.points :
                msg.reply(`Ууупс, что-то пошло не так. Подожди минутку и попробуй снова :wink: :cherry_blossom: `);
        });
        setTimeout(function() {
            var emb = new RichEmbed()
                .setColor(16648050)
                .setDescription("Ваши баллы: " + f + ":cherry_blossom:");
            msg.reply(emb)
        }, 150);
    }

    // Music

    var sq = q.m.get(msg.guild.id);
    if (msg.content.startsWith(`${config.prefix}play`) || msg.content.startsWith(`${config.prefix}p `))
        mus.add_m(msg, sq);
    if (msg.content == `${config.prefix}np`)
        mus.np(msg, sq);
    if (msg.content == `${config.prefix}pause`)
        mus.pause(msg, sq);
    if (msg.content == `${config.prefix}end` || msg.content == `${config.prefix}leave`)
        mus.end(msg, sq);
    if (msg.content == `${config.prefix}queue` || msg.content == `${config.prefix}q`)
        mus.get_q(msg, sq);
    if (msg.content == `${config.prefix}skip` || msg.content == `${config.prefix}s`)
        mus.skip(msg, sq);
    if (msg.content == `${config.prefix}resume` || msg.content == `${config.prefix}r`)
        mus.resume(msg, sq);
    if (msg.content == `${config.prefix}help`) {
        let embed = new RichEmbed()
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

// guildMemberAdd

client.on('guildMemberAdd', member => {
    if (member.guild.id == "611111608219074570") {
        var ms = welc.ms;
        var nw = Math.floor(Math.random() * ms.length) % ms.length;
        var f = client.channels.get("618171844775641088");
        var f1 = client.channels.get("611111608219074572");
        iden(f, f1, member, ms, "611251294807654453", 1);
    }
    if (member.guild.id == "471630590806851584") {
        var ms = welc.ms;
        var nw = Math.floor(Math.random() * ms.length) % ms.length;
        var f = client.channels.get("571749559689019408");
        var f1 = client.channels.get("619552846328627201");
        iden(f, f1, member, ms, "494932346655604736", 1);
    }
});

// voiceChat

client.on("voiceStateUpdate", (ol, nw) => {
    if (nw.guild.id == "471630590806851584") {
        if (nw.voiceChannelID)
            nw.addRole("620182672618160137");
        else
            nw.removeRole("620182672618160137");
    }
})

// Others

client.on('ready', () => {
    setInterval(changeColor, config.speed);
});

client.login(process.env.TOKEN);