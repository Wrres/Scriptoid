const EventEmitter = require("events");
const { MessageEmbed } = require("discord.js");

const HELPERS = {
	SECONDS_AFTER_ANSWER: 3,
	SECONDS_BEFORE_REVEAL: 30,
	SECONDS_BEFORE_REVEAL_CITY: 45,
	SECONDS_BEFORE_REVEAL_GUESS: 60,
	MAX_ROUNDS: 20,
	MAX_ROUNDS_CITY: 30,
	EMITTER: new EventEmitter(),
	VERSION: "0.0.1-Z",
	sendVersionMessage: (msg) => {
		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Version")
			.setDescription(`V. ${HELPERS.VERSION}`);
		msg.reply(messageEmbed);
	},
	sendHelpMessage: (msg) => {
		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Help")
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
      		\`!chinese1-5 #\` - grouped by HSK levels
			\`!inuktitut #\`
			\`!indonesian #\` - 2k most common Indonesian words
			\`!prefectures #\` - Japanese prefecture names
			\`!jpcities #\` - Japanese cities 250k+ pop. \`!jpcitieshard\`
			\`!kabupatens #\` - Indonesian regencies (get the province)
			\`!cnprovinces #\` - Chinese provinces
      		\`!cncities #\` - all Chinese cities
			\`!thprovinces #\` - Thai provinces \`!thpvabbr\`
			\`!rucities #\` - Russian cities 50k+ pop. \`!rutowns\`
      		\`!krcities #\` - South and North Korean cities
      		\`!grplaces #\` - Greek place names (not only Greece)
			\`!uscapitals #\` - US state capitals
			\`!brstatecodes #\` - Brazil state area codes \`!brcitycodes\`
			\`!jpareacodes #\` - Japanese area codes \`!jpcodesmap\`
      		\`!cityguess #\` - \`!cghelp\` for info and details \`!map\`
      		\`!citycountry #\` - \`!cchelp\` for info and details
			\`!answer\` - reveals the answer
			\`!end\` - ends the current game
			If a letter isn\'t transliterated, put \`-\`.
			The bot won't react to messages that start with \`!\` or \`@\`.`);
		msg.reply(messageEmbed);
	},
	sendCityMessage: (msg) => {
		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("CityCountry Help")
			.setDescription(`
			Write the country the given city is in.
			You will have ${HELPERS.SECONDS_BEFORE_REVEAL_CITY} seconds to provide the correct answer.
      		The correct answer gives 5 points, incorrect -1.
      		The maximum number of rounds is ${HELPERS.MAX_ROUNDS_CITY}.
      		All cities 10k+ population in the world (28k cities).`);
		msg.reply(messageEmbed);
	},
	sendGuessMessage: (msg) => {
		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle("CityGuess Help")
			.setDescription(`
			Guess where the given city is by using the \`!map\`.
			You will have 1 minute to guess.
			The score is the distance between your guess and the city.
			The maximum number of rounds is ${HELPERS.MAX_ROUNDS}.
			All cities 10k+ population in the world (28k cities).
			*!answer doesn't work in this command.`);
		msg.reply(messageEmbed);
	},
	sendMapMessage: (msg) => {
		msg.channel.send("Guessing map: <https://bit.ly/3qn906b> (click on the map and paste here)");
	},
	getDistanceFromLatLonInKm: (lat1, lon1, lat2, lon2) => {
		let R = 6371; // Radius of the earth in km
		let dLat = HELPERS.deg2rad(lat2 - lat1);  // deg2rad below
		let dLon = HELPERS.deg2rad(lon2 - lon1);
		let a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(HELPERS.deg2rad(lat1)) * Math.cos(HELPERS.deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2);
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		let d = R * c; // Distance in km
		return parseFloat(d.toFixed(2));
	},
	deg2rad: (deg) => {
		return deg * (Math.PI / 180);
	},
	generateRandoms: (amount, total) => {
		if(amount > total){
			console.log("Amount can't be higher than total possible options");
			return null;
		}
		let outcome = [];

		while(outcome.length < amount){
			let rand = Math.floor(Math.random() * total);
			if(!outcome.includes(rand)){
				outcome.push(rand);
			}
		}
		return outcome;
	},
	getNumberOfRounds: (msg) => {
		let msgdata = msg.content.split(" ");
		let rounds = parseInt(msgdata[1]);
		if(!isNaN(rounds)){			
			if(rounds < 0){
				rounds = 1;
			}
			if(rounds > HELPERS.MAX_ROUNDS){
				rounds = HELPERS.MAX_ROUNDS;
			}
			return rounds;
		}
		return 1;
	}

}

module.exports = HELPERS;
