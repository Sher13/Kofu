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
let search = require('youtube-search');
const ytdl = require('ytdl-core');

// Const

let db = new sqlite3.Database('db/users.db');
let v = config.vs;
const colorServers = ["381829822982389771", "471630590806851584"];
const servers = {
    myServer: {
        id: "471630590806851584",
        changeRole: "494465327476899840",
        colorChannel: "535391187411140608",
        voiceRole : "620182672618160137"
    },
    savaServer: {
        id: "622954155077533696"
    },
    rostikServer: {
        id: "470179380824506368"
    },
    jimmyServer: {
        id: "381829822982389771"
    },
    svetaServer: {
        id: "611111608219074570"
    },
    nerserServer: {
        id: "429729565817044992"
    }
}
const people = {
    sher: {
        id: "465931840398557194"
    },
    kofuBot: {
        id: "519186885331910676"
    },
    teaBot: {
        id: "654810705903484949"
    },
    kartusBot: {
        id: "523116257390886954"
    }
}
let q = {};
let d = {};
q.m = new Map();
d.m = new Map();
let mus = new Music(q, d, client);

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
    for (let i = 0; i < v.length; i++) {
        let e = getRandom(0, v.length);
        let t = v[e];
        v[e] = v[i];
        v[i] = t;
    }
    return v;
}

// Discord function

function changeColor() {
    let value = getRandom(0, 16777216);
    let color = '#' + value.toString(16);
    let role = config.roleName;
    for (let index = 0; index < colorServers.length; index++) {
        client.guilds.get(colorServers[index]).roles.find('id', role[index]).setColor(color);
    }
    let channel = client.channels.get(servers.myServer.colorChannel);
    let emb = {
        embed: {
            title: color,
            color: value
        }
    };
    channel.send(emb);
}

function say(msg) {
    try {
        let p1 = msg.content.indexOf(' ');
        let text = msg.content.substring(p1 + 1);
        p1 = text.indexOf(' ');
        let ch_id = text.substring(0, p1);
        text = text.substring(p1 + 1);
        client.channels.get(ch_id).send(text);
        msg.delete();
    } catch {
        msg.reply("**ERROR!!**");
    }
}

function pick(msg) {
    try {
        let p1 = msg.content.indexOf(' ');
        let text = msg.content.substring(p1 + 1);
        p1 = text.indexOf(' ');
        let ch_id = text.substring(0, p1);
        text = text.substring(p1 + 1);
        p1 = text.indexOf(' ');
        let m_id = text.substring(0, p1);
        text = text.substring(p1 + 1);
        let em_id = text;
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
        let nw = getRandom(0, ms.length);
        let fl = 0;
        let emb = new RichEmbed()
            .setImage(ms[nw].img)
            .setTitle("Кто я? Нажми правильную реакцию:)");
        f.send("<@" + member.id + ">", emb)
            .then(res => {
                let em = new Array(0);
                em.push(ms[nw].emg);
                while (em.length !== 5) {
                    let w = getRandom(0, ms.length);
                    let fl = 1;
                    for (let i = 0; i < em.length; i++)
                        if (em[i] === ms[w].emg)
                            fl = 0;
                    if (fl === 1)
                        em.push(ms[w].emg);
                }
                em = shuffle(em);
                for (let i = 0; i < em.length; i++)
                    res.react(em[i]);
                const filter = (react, user) => user.id === member.id;
                const collector = res.createReactionCollector(filter);
                let timerId = setTimeout(function () {
                    if (member._roles.length === 0) {
                        f.send("<@" + member.id + "> " + "Время ожидания истекло. Прощай.");
                        member.kick();
                    }
                }, 900000);
                collector.on('collect', (reaction, reactionCollector) => {
                    if (reaction.emoji.name === ms[nw].emg) {
                        f1.send("<@" + member.id + "> " + "Отлично, выбери <#611883715190194196> и приступай.")
                        clearTimeout(timerId);
                        member.addRole(role)
                        collector.stop();
                    } else {
                        if (kl === 2) {
                            f.send("К сожалению, ты ошибся. Осталась одна попытка.");
                            collector.stop();
                            clearTimeout(timerId);
                            iden(f, f1, member, ms, role, kl + 1);
                        }
                        if (kl === 1) {
                            f.send("К сожалению, ты ошибся. У тебя есть еще 2 попытки.");
                            collector.stop();
                            clearTimeout(timerId);
                            iden(f, f1, member, ms, role, kl + 1);
                        }
                        if (kl === 3) {
                            f.send("К сожалению, ты ошибся. Прощай");
                            collector.stop();
                            clearTimeout(timerId);
                            setTimeout(function () {
                                member.kick()
                            }, 10000);
                        }
                    }
                });
            });
    }
}

function lowerCase(s) {
    let s1 = "";
    for (let i = 0; i < s.length; i++) {
        if (s.charCodeAt(i) === 1025) {
            s1 += "е";
        } else if (s.charCodeAt(i) >= 1040 && s.charCodeAt(i) <= 1071) {
            s1 += String.fromCharCode(s.charCodeAt(i) + 32);
        } else
            s1 += s.charAt(i);
    }
    return s1;
}

function isDigit(s) {
    if (s.charCodeAt(0) >= 97 && s.charCodeAt(0) <= 122)
        return true;
    return s.charCodeAt(0) >= 1072 && s.charCodeAt(0) <= 1103;

}

function rand_word(s) {
    let a = [];
    s = lowerCase(s);
    while (s.length > 0) {
        while (s.length > 0 && !isDigit(s.charAt(0))) {
            s = s.substr(1, s.length - 1);
        }
        let z = "";
        let i = 0;
        if (s.length === 0)
            break;
        while (i < s.length && isDigit(s.charAt(i))) {
            z = z + s.charAt(i);
            i++;
        }
        if (z !== "")
            a.push(z);
        s = s.substring(i, s.length);
    }
    let e = getRandom(0, a.length);
    return a[e];
}

function getStrof(s, w) {
    let s1 = lowerCase(s);
    let ans = "";
    s1 = s1.replace("  ", " ");
    let ms = [s1.split("\n\n"), s1.split("\n \n"), s1.split("."),
        s1.split("?"), s1.split("!"), s1.split(";")];
    for (let i = 0; i < ms.length; i++) {
        for (let j = 0; j < ms[i].length; j++) {
            if (ms[i][j].indexOf(w) !== -1 && (ans === "" || ms[i][j].length < ans.length)) {
                ans = ms[i][j];
            }
        }
    }
    return ans;
}

// DataBase

function newUsers(v) {
    let sql = "INSERT INTO Users(id_d) VALUES (" + v + ")";
    db.run(sql);
}

function addPoint(v) {
    let f = 2;
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

function get_text(msg) {
    let sql = "SELECT * FROM Links";
    db.all(sql, [], (err, rows) => {
        let emb = new RichEmbed()
            .setColor(14614685)
            .setTitle("Links");
        rows.forEach((row) => {
            emb.addField("‎", row.text);
        })
        msg.channel.send(emb);
    })
}

function del_text(msg, id) {
    let sql = "SELECT * FROM Links";
    db.all(sql, [], (err, rows) => {
        id = rows[id].id;
        sql = "DELETE FROM Links WHERE id = ?";
        db.run(sql, id, (err) => {
            if (err) {
                return msg.reply("error");
            }
            msg.reply("ok");
        })
    })
}

function parseAnswer(msg, user, text) {
    var members = msg.guild.members;
    return text.replace("@author",`${members.get(msg.author.id)}`)
        .replace("@number", getRandom(1000000, 1000000000))
        .replace("@me", `${members.get(people.kofuBot.id)}`)
        .replace("@user",`${user}`)
        .replace("@random", `${members.array()[getRandom(0, members.size)]}`);
}

// Message

client.on("message", (msg) => {
    addPoint(msg.author.id);
    if (msg.content.startsWith("ping"))
        msg.channel.send("pong!");
    if (msg.content.startsWith("changeRole") && msg.author.id === people.sher.id) {
        let role = "";
        if (msg.guild.id === servers.myServer.id)
            role = servers.myServer.changeRole;
        let e = msg.guild.members.array();
        let s = "";
        if (msg.content.indexOf(' ') !== -1)
            s = msg.content.substring(msg.content.indexOf(' ') + 1);
        for (let i = 0; i < e.length; i++) {
            if (e[i].roles.has(role)) {
                try {
                    e[i].setNickname(s)
                } catch {
                    msg.channel.send("Error");
                }
            }
        }
    }
    if (msg.content === "ch") {
        changeColor();
        msg.channel.send("ok:ok_hand: :wink: ");
    }
    if (msg.content.startsWith("say") && msg.author.id === people.sher.id) {
        say(msg);
    }
    if (msg.content.startsWith("pick") && msg.author.id === people.sher.id) {
        pick(msg);
    }
    if (msg.content.startsWith("hh")) {
        msg.react("➕");
        msg.react("➖");
    }
    if (msg.content.toLowerCase() === "vi") {
        let e = Math.round(Math.random() * v.length);
        let emb = new RichEmbed()
            .setColor(16648050)
            .setImage(v[e]);
        msg.channel.send(emb);
        msg.delete();
    }
    if (msg.content === "leave" && msg.author.id === people.sher.id) {
        msg.channel.send("Goodbay :wave: ")
        setTimeout(function () {
            msg.guild.leave()
        }, 100);
    }
    if (msg.content.startsWith('ava')) {
        let emb;
        let s = msg.content;
        if (s.indexOf(' ') !== -1 && s.indexOf(' ') + 3 < s.length) {
            let id = s.substring(s.indexOf(' ') + 3, s.length - 1);
            while (id.charAt(0) < '0' || id.charAt(0) > '9')
                id = id.substring(1);
            let us = client.users.get(id);
            emb = new RichEmbed()
                .setImage(us.avatarURL);
        } else {
            emb = new RichEmbed()
                .setImage(msg.author.avatarURL);
        }
        msg.reply(emb)
    }

    if (msg.content.startsWith("add_") && msg.author.id === people.sher.id) {
        let df = msg.content.split(" ");
        welc.ms.push({
            img: df[1],
            emg: df[2]
        });
        fs.writeFile("welc.json", JSON.stringify(welc), function (err, result) {
            if (err) msg.channel.send('error', err)
            else
                msg.channel.send("ok");
        });
    }
    /*if (msg.content == "link") {
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
    }*/

    if (msg.author.id !== people.kofuBot.id && msg.author.id !== people.kartusBot.id && msg.author.id !== people.teaBot.id
        && (msg.content.toLowerCase().indexOf("смерт") !== -1 || msg.content.toLowerCase().indexOf("суицид") !== -1)) {
        let citat = config.citat;
        let rd = Math.round(Math.random() * citat.length);
        msg.channel.send(citat[rd]);
    }

    if ((msg.guild.id === servers.savaServer.id || msg.author.id === people.sher.id || msg.content.startsWith('qt')) && msg.author.id !== people.kofuBot.id) {
        let m = msg.content; // получаем весь текст сообщения
        let fl = 0;
        if (msg.content.startsWith('qt')) { //если начинается с qt обрежем его и запомним, что так было в fl
            m = msg.content.substring(3, msg.content.length);
            fl = 1;
        }
        let rd = rand_word(m); // достает рандомное слово из строки m
        let b = [];
        let versh = config.versh; // массив всех стихов
        for (let i = 0; i < versh.length; i++) // находит все стихи, где есть это слово и записывает их в b
            if (lowerCase(versh[i]).includes(rd))
                b.push(versh[i]);
        if (b.length !== 0 && (getRandom(0, 100) === 13 || fl === 1)) { // если ести стихи с этим словом и рандом выпадает (или же у нас был запрос qt) отправим стих
            let t = getRandom(0, b.length); // выберем рандомный стих из b
            msg.channel.send("```" + getStrof(b[t], rd) + "```"); // вот тут выберем предложение из стиха
        }
        if (fl === 1 && b.length === 0) {// если был запрос qt и стихотворений нет
            msg.reply("Извини, у меня нет стихотворений с таким словом:(");
        }
    }


    // DataBase

    if (msg.content === "create" && msg.author.id === people.sher.id) {
        let sql = 'CREATE TABLE [Links] ([id] INTEGER NOT NULL PRIMARY KEY,[text] letCHAR(1024))';
        db.run(sql);
    }
    if (msg.content === "get") {
        let f = 0;
        let sql = "SELECT points FROM Users WHERE id_d= ?"
        let id_d = msg.author.id;
        db.get(sql, [id_d], (err, row) => {
            return row ?
                f = row.points :
                msg.reply(`Ууупс, что-то пошло не так. Подожди минутку и попробуй снова :wink: :cherry_blossom: `);
        });
        setTimeout(function () {
            let emb = new RichEmbed()
                .setColor(16648050)
                .setDescription("Ваши баллы: " + f + ":cherry_blossom:");
            msg.reply(emb)
        }, 150);
    }


    if (msg.author.id === people.sher.id && msg.content.startsWith("add ")) {
        let text = msg.content.substring(4);
        let sql = "INSERT INTO Links(text) VALUES ('" + text + "')";
        if (text.length > 1024) {
            msg.reply("too long string");
        } else {
            db.run(sql, (err) => {
                if (err) {
                    return msg.reply("error");
                }
                msg.reply("ok");
            });
        }
    }

    if (msg.content === "link" && msg.author.id === people.sher.id) {
        get_text(msg);
    }

    if (msg.author.id === people.sher.id && msg.content.startsWith("del")) {
        let id = msg.content.substring(4);
        del_text(msg, id);
    }

    // Music

    let sq = q.m.get(msg.guild.id);
    if (msg.content.startsWith(`${config.prefix}play`) || msg.content.startsWith(`${config.prefix}p `))
        mus.add_m(msg, sq);
    if (msg.content === `${config.prefix}np`)
        mus.np(msg, sq);
    if (msg.content === `${config.prefix}pause`)
        mus.pause(msg, sq);
    if (msg.content === `${config.prefix}end` || msg.content === `${config.prefix}leave`)
        mus.end(msg, sq);
    if (msg.content === `${config.prefix}queue` || msg.content === `${config.prefix}q`)
        mus.get_q(msg, sq);
    if (msg.content === `${config.prefix}skip` || msg.content === `${config.prefix}s`)
        mus.skip(msg, sq);
    if (msg.content === `${config.prefix}resume` || msg.content === `${config.prefix}r`)
        mus.resume(msg, sq);
    if (msg.content === `${config.prefix}help`) {
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
    if (msg.content === "доколе") {
        data = new Date(2023, 8, 12, 0, 0, 0, 0);
        now = new Date();
        minus = data - now;
        str = " ms";
        str = (Math.floor(minus % 1000)).toString() + str
        minus /= 1000;
        str = (Math.floor(minus % 60)).toString() + " sec " + str;
        minus /= 60;
        str = (Math.floor(minus % 60)).toString() + " min " + str;
        minus /= 60;
        str = (Math.floor(minus % 24)).toString() + " hour " + str;
        minus /= 24;
        str = (Math.floor(minus)).toString() + " day " + str;
        let num = getRandom(0, 12) + 1;
        let embed = new RichEmbed()
            .setTitle('Left to wait')
            .addField("‎", ":clock" + num.toString() + ": " + str);
        msg.reply(embed);
    }
    if ((msg.guild.id == servers.nerserServer.id || msg.guild.id == servers.myServer.id)
        &&  (msg.content.startsWith("!ban") || msg.content.startsWith("!бан"))) {
        let s = msg.content;
        let errorMessage = ["Писать научись и там поговорим",
        "Может лучше всё же тебя?",
        "@random его?"];
        if (s.indexOf(' ') !== -1 && s.indexOf(' ') + 4 < s.length) {
            let id = s.substring(s.indexOf(' ') + 4, s.length - 1);
            while (id.charAt(0) < '0' || id.charAt(0) > '9')
                id = id.substring(1);
            let us = client.users.get(id);
            if (us === undefined) {
                msg.channel.send(parseAnswer(msg, 0, errorMessage[getRandom(0, errorMessage.length)]));
            } else {
                let ban = config.ban;
                msg.channel.send(parseAnswer(msg, us, ban[getRandom(0, ban.length)]));
            }
        } else {
            msg.channel.send(parseAnswer(msg, 0, errorMessage[getRandom(0, errorMessage.length)]));
        }
    }
});

// guildMemberAdd

client.on('guildMemberAdd', member => {
    if (member.guild.id === servers.svetaServer.id) {
        let ms = welc.ms;
        let nw = Math.floor(Math.random() * ms.length) % ms.length;
        let f = client.channels.get("618171844775641088");
        let f1 = client.channels.get("611111608219074572");
        iden(f, f1, member, ms, "611251294807654453", 1);
    }
    if (member.guild.id === servers.myServer.id) {
        let ms = welc.ms;
        let nw = Math.floor(Math.random() * ms.length) % ms.length;
        let f = client.channels.get("571749559689019408");
        let f1 = client.channels.get("619552846328627201");
        iden(f, f1, member, ms, "494932346655604736", 1);
    }
});

// voiceChat

client.on("voiceStateUpdate", (ol, nw) => {
    if (nw.guild.id === servers.myServer.id) {
        if (nw.voiceChannelID)
            nw.addRole(servers.myServer.voiceRole);
        else
            nw.removeRole(servers.myServer.voiceRole);
    }
})

// Others

client.on('ready', () => {
    setInterval(changeColor, config.speed);
    let data = new Date(2023, 8, 12, 0, 0, 0, 0);
    let now = new Date();
    let minus = data - now;

    function pingPavuk() {
        let cl = client.channels.get("666143344417570816");
        cl.send("<@!617311015591346198> Время вышло!");
    }

    if (minus > 0 && minus < 86400000) {
        setTimeout(pingPavuk, minus);
    }
});

client.login("NTE5MTg2ODg1MzMxOTEwNjc2.XAVYdw.mcyHeLuhhigsxA3UoUf9QwfCo-w");
