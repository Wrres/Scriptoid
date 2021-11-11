const READLINE = require("readline");
const RL = READLINE.createInterface({
	input: process.stdin,
	output: process.stdout
});

const Discord = require("discord.js");
//const keepAlive = require("./server");
const Round = require("./utils/Round");
const RoundCity = require("./utils/RoundCity");
const RoundGuess = require("./utils/RoundGuess");
const RoundImage = require("./utils/RoundImage");
const HELPERS = require("./utils/Helpers");

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
const INDONESIAN = require("./sets/indonesian.js");
const PREFECTURES = require("./sets/prefectures.js");
const JPCITIES = require("./sets/jpcities.js");
const JPCITIESHARD = require("./sets/jpcitieshard.js");
const KABUPATENS = require("./sets/kabupatens.js");
const CNPROVINCES = require("./sets/cnprovinces.js");
const CNCITIES = require("./sets/cncities.js");
const THPROVINCES = require("./sets/thprovinces.js");
const THPVABBR = require("./sets/thpvabbr.js");
const BRSTATECODES = require("./sets/brstatecodes.js");
const BRCITYCODES = require("./sets/brcitycodes.js");
const JPAREACODES = require("./sets/jpareacodes.js");
const JPCODESMAP = require("./sets/jpcodesmap.js");
const RUCITIES = require("./sets/rucities.js");
const RUTOWNS = require("./sets/rutowns.js");
const KRCITIES = require("./sets/krcities.js");
const GRPLACES = require("./sets/grplaces.js");
const USCAPITALS = require("./sets/uscapitals.js");
const CITYGUESS = require("./sets/cityguess.js");

// Ignore messages starting with (from scores)
const IGNORES = ["@", "!", "<"];
// Holding to channels where the bot is running and it's data for each
let CHANNELS = [];

const client = new Discord.Client();

client.on("ready", () => {
	console.log(`${formatDate(new Date())} · Logged in as ${client.user.tag}!`);
	client.user.setActivity('he!p for help', { type: 'PLAYING' });
});

client.on("error", (error) => {
	console.log(`Error: ${error}`);
	client.destroy();
	client.login(process.env.TOKEN);
});

client.on("invalidated", (invalidated) => {
	console.log(`Invalidated: ${invalidated}`);
	client.destroy();
	client.login(process.env.TOKEN);
});

client.on("message", (msg) => {
	if (msg.author.bot) return

	// HELP
	else if (msg.content.toLowerCase() === "he!p") {
		HELPERS.sendHelpMessage(msg);
	}

	// CITYCOUNTRY HELP
	else if (msg.content.toLowerCase() === "!cchelp") {
		HELPERS.sendCityMessage(msg);
	}

	// CITYGUESS HELP
	else if (msg.content.toLowerCase() === "!cghelp") {
		HELPERS.sendGuessMessage(msg);
	}

	// MAP
	else if (msg.content.toLowerCase() === "!map") {
		HELPERS.sendMapMessage(msg);
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
		// THPROVINCES
		else if (msg.content.toLowerCase().startsWith("!thprovinces")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, THPROVINCES) });
		}
		// THPVABBR
		else if (msg.content.toLowerCase().startsWith("!thpvabbr")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, THPVABBR) });
		}
		// BRSTATECODES
		else if (msg.content.toLowerCase().startsWith("!brstatecodes")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new Round(msg, BRSTATECODES) });
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
		// CITYCOUNTRY
		else if (msg.content.toLowerCase().startsWith("!citycountry")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new RoundCity(msg, CITYGUESS) });
		}
		// CITYGUESS
		else if (msg.content.toLowerCase().startsWith("!cityguess")) {
			CHANNELS.push({ "id": msg.channel.id, "round": new RoundGuess(msg, CITYGUESS) });
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
				round.end(msg);
			}
		}

		// TODO: Anything else that isn't a predefined command should get filtered here and act accordingly
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
 * PROBABLY EVERYTHING BELOW THIS LINE COULD BE MOVED TO ROUND OR HELPERS
 */


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

/*
keepAlive().then(() => {
	console.log(`${formatDate(new Date())} · Login attempt`);
	client.login(process.env.TOKEN);
});
*/
client.login(process.env.TOKEN);

/**
 * Listen for commands on console
 */
function consoleListener() {
	RL.question("§ > ", (command) => {
		switch (command) {
			case "help":
				console.log("Available commands: help, version");
				break;
			case "version":
				console.log("Version 0.0.1");
				break;
			case "channels":
				console.log(CHANNELS);
				break;
			default:
				console.log("Command not found");
				break;
		}
		consoleListener();
	});
}

function formatDate(dt) {
	return `${
		(dt.getMonth() + 1).toString().padStart(2, '0')}/${
		dt.getDate().toString().padStart(2, '0')}/${
		dt.getFullYear().toString().padStart(4, '0')} ${
		dt.getHours().toString().padStart(2, '0')}:${
		dt.getMinutes().toString().padStart(2, '0')}:${
		dt.getSeconds().toString().padStart(2, '0')}`;
}

setTimeout(consoleListener, 5000);
