const EventEmitter = require("events");
const { MessageEmbed } = require("discord.js");

const HELPERS = {
	SECONDS_AFTER_ANSWER: 3,
	SECONDS_BEFORE_REVEAL: 30,
	MAX_ROUNDS: 20,
	EMITTER: new EventEmitter(),
	VERSION: "0.0.1-Z",
	BASE_URL: "https://en.wikipedia.org/wiki/",
	sendVersionMessage: (msg) => {
		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Version")
			.setDescription(`V. ${HELPERS.VERSION}`);
		msg.channel.send({ "embeds": [messageEmbed] });
	},
	sendHelpMessage: (msg) => {
		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Scяiptoid Help")
			.setDescription(`
			Write the transliteration of the given letter in Latin.
			You will have ${HELPERS.SECONDS_BEFORE_REVEAL} seconds to provide the correct answer.
			The correct answer gives 3 points, incorrect -1.
			\`!cyrillic #\` - # is the number of rounds (1-${HELPERS.MAX_ROUNDS})
			\`!cyrbalkan #\` - Balkan Cyrillic
			\`!greek #\`
			\`!georgian #\` - \' after ejectives
			\`!korean #\`
			\`!thai #\` - h after aspirated \`!thvowels #\`
			\`!hindi #\`
			\`!gujarati #\`
			\`!bengali #\` \`!bdnumerals #\`
			\`!japanese #\` - Hiragana/Katakana
			\`!chinese1-6 #\` - grouped by HSK levels
			\`!inuktitut #\` \`!inukwords #\` - 1500+ Inuktitut words
			\`!indonesian #\` - 2k most common Indonesian words
			\`!letterguess #\` - guess a language of the Latin letter
			\`!letterguesscyr #\` - Cyrillic letter guess
			\`!prefectures #\` - Japanese prefecture names
			\`!jpcities #\` - Japanese cities 250k+ pop. \`!jpcitieshard\`
      		\`!jptowns #\` - Japanese towns and villages
			\`!kabupatens #\` - Indonesian regencies (get the province)
			\`!cnprovinces #\` - Chinese provinces
			\`!cncities #\` - all Chinese cities
			\`!thprovinces #\` - Thai provinces \`!thpvabbr\`
			\`!rucities #\` - Russian cities 50k+ pop. \`!rutowns\`
			\`!krcities #\` - South and North Korean cities \`!krtowns\`
			\`!grplaces #\` - Greek place names (not only Greece)
			Non-language commands (GeoGuessr/geo practice):
			\`!uscapitals #\` - US state capitals \`!usflags\`
			\`!bollards #\` - guess the country the bollard is from
			\`!cameras #\` - guess the camera gens in the country
			\`!usshields #\` - US state highway shields \`!ussecondary\`
			\`!cashields #\` - Canadian province highway shields
			\`!brareacodes #\` - Brazil state area codes \`!brcitycodes\`
			\`!jpareacodes #\` - Japanese area codes \`!jpcodesmap\`
			\`!cnareacodes #\` - Chinese provincial area codes
			\`!cnplates #\` - Chinese provincial license plates
			\`!answer\` - reveals the answer
			\`!end\` - ends the current game
			If a letter isn\'t transliterated, put \`-\`.
			The bot won't react to messages that start with \`!\` or \`@\`.`);
		msg.channel.send({ "embeds": [messageEmbed] });
	},
	generateRandoms: (amount, total) => {
		if (amount > total) {
			console.log("Amount can't be higher than total possible options");
			return null;
		}
		let outcome = [];

		while (outcome.length < amount) {
			let rand = Math.floor(Math.random() * total);
			if (!outcome.includes(rand)) {
				outcome.push(rand);
			}
		}
		return outcome;
	},
	getNumberOfRounds: (msg) => {
		let msgdata = msg.content.split(" ");
		let rounds = parseInt(msgdata[1]);
		if (!isNaN(rounds)) {
			if (rounds < 0) {
				rounds = 1;
			}
			if (rounds > HELPERS.MAX_ROUNDS) {
				rounds = HELPERS.MAX_ROUNDS;
			}
			return rounds;
		}
		return 1;
	},
	formatDate: (date) => {
		return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear().toString().padStart(4, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
	}
}

module.exports = HELPERS;

