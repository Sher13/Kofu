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
var v=['https://cdn.discordapp.com/attachments/471630590806851586/603333900982288394/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603333851032322066/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603333827401613442/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603333633251737698/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603333576154677248/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603333263401943060/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603333212118450176/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603333121433403392/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603333058074116130/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603331633059332175/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603331585302986752/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603331529309028432/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603331084209487897/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603331060578648076/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603330810573094984/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603330723876700160/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603330687558484006/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603330540875153549/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603330420599422986/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603330325178875914/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603330210288631816/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603330072203624451/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603330004327333909/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603329930725425152/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603329797598347284/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603329682846515201/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603329638109806628/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603329397616803848/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603329346651947008/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603329198177910794/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603329036978225193/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603328969151873024/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603328861178167301/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603327626320281620/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603327581516988418/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603327210341793812/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603327144264728583/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603327052409733131/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603327009875165222/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603326911434850391/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603326171018690587/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603325687809441813/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603325238100361226/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603325013474410496/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603324902744784906/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603324809224388608/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603324589115834368/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603324114928664576/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603323840562724929/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603323712770408452/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322778011172893/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322682536230986/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322615775625216/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322491590672404/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322453397209091/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322263449632768/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322209099972659/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322135707910284/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322051872161823/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603322008855642153/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603321425624825876/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603321322759782410/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603321273195561013/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603321101002473526/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603320898795208849/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603320721145593889/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603320557387382794/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603318694793183234/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603318661490540544/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603318605983121418/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603318441008431125/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603318402739601410/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603318201010356255/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603317277122756644/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603317150630805505/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603317064651767813/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603316938650812429/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603316556495323146/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603316464392470530/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603316398399422464/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603315614282416128/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603315122567643206/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603314884175986708/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603314844283699247/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603314755695935488/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603314693813305360/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603314584228462605/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603314473134063777/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603314219420614753/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603314157105971221/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603314097945051137/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603313943150329856/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603312865490763780/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603312687660793884/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603312653418627122/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603312395489640463/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603312024486936597/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603311928730976277/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603311583644614700/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603311234389114900/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603310654945886239/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603310561987526727/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603310375190134795/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603310288107733037/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603310181761417226/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603310120062943244/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603309220841914369/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603309147794178081/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603308950150184970/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603308838241959936/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603302661210636328/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603301489754112015/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603301445609062445/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603301392404185098/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603301361781702673/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603301295167897610/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603300494147846219/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603300047857123341/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603299791857778719/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603299733531918565/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603299569928896522/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603299539671187484/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603299328513146885/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603299233138737162/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603299110564397080/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603298961230659614/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603298745777389569/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603298440297840670/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603298317593739265/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603298111778979885/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603296198530564112/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603296143379660819/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603296085385150474/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603296028254273571/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603295982528102428/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603294669186793472/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603294587515306006/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603294537305030656/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603294489838092289/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603294287437889546/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603294128599728140/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603293689607094298/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603293516399116288/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603293408341262336/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603293280649609236/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603293212936765451/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603293076173357085/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603292373799403521/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603292354107146250/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603292181976973312/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603292119767187476/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603292022710992912/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603291963328036874/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603291902518886682/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603291813192925224/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603291714958000149/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603291633600954400/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603291407234498570/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603291286178365440/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603290478162739221/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603290423783325702/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603290397673783331/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603290257479303171/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603290138851672074/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603290090583621643/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603289019664826388/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603288371757842442/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603288311825694736/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603288236642795550/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603288130832826368/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603288086574792714/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603287964675735552/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603287375443132416/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603279625392750594/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603279354222346240/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603276524770033673/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603276327633551370/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603276307278594067/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603276212709752836/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603276089342558209/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603275604640661525/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603275253212381186/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603275211948687360/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603275169800257536/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603275131468382219/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603274948139548673/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603273550669021221/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603273369151864832/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603272640957775895/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603271614091624456/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603271198352080906/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603271090952863754/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603270907628355587/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603270720968982549/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603270603910283294/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603270436951949322/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603270236409430022/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603270000589144076/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603269850961412138/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603269566105124864/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603268503197319169/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603268252449112074/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603268196316872736/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603268001260765256/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603267474536005703/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603267333900861460/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603266931264323584/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603266691454992413/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603266508675612692/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603266309777784832/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603265870994735149/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603265469780328520/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603265097758015515/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603264248059265024/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603264179062964224/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603264106945970188/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603263920769073172/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603263190922559508/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603262281060581413/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603261609351184394/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603261473640153138/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603261340861202467/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603261027756408832/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603260687447359594/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603260613665357840/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603260490919182356/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603260336262479873/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603260065172029460/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603258434170912770/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603258177907064832/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603257940572635166/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603257643435425881/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603257156946624513/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603256740955422720/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603256572344532993/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603256428521717782/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603256380446474270/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603255716207263749/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603255421620453379/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603255294679711949/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603255122851528714/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603254588056928276/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603254484067549210/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603254451016564736/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603253666337783839/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603253593184665600/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603253517532266496/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603252954459406336/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603252734489002003/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603252514510340127/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603252279327326219/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603251692414304266/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603251600571760660/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603251518493294613/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603251194248429582/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603250344247689216/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603250057818406912/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603249099944493116/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603248847996715009/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603248625316921344/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603241655310614568/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603241274916470814/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603241211221901509/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603240614196412446/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603240327683506177/unknown.png', 'https://cdn.discordapp.com/attachments/471630590806851586/603239296702611477/unknown.png'];
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
if (msg.content==="ch") {
    changeColor();
	msg.channel.send("ok:ok_hand: :wink: ");
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
const servers = ["381829822982389771","471630590806851584"];

client.on('ready', () => {
    setInterval(changeColor, config.speed);});

client.login(process.env.TOKEN);