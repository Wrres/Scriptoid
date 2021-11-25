const EventEmitter = require("events");
const { MessageEmbed } = require("discord.js");
const FETCH = require("node-fetch");
const CHEERIO = require("cheerio");

const HELPERS = {
	SECONDS_AFTER_ANSWER: 3,
	SECONDS_BEFORE_REVEAL: 30,
	SECONDS_BEFORE_REVEAL_CITY: 45,
	SECONDS_BEFORE_REVEAL_GUESS: 60,
	MAX_ROUNDS: 20,
	MAX_ROUNDS_CITY: 30,
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
			\`!inuktitut #\` \`!inukwords #\` - 1500+ Inuktitut words
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
			\`!brareacodes #\` - Brazil state area codes \`!brcitycodes\`
			\`!jpareacodes #\` - Japanese area codes \`!jpcodesmap\`
			\`!cnareacodes #\` - Chinese provincial area codes
			\`!cnplates #\` - Chinese provincial license plates
			\`!cityguess #\` - \`!cghelp\` for info and details \`!map\`
			\`!citycountry #\` - \`!cchelp\` for info and details
			\`!answer\` - reveals the answer
			\`!end\` - ends the current game
			If a letter isn\'t transliterated, put \`-\`.
			The bot won't react to messages that start with \`!\` or \`@\`.`);
		msg.channel.send({ "embeds": [messageEmbed] });
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
		msg.channel.send({ "embeds": [messageEmbed] });
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
			All cities 10k+ population in the world (28k cities).`);
		msg.channel.send({ "embeds": [messageEmbed] });
	},
	sendMapMessage: (msg) => {
		msg.channel.send("Guessing map: <https://bit.ly/GuessingMap> (click on the map and paste here)");
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
	getElevation: (lat, lng) => {
		return new Promise((resolve, reject) => {
			FETCH(`https://api.opentopodata.org/v1/aster30m?locations=${lat},${lng}`)
				.then((response) => response.json())
				.then((data) => {
					if (data.status === "OK") {
						let meters = HELPERS.numberWithCommas(data.results[0].elevation);
						let feet = HELPERS.numberWithCommas(Math.floor(parseInt(data.results[0].elevation) *  3.281));
						resolve({ "meters": meters, "feet": feet });
					}
					else {
						resolve(null);
					}
				})
				.catch((error) => {
					resolve(null);
				});
		});
	},
	numberWithCommas: (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	cleanCityName: (set) => {
		let city = set.city
			.replaceAll("ā", "a")
			.replaceAll("Ā", "A")
			.replaceAll("ē", "e")
			.replaceAll("Ē", "E")
			.replaceAll("ū", "u")
			.replaceAll("Ū", "U")
			.replaceAll("ī", "i")
			.replaceAll("Ī", "I")
			.replaceAll("ḩ", "h")
			.replaceAll("Ḩ", "H")
			.replaceAll("â", "a")
			.replaceAll("Â", "A")
			.replaceAll("û", "u")
			.replaceAll("Û", "U")
			.replaceAll("ï", "i")
			.replaceAll("Ï", "I")
			.replaceAll("î", "i")
			.replaceAll("Î", "I")
			.replaceAll("‘", "")
			.replaceAll("ţ", "t")
			.replaceAll("Ţ", "T")
			.replaceAll("ŭ", "u")
			.replaceAll("Ŭ", "U")
			.replaceAll("ə", "a")
			.replaceAll("Ə", "A")
			.replaceAll("ǝ", "a")
			.replaceAll("Ǝ", "A")
			.replaceAll("ʼ", "'")
			.replaceAll("`", "")
			.replaceAll("‘", "")
			.replaceAll("’", "")
			.replaceAll("ḑ", "d")
			.replaceAll("Ḑ", "D")
			.replaceAll("–", "-")
			.replaceAll("-ŭp", "");
		if (set.country[0] == "RU" || set.country[0] == "UA" || set.country[0] == "BY") {
			city = city.replaceAll("’", "");
		}
		if (set.country[0] == "KP") {
			city = city.replaceAll("-ŭp", "");
		}
		return city;
	},
	getImageFromPage: (url) => {
		return new Promise((resolve, reject) => {
			FETCH(url)
			.then((response) => {
				if(response.status === 200){
					return response.text();
				}
				else{
					return null;
				}
			})
			.then((body) => {
				if(body){
					const $ = CHEERIO.load(body);
					$("a[class=image]")
						.each((index, element) => {
							let imageLink = $(element).attr("href");
							if(imageLink.toLowerCase().endsWith(".jpg")){
								if(imageLink.includes("/wiki/File:")){
									resolve(imageLink.replace("/wiki/File:", "https://commons.wikimedia.org/wiki/Special:FilePath/"));
								}
							}
						});
					resolve(null);
				}
				else{
					console.log("Page does not respond with 200");
					resolve(null);
				}
			})
			.catch((error) => {
				console.log("Error", error);
				resolve(null);
			});
		});
	},
	getPage: (page) => {
		FETCH(page)
			.then((response) => {
				if (response.status === 200) {
					return response.text();
				}
				else {
					return null;
				}
			})
			.catch((error) => {
				console.log(error);
			});
	},
	isImageValid: (image) => {
		if (image) {
			if (image.toLowerCase().endsWith(".jpg") ||
				image.toLowerCase().endsWith(".gif") ||
				image.toLowerCase().includes("collage") ||
				image.toLowerCase().includes("montage")|| 
				image.toLowerCase().includes("collection")
			) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}
	},
	formatDate: (date) => {
		return `${
			(date.getMonth() + 1).toString().padStart(2, "0")}/${
			date.getDate().toString().padStart(2, "0")}/${
			date.getFullYear().toString().padStart(4, "0")} ${
			date.getHours().toString().padStart(2, "0")}:${
			date.getMinutes().toString().padStart(2, "0")}:${
			date.getSeconds().toString().padStart(2, "0")}`;
	}
}

module.exports = HELPERS;
