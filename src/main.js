require("dotenv").config();
const { Client, Intents, Permissions } = require("discord.js");
const runServer = require("./Server")

const Round = require("./utils/Round");
const RoundImage = require("./utils/RoundImage");
const HELPERS = require("./utils/Helpers");

//const RESTART = require("./utils/Restart");

const CYRILLIC = require("./sets/cyrillic.js");
const CYRBALKAN = require("./sets/cyrbalkan.js");
const GREEK = require("./sets/greek.js");
const GEORGIAN = require("./sets/georgian.js");
const KOREAN = require("./sets/korean.js");
const THAI = require("./sets/thai.js");
const THVOWELS = require("./sets/thvowels.js");
const HINDI = require("./sets/hindi.js");
const GUJARATI = require("./sets/gujarati.js");
const BENGALI = require("./sets/bengali.js");
const BDNUMERALS = require("./sets/bdnumerals.js");
const JAPANESE = require("./sets/japanese.js");
const CHINESE1 = require("./sets/chinese1.js");
const CHINESE2 = require("./sets/chinese2.js");
const CHINESE3 = require("./sets/chinese3.js");
const CHINESE4 = require("./sets/chinese4.js");
const CHINESE5 = require("./sets/chinese5.js");
const INUKTITUT = require("./sets/inuktitut.js");
const INUKWORDS = require("./sets/inukwords.js");
const INDONESIAN = require("./sets/indonesian.js");
const PREFECTURES = require("./sets/prefectures.js");
const JPCITIES = require("./sets/jpcities.js");
const JPCITIESHARD = require("./sets/jpcitieshard.js");
const JPTOWNS = require("./sets/jptowns.js");
const KABUPATENS = require("./sets/kabupatens.js");
const CNPROVINCES = require("./sets/cnprovinces.js");
const CNCITIES = require("./sets/cncities.js");
const CNPLATES = require("./sets/cnplates.js");
const CNAREACODES = require("./sets/cnareacodes.js");
const THPROVINCES = require("./sets/thprovinces.js");
const THPVABBR = require("./sets/thpvabbr.js");
const BRAREACODES = require("./sets/brareacodes.js");
const BRCITYCODES = require("./sets/brcitycodes.js");
const JPAREACODES = require("./sets/jpareacodes.js");
const JPCODESMAP = require("./sets/jpcodesmap.js");
const RUCITIES = require("./sets/rucities.js");
const RUTOWNS = require("./sets/rutowns.js");
const KRCITIES = require("./sets/krcities.js");
const GRPLACES = require("./sets/grplaces.js");
const USCAPITALS = require("./sets/uscapitals.js");
const USFLAGS = require("./sets/usflags.js");
const BOLLARDS = require("./sets/bollards.js");
const CAMERAS = require("./sets/cameras.js");
const USSHIELDS = require("./sets/usshields.js");
const USSECONDARY = require("./sets/ussecondary.js");
const CASHIELDS = require("./sets/cashields.js");

// Ignore messages starting with (from scores)
const IGNORES = ["@", "!", "<"];
// Holding to channels where the bot is running and it's data for each
let CHANNELS = [];

let BEAT = 0;

// BEAT every 10 seconds
// setInterval(() => {
// 	BEAT++;
// 	checkBeat();
// }, 10000);

const CLIENT = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

CLIENT.on("ready", () => {
	console.log(`Logged in as ${CLIENT.user.tag}!`);
	CLIENT.user.setActivity("he!p for help", { type: "PLAYING" });
});

CLIENT.on("debug", (debug) => {
	if(debug.includes("Heartbeat acknowledged")){
		BEAT = 0;
	}
	if(debug.includes("Hit a 429 while executing a request")){
		// setTimeout(() => {
		// 	RESTART.init();			
		// }, 5000);
	}
});

CLIENT.on("rateLimit", (limit) => {
	// setTimeout(() => {
	// 	RESTART.init();			
	// }, 5000);
});

CLIENT.on("error", (error) => {
	CLIENT.destroy();
	CLIENT.login(process.env.TOKEN);
});

CLIENT.on("invalidated", (invalidated) => {
	CLIENT.destroy();
	CLIENT.login(process.env.TOKEN);
});

CLIENT.on("messageCreate", async (msg) => {
	if (msg.author.bot) {
		return;
	}

	// CHECK PERMISSIONS (If we don't have them > return)
	if(!msg.channel.permissionsFor(msg.guild.me).has([Permissions.FLAGS.SEND_MESSAGES, Permissions.FLAGS.ADD_REACTIONS])) {
		return;
	}
		
	// HELP
	else if (msg.content.toLowerCase() === "he!p") {
		HELPERS.sendHelpMessage(msg);
	}

	// VERSION
	else if (msg.content.toLowerCase() === "!version") {
		HELPERS.sendVersionMessage(msg);
	}

	// CHECK IF THERE IS NOT AN ACTIVE ROUND ON THE CHANNEL
	else if (!channelContainsActiveGame(msg.channel.id)) {
		// CYRILLIC
		if (msg.content.toLowerCase().startsWith("!cyrillic")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CYRILLIC) });
		}
		// CYRBALKAN
		else if (msg.content.toLowerCase().startsWith("!cyrbalkan")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CYRBALKAN) });
		}
		// GREEK
		else if (msg.content.toLowerCase().startsWith("!greek")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, GREEK) });
		}
		// GEORGIAN
		else if (msg.content.toLowerCase().startsWith("!georgian")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, GEORGIAN) });
		}
		// KOREAN
		else if (msg.content.toLowerCase().startsWith("!korean")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, KOREAN) });
		}
		// THAI
		else if (msg.content.toLowerCase().startsWith("!thai")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, THAI) });
		}
		// THVOWELS
		else if (msg.content.toLowerCase().startsWith("!thvowels")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, THVOWELS) });
		}
		// HINDI
		else if (msg.content.toLowerCase().startsWith("!hindi")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, HINDI) });
		}
		// GUJARATI
		else if (msg.content.toLowerCase().startsWith("!gujarati")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, GUJARATI) });
		}
		// BENGALI
		else if (msg.content.toLowerCase().startsWith("!bengali")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, BENGALI) });
		}
		// BDNUMERALS
		else if (msg.content.toLowerCase().startsWith("!bdnumerals")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, BDNUMERALS) });
		}
		// JAPANESE
		else if (msg.content.toLowerCase().startsWith("!japanese")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, JAPANESE) });
		}
		// CHINESE1
		else if (msg.content.toLowerCase().startsWith("!chinese1")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CHINESE1) });
		}
		// CHINESE2
		else if (msg.content.toLowerCase().startsWith("!chinese2")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CHINESE2) });
		}
		// CHINESE3
		else if (msg.content.toLowerCase().startsWith("!chinese3")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CHINESE3) });
		}
		// CHINESE4
		else if (msg.content.toLowerCase().startsWith("!chinese4")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CHINESE4) });
		}
		// CHINESE5
		else if (msg.content.toLowerCase().startsWith("!chinese5")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CHINESE5) });
		}
		// INUKTITUT
		else if (msg.content.toLowerCase().startsWith("!inuktitut")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, INUKTITUT) });
		}
		// INUKWORDS
		else if (msg.content.toLowerCase().startsWith("!inukwords")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, INUKWORDS) });
		}
		// INDONESIAN
		else if (msg.content.toLowerCase().startsWith("!indonesian")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, INDONESIAN) });
		}
		// PREFECTURES
		else if (msg.content.toLowerCase().startsWith("!prefectures")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, PREFECTURES) });
		}
		// JPCITIESHARD
		else if (msg.content.toLowerCase().startsWith("!jpcitieshard")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, JPCITIESHARD) });
		}
		// JPCITIES
		else if (msg.content.toLowerCase().startsWith("!jpcities")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, JPCITIES) });
		}
    	// JPTOWNS
		else if (msg.content.toLowerCase().startsWith("!jptowns")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, JPTOWNS) });
		}
		// KABUPATENS
		else if (msg.content.toLowerCase().startsWith("!kabupatens")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, KABUPATENS) });
		}
		// CNPROVINCES
		else if (msg.content.toLowerCase().startsWith("!cnprovinces")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CNPROVINCES) });
		}
		// CNCITIES
		else if (msg.content.toLowerCase().startsWith("!cncities")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CNCITIES) });
		}
		// CNPLATES
		else if (msg.content.toLowerCase().startsWith("!cnplates")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new RoundImage(msg, CNPLATES) });
		}
		// CNAREACODES
		else if (msg.content.toLowerCase().startsWith("!cnareacodes")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CNAREACODES) });
		}
		// THPROVINCES
		else if (msg.content.toLowerCase().startsWith("!thprovinces")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, THPROVINCES) });
		}
		// THPVABBR
		else if (msg.content.toLowerCase().startsWith("!thpvabbr")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, THPVABBR) });
		}
		// BRAREACODES
		else if (msg.content.toLowerCase().startsWith("!brareacodes")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, BRAREACODES) });
		}
		// BRCITYCODES
		else if (msg.content.toLowerCase().startsWith("!brcitycodes")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, BRCITYCODES) });
		}
		// JPAREACODES
		else if (msg.content.toLowerCase().startsWith("!jpareacodes")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, JPAREACODES) });
		}
		// JPCODESMAP
		else if (msg.content.toLowerCase().startsWith("!jpcodesmap")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new RoundImage(msg, JPCODESMAP) });
		}
		// RUCITIES
		else if (msg.content.toLowerCase().startsWith("!rucities")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, RUCITIES) });
		}
		// RUTOWNS
		else if (msg.content.toLowerCase().startsWith("!rutowns")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, RUTOWNS) });
		}
		// KRCITIES
		else if (msg.content.toLowerCase().startsWith("!krcities")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, KRCITIES) });
		}
		// GRPLACES
		else if (msg.content.toLowerCase().startsWith("!grplaces")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, GRPLACES) });
		}
		// USCAPITALS
		else if (msg.content.toLowerCase().startsWith("!uscapitals")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, USCAPITALS) });
		}
		// USFLAGS
		else if (msg.content.toLowerCase().startsWith("!usflags")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new RoundImage(msg, USFLAGS) });
		}
		// BOLLARDS
		else if (msg.content.toLowerCase().startsWith("!bollards")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new RoundImage(msg, BOLLARDS) });
		}
		// CAMERAS
		else if (msg.content.toLowerCase().startsWith("!cameras")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, CAMERAS) });
		}
		// USSHIELDS
		else if (msg.content.toLowerCase().startsWith("!usshields")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new RoundImage(msg, USSHIELDS) });
		}
		// USSECONDARY
		else if (msg.content.toLowerCase().startsWith("!ussecondary")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new RoundImage(msg, USSECONDARY) });
		}
		// CASHIELDS
		else if (msg.content.toLowerCase().startsWith("!cashields")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new RoundImage(msg, CASHIELDS) });
		}
	}

	// CHECK IF THERE IS AN ACTIVE ROUND ON THE CHANNEL
	else if (channelContainsActiveGame(msg.channel.id)) {

		// ANSWER
		if (msg.content.toLowerCase() === "!answer") {
			// First we need to check if there is a round active in this channel
			if (channelContainsActiveGame(msg.channel.id)) {
				// There is one, we need to get it's object and call answer
				let round = getRoundForChannelId(msg.channel.id);
				round.answer(msg);
			}
		}

		// END
		else if (msg.content.toLowerCase() === "!end") {
			// First we need to check if there is a round active in this channel
			if (channelContainsActiveGame(msg.channel.id)) {
				// There is one, we need to get it's object and call end
				let round = getRoundForChannelId(msg.channel.id);
				round.end();
			}
		}

		else if (!IGNORES.includes(msg.content.charAt(0))) {
			// First we need to check if there is a round active in this channel
			if (channelContainsActiveGame(msg.channel.id)) {
				// There is one, we need to get it's object and call end
				let round = getRoundForChannelId(msg.channel.id);
				// Call check for the given message
				round.check(msg);
			}
		}
	}
});

/**
 * This listens for this event and deletes the given channel from CHANNELS
 */
HELPERS.EMITTER.on("delete-channel", (id) => {
	removeChannelFromChannels(id);
});

/**
 * Determines if a round exists for a given channel id
 */
function channelContainsActiveGame(id) {
	let channel = CHANNELS.find((channel) => channel.id == id);
	if (channel && channel.round.active) {
		return true;
	}
	if (channel && !channel.round.active) {
		removeChannelFromChannels(id);
		return false;
	}
	return false;
}

/**
 * Get round for a given channel id
 */
function getRoundForChannelId(id) {
	let channel = CHANNELS.find((channel) => channel.id == id);
	return channel.round;
}

/**
 * Remove channel from channels
 */
function removeChannelFromChannels(id) {
	CHANNELS = CHANNELS.filter((channel) => { return channel.id != id; });
}

/**
 * Beat checker
 */
// function checkBeat() {
// 	if(BEAT > 12){
// 		setTimeout(() => {
// 			RESTART.init();			
// 		}, 5000);
// 	}
// }

runServer().then(() => {
	CLIENT.login(process.env.TOKEN);
});

