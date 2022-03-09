const discord = require("discord.js");
const {
    Client, MessageEmbed,
} = require('discord.js');
const client = new discord.Client({intents: 65535});
const fs = require("fs");
const welc = require('./welc.json');
const config = require('./config.json');

// Const

let v = config.vs;
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
    },
    veresiServer: {
        id: "884726247182184468"
    }
}
const colorServers = [servers.myServer.id];
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

client.on("ready", () => {
    console.log("I am ready!");
    client.user.setPresence({
        activities: [{
            name: 'на глупое человечество',
            type: 3
        }],
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
    let channel = client.channels.cache.get(servers.myServer.colorChannel);
    let emb = new discord.MessageEmbed({
        title: color,
        color: value
    });
    for (let index = 0; index < colorServers.length; index++) {
        client.guilds.cache.get(colorServers[index]).roles.cache.get(role[index]).setColor(color)
            .then(r => channel.send({embeds: [emb]}));
    }
}

function say(msg) {
    try {
        let text = msg.content.split(' ');
        client.channels.cache.get(text[1]).send(text.slice(2).join(" "));
        msg.delete();
    } catch {
        msg.reply("**ERROR!!**");
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

function isLetter(s) {
    if (s.charCodeAt(0) >= 97 && s.charCodeAt(0) <= 122)
        return true;
    return s.charCodeAt(0) >= 1072 && s.charCodeAt(0) <= 1103;
}

function isDigit(s) {
    return s.charCodeAt(0) >= 48 && s.charCodeAt(0) <= 57;
}

function rand_word(s) {
    s = lowerCase(s);
    let words = s.split(" ").map(x => x.split('').filter(isLetter).join('')).filter(x => x.length > 0);
    let e = getRandom(0, words.length);
    return words[e];
}

function getStrof(s, w) {
    let s1 = lowerCase(s);
    let ans = "";
    s1 = s1.replaceAll("  ", " ");
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

// Message

client.on("messageCreate", (msg) => {
    if (msg.content.startsWith("ping"))
        msg.channel.send("pong!");
    if (msg.content.startsWith("changeRole") && msg.author.id === people.sher.id) {
        let role = "";
        if (msg.guild.id === servers.myServer.id)
            role = servers.myServer.changeRole;
        let s = "";
        if (msg.content.indexOf(' ') !== -1)
            s = msg.content.substring(msg.content.indexOf(' ') + 1);
        let e = msg.guild.members.cache.forEach(member => {
            if (member.roles.cache.has(role)) {
                try {
                    member.setNickname(s)
                } catch {
                    msg.channel.send("Error");
                }
            }
        });
    }
    if (msg.content === "ch") {
        changeColor();
        msg.channel.send("ok:ok_hand: :wink: ");
    }
    if (msg.content.startsWith("say") && msg.author.id === people.sher.id) {
        say(msg);
    }
    if (msg.content.startsWith("hh")) {
        msg.react("➕");
        msg.react("➖");
    }
    if (msg.content.toLowerCase() === "vi") {
        let e = Math.round(Math.random() * v.length);
        let emb = new MessageEmbed()
            .setColor(16648050)
            .setImage(v[e]);
        msg.channel.send({embeds: [emb]});
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
        let text = msg.content.split(" ");
        if (text.length > 1) {
            let id = text[1].split('').filter(isDigit).join('');
            let us = client.users.cache.get(id);
            emb = new MessageEmbed()
                .setImage(us.avatarURL());
        } else {
            emb = new MessageEmbed()
                .setImage(msg.author.avatarURL());
        }
        msg.reply({embeds: [emb]});
    }

    if (msg.author.id !== people.kofuBot.id && msg.author.id !== people.kartusBot.id && msg.author.id !== people.teaBot.id
        && (msg.content.toLowerCase().indexOf("смерт") !== -1 || msg.content.toLowerCase().indexOf("суицид") !== -1)) {
        let citat = config.life;
        let rd = Math.round(Math.random() * citat.length);
        msg.channel.send(citat[rd]);
    }

    if ((msg.guild.id === servers.savaServer.id || msg.guild.id === servers.veresiServer.id || msg.author.id === people.sher.id || msg.content.startsWith('qt')) && msg.author.id !== people.kofuBot.id) {
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
        let embed = new MessageEmbed()
            .setTitle('Left to wait')
            .addField("‎", ":clock" + num.toString() + ": " + str);
        msg.reply({embeds: [embed]});
    }
});

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

client.login("NTE5MTg2ODg1MzMxOTEwNjc2.XAVYdw.qW8ZgBkSd3mJXEk5gjw9HntPfmM");
