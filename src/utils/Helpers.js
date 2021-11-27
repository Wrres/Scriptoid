const EventEmitter = require("events");
const { MessageEmbed } = require("discord.js");
const FETCH = require("node-fetch");
const CHEERIO = require("cheerio");

const HELPERS = {
	SECONDS_AFTER_ANSWER: 3,
	SECONDS_BEFORE_REVEAL: 30,
	SECONDS_BEFORE_REVEAL_CITY: 45,
	SECONDS_BEFORE_REVEAL_GUESS: 75,
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
			\`!cityguess #\` - \`!cghelp\` for info and details \`!map\` \`!pic\`
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
			You will have 1 min 15 sec to guess.
			The score is the distance between your guess and the city.
			The maximum number of rounds is ${HELPERS.MAX_ROUNDS}.
			All cities 10k+ population in the world (28k cities).
			*Others can't see your guess message, even if you can.
			\`!pic\` - shows you another nearby image (if available)
			*Only works if the original post had an image.`);
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
						let feet = HELPERS.numberWithCommas(Math.floor(parseInt(data.results[0].elevation) * 3.281));
						resolve(` · Alt: ${meters} m · ${feet} ft`);;
					}
					else {
						resolve("");
					}
				})
				.catch((error) => {
					resolve("");
				});
		});
	},
	numberWithCommas: (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	cleanCityName: (city) => {
		return city
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
	},
	imageMeetsRequirements: (imageURL) => {
		return ((imageURL.toLowerCase().endsWith(".jpg")
			|| imageURL.toLowerCase().endsWith(".gif")
			|| imageURL.toLowerCase().includes("collage")
			|| imageURL.toLowerCase().includes("montage")
			|| imageURL.toLowerCase().includes("montaje")
			|| imageURL.toLowerCase().includes("collection")
		) && (
			!imageURL.toLowerCase().includes("_map_")
			&& !imageURL.toLowerCase().includes("_map.")
			&& !imageURL.toLowerCase().includes("map_")
			&& !imageURL.toLowerCase().includes("flag_")
			&& !imageURL.toLowerCase().includes("_flag_")
			&& !imageURL.toLowerCase().includes("_flag.")
			&& !imageURL.toLowerCase().includes("coat_of_arm")
			&& !imageURL.toLowerCase().includes("bandera")
			&& !imageURL.toLowerCase().includes("bandeira")
		));
	},
	getImageFromPage: (name) => {
		return new Promise((resolve, reject) => {
			let url = `https://en.wikipedia.org/wiki/${encodeURI(name)}`;
			// console.log(`${HELPERS.formatDate(new Date())} · Searching in ${url}`);
			FETCH(url)
				.then((response) => {
					if (response.status === 200) {
						return response.text();
					}
					else {
						// console.log(`Page respond with ${response.status}`);
						return null;
					}
				})
				.then((body) => {
					if (body) {
						const $ = CHEERIO.load(body);
						let metaImage = $("meta[property='og:image']").attr("content") || "";
						// Check meta image requirements
						if (HELPERS.imageMeetsRequirements(metaImage)) {
							resolve({
								"image": metaImage,
								"distance": "",
								"wikilink": url
							});
						}
						// Meta Image didn't meet the requirements
						else {
							let resolved = false;
							// Looking for images in page
							$("a[class=image]")
								.each((index, element) => {
									let imageLink = $(element).attr("href");
									if (imageLink.includes("/wiki/File:") && HELPERS.imageMeetsRequirements(imageLink) && !resolved) {
										resolved = true;
										imageLink = imageLink.replace("/wiki/File:", "https://commons.wikimedia.org/wiki/Special:FilePath/");
										resolve({
											"image": imageLink,
											"distance": "",
											"wikilink": url
										});
									}
								});
							// If no image found in the article
							if (!resolved) {
								// console.log("Page exists but no image in meta or within the page");
								resolve(null);
							}
						}
					}
					// No body
					else {
						resolve(null);
					}
				})
				.catch((error) => {
					console.log("Error", error);
					resolve(null);
				});
		});
	},
	getMapImage: (lat, lon, meters) => {
		let bBox = HELPERS.getBBox({ "lat": lat, "lon": lon }, meters);
		let distance = "";
		switch (meters) {
			case 5000:
				distance = " · 0-5 km away";
				break;
			case 20000:
				distance = " · 3.5-20 km away";
				break;
			case 50000:
				distance = " · 14-50 km away";
				break;
			case 100000:
				distance = " · 35-100 km away";
				break;
			case 200000:
				distance = " · 70-200 km away";
				break;
			case 300000:
				distance = " · 140-300 km away";
				break;
			default:
				distance = ""
				break;
		}

		let mapImgURL = `https://graph.mapillary.com/images?access_token=${process.env.MAP_TOKEN}&bbox=${bBox}&fields=thumb_1024_url&limit=1`;
		// console.log(`${HELPERS.formatDate(new Date())} · Mapillary attempt at ${meters} meters.`);
		return new Promise((resolve, reject) => {
			FETCH(mapImgURL)
				.then((response) => {
					return response.status === 200 ? response.json() : null;
				}).then((data) => {
					if (data && data.data && data.data[0] && data.data[0].thumb_1024_url) {
						resolve({
							"image": data.data[0].thumb_1024_url,
							"distance": distance,
							"wikilink": null
						});
					}
					else {
						resolve(null);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		});
	},
	getBBox: (coords, distance) => {
		const R_EARTH = 6378.137;
		const M = (1 / ((2 * Math.PI / 360) * R_EARTH)) / 1000;

		let radianAngleNE = 45 * Math.PI / 180;
		let xNE = 0 + (distance * Math.cos(radianAngleNE));
		let yNE = 0 + (distance * Math.sin(radianAngleNE));
		let latNE = coords.lat + (yNE * M);
		let lonNE = coords.lon + (xNE * M) / Math.cos(coords.lat * (Math.PI / 180));

		let radianAngleSW = 225 * Math.PI / 180;
		let xSW = 0 + (distance * Math.cos(radianAngleSW));
		let ySW = 0 + (distance * Math.sin(radianAngleSW));
		let latSW = coords.lat + (ySW * M);
		let lonSW = coords.lon + (xSW * M) / Math.cos(coords.lat * (Math.PI / 180));

		return `${lonSW},${latSW},${lonNE},${latNE}`;
	},
	formatDate: (date) => {
		return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${date.getFullYear().toString().padStart(4, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
	}
}

module.exports = HELPERS;
