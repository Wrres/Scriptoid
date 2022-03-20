const { MessageEmbed } = require("discord.js");

const HELPERS = require("./Helpers");

class RoundGuess {
	constructor(msg, language) {
		this.channel = msg.channel;
		this.language = JSON.parse(JSON.stringify(language));
		this.rounds = this.getNumberOfRounds(msg);
		this.totalRounds = this.getNumberOfRounds(msg);
		this.currentRound = 0;
		this.active = true;
		this.currentSet = {};
		this.users = [];
		this.inactivityTimeout;
		this.nextRoundTimeout;
		this.roundLeftTimeout;
		this.medals = ["🥇", "🥈", "🥉"];
		this.randoms = HELPERS.generateRandoms(this.totalRounds, this.language.sets.length);
		this.sets = [];
		this.randoms.forEach((rand) => {
			this.sets.push(this.language.sets[rand]);
		});
		this.language.sets = null;
		this.roundSummarySent = false;
		this.finalSummarySent = false;
		this.sendRandomCharacter(msg);
		this.nn = this.getNn(msg);
	}

	/**
	 * Sends a random character as an embed in chat
	 */
	async sendRandomCharacter(msg) {
		this.channel.sendTyping();
		this.inactivityTimeout = setTimeout(() => {
			setTimeout(() => {
				this.doRoundSummary();
				this.resetRound(msg);
			}, 500);
		}, HELPERS.SECONDS_BEFORE_REVEAL_GUESS * 1000);
		// This will send a message 20 seconds prior to the round ending
		this.roundLeftTimeout = setTimeout(() => {
			this.channel.send(`⏰ **20 seconds remaining.**`);
		}, (HELPERS.SECONDS_BEFORE_REVEAL_GUESS * 1000) - 20000);

		// Decrement rounds left
		this.rounds--;
		// Increment current round
		this.currentRound++;

		// Set a current round
		this.currentSet = this.getSet();

		let footer = this.language.footerGuess;
		if (this.rounds == 1) {
			footer += `\n${this.rounds} round left.`;
		}
		if (this.rounds > 1) {
			footer += `\n${this.rounds} rounds left.`;
		}

		this.currentSet.altitude = await HELPERS.getElevation(this.currentSet.lat, this.currentSet.lon);

		const messageEmbed = new MessageEmbed();
		messageEmbed.setColor("#0099ff");

		if (!this.nn) {
			messageEmbed.setTitle(`${this.currentSet.city}`);
		}

		let city = HELPERS.cleanCityName(this.currentSet.city);
		let citySub = `${city},_${this.currentSet.sub}`;
		let cityCountry = `${city},_${this.currentSet.country[1]}`;

		let imageData = await HELPERS.getImageFromPage(citySub) ||
			await HELPERS.getImageFromPage(cityCountry) ||
			await HELPERS.getImageFromPage(city);

		if (!imageData) {
			imageData = await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 5000) ||
				await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 20000) ||
				await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 50000);
		}
		if (!imageData) {
			imageData = await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 100000) ||
				await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 200000) ||
				await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 300000);
		}

		if (imageData) {
			if (imageData.wikilink) {
				this.currentSet.wikilink = imageData.wikilink;
			}
			// console.log(`${HELPERS.formatDate(new Date())} · IMAGE: ${imageData.image}`);
			messageEmbed.setImage(imageData.image);
			messageEmbed.setFooter(`Pop: ${HELPERS.numberWithCommas(this.currentSet.pop)}${this.currentSet.altitude}${imageData.distance}\n${footer}`);
			this.channel.send({ "embeds": [messageEmbed] });
		}
		else {
			// console.log("${HELPERS.formatDate(new Date())} · No image found");
			messageEmbed.setFooter(`Pop: ${HELPERS.numberWithCommas(this.currentSet.pop)}${this.currentSet.altitude}\n${footer}`);
			this.channel.send({ "embeds": [messageEmbed] });
		}
	}

	/**
	 * Gets a set of letter/answer
	 */
	getSet() {
		return this.sets.shift();
	}

	/**
	 * Checks if the command specifies a number of rounds, otherwise it returns 1
	 */
	getNumberOfRounds(msg) {
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
	}

	getNn(msg) {
		return msg.content.includes("nn");
	}

	check(msg) {
		if (msg.content.startsWith('/w cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess !g') && this.currentSet.lat && this.currentSet.lon) {

			let cont = msg.content;
			let mspl = cont.split(" ");

			let lat2 = parseFloat(mspl[3].slice(0, -1));
			let lon2 = parseFloat(mspl[4]);
			let lat1 = this.currentSet.lat;
			let lon1 = this.currentSet.lon;

			msg.delete();

			let user = this.users.find((user) => user.id === msg.author.id);

			if (!isNaN(lat2) && !isNaN(lon2) && lat2 >= -90 && lat2 <= 90 && lon2 >= -180 && lon2 <= 180) {

				let distance = HELPERS.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

				// User exists
				if (user) {
					// User exists and his lastRound is lower than currentRound
					// We can register his guess once
					if (user.lastRound < this.currentRound) {
						this.channel.send(`*\`${msg.author.username}\` has guessed.*`);
						this.addCorrect(msg, distance);
					}
				}
				// User doesn't exist
				else {
					this.channel.send(`*\`${msg.author.username}\` has guessed.*`);
					this.addCorrect(msg, distance);
				}
			}
			else {
				// User exists
				if (user) {
					// User exists and his lastRound is lower than currentRound
					// We can tell him to try again
					if (user.lastRound < this.currentRound) {
						msg.reply(`your guess is not a coordinate. Check it and post again.`);
					}
				}
				// User doesn't exist
				else {
					msg.reply(`your guess is not a coordinate. Check it and post again.`);
				}
			}
		}
	}

	async pic() {
		if (!this.roundSummarySent) {
			let imageData = await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 5000) ||
				await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 20000) ||
				await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 50000) ||
				await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 100000) ||
				await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 200000) ||
				await HELPERS.getMapImage(this.currentSet.lat, this.currentSet.lon, 300000);

			if (imageData) {
				const picEmbed = new MessageEmbed();
				picEmbed.setColor("#0099ff");
				picEmbed.setTitle(`Nearby image${imageData.distance}`);
				picEmbed.setImage(imageData.image);
				if (this.nn) {
					picEmbed.setFooter(`Pop: ${HELPERS.numberWithCommas(this.currentSet.pop)}${this.currentSet.altitude}`);
				}
				else {
					picEmbed.setFooter(`${this.currentSet.city} · Pop: ${HELPERS.numberWithCommas(this.currentSet.pop)}${this.currentSet.altitude}`);
				}
				this.channel.send({ "embeds": [picEmbed] });
			}
			else {
				// Send message with no image
				this.channel.send(`\*No image found.\*`);
			}
		}
	}

	answer(msg) {
		if (!this.roundSummarySent) {
			clearTimeout(this.inactivityTimeout);
			clearTimeout(this.roundLeftTimeout);
			this.doRoundSummary();
			this.resetRound(msg);
		}
	}

	/**
	 * Add correct answer
	 */
	addCorrect(msg, distance) {

		let user = this.users.find((user) => user.id === msg.author.id);
		// User Exists
		if (user) {
			user.distance += distance;
			user.roundDistance = distance;
			user.rounds += 1;
			user.lastRound = this.currentRound;
		}
		// Adding new user
		else {
			this.users.push({
				"id": msg.author.id,
				"username": msg.author.username,
				"discriminator": msg.author.discriminator,
				"distance": distance,
				"roundDistance": distance,
				"rounds": 1,
				"lastRound": this.currentRound
			});
		}
	}

	/**
	 * Resets a round if there are no rounds left
	 * otherway it triggers a new one
	 */
	resetRound(msg) {
		clearTimeout(this.inactivityTimeout);
		clearTimeout(this.roundLeftTimeout);
		if (this.rounds > 0) {
			// this.currentSet = {};
			this.nextRoundTimeout = setTimeout(() => {
				this.roundSummarySent = false;
				this.sendRandomCharacter(msg);
			}, HELPERS.SECONDS_AFTER_ANSWER * 1000);
		}
		else {
			// this.currentSet = {};
			if (this.users.length) {
				this.channel.sendTyping();
			}
			this.nextRoundTimeout = setTimeout(() => {
				this.doSummary();
			}, HELPERS.SECONDS_AFTER_ANSWER * 1000);
		}
	}

	/**
	 * Do summary
	 */
	doSummary() {
		this.finalSummarySent = true;
		let summary = "";

		this.users.sort((userA, userB) => {
			if (userA.distance < userB.distance) {
				return -1;
			}
			else if (userA.distance > userB.distance) {
				return 1;
			}
			else {
				return 0;
			}
		});

		this.users.sort((userA, userB) => {
			if (userA.rounds > userB.rounds) {
				return -1;
			}
			else if (userA.rounds < userB.rounds) {
				return 1;
			}
			else {
				return 0;
			}
		});

		let roundsPadding = 0;
		let distancesPadding = 0;

		this.users.forEach((user) => {
			roundsPadding = roundsPadding < user.rounds.toString().length ? user.rounds.toString().length : roundsPadding;
			distancesPadding = distancesPadding < user.distance.toFixed(2).toString().length ? user.distance.toFixed(2).toString().length : distancesPadding;
		});

		this.users.forEach((user, index) => {
			let medal = this.medals[index] ? this.medals[index] : "";
			summary += `📏 \`${user.distance.toFixed(2).toString().padStart(distancesPadding, " ")} km\` · 📍 \`${user.rounds.toString().padStart(roundsPadding, " ")}\` · ${user.username} ${medal}\n`;
		});
		if (summary != "") {
			const messageEmbed = new MessageEmbed()
				.setColor("#0099ff")
				.setTitle("Final scores 🏁")
				.setDescription(summary);
			this.channel.send({ "embeds": [messageEmbed] });
		}
		HELPERS.EMITTER.emit("delete-channel", this.channel.id);
	}

	doRoundSummary() {
		this.roundSummarySent = true;
		let roundSummary = "";

		this.users.sort((userA, userB) => {
			if (userA.roundDistance < userB.roundDistance) {
				return -1;
			}
			else if (userA.roundDistance > userB.roundDistance) {
				return 1;
			}
			else {
				return 0;
			}
		});

		let distancesPadding = 0;

		this.users.forEach((user) => {
			if (user.roundDistance) {
				distancesPadding = distancesPadding < user.roundDistance.toFixed(2).toString().length ? user.roundDistance.toFixed(2).toString().length : distancesPadding;
			}
		});

		this.users.forEach((user) => {
			if (user.roundDistance) {
				roundSummary += `📏 \`${user.roundDistance.toFixed(2).toString().padStart(distancesPadding, " ")} km\` · ${user.username}\n`;
				user.roundDistance = null;
			}
		});

		if (this.currentSet.wikilink) {
			roundSummary += `[Wikipedia](${this.currentSet.wikilink})`;
		}

		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setAuthor("Google Maps 🔗", "https://i.imgur.com/3p5i1wt.png", `https://www.google.com/maps/@${this.currentSet.lat},${this.currentSet.lon},14z`)
			.addField(`:flag_${this.currentSet.country[0].toLowerCase()}: ${this.currentSet.country[1]}`, `${this.currentSet.city} · ${this.currentSet.sub}`, true);
		if (roundSummary) {
			messageEmbed.setTitle("Round scores");
			messageEmbed.setDescription(roundSummary);
		}
		this.channel.send({ "embeds": [messageEmbed] });
	}

	end() {
		clearTimeout(this.inactivityTimeout);
		clearTimeout(this.nextRoundTimeout);
		clearTimeout(this.roundLeftTimeout);

		if (!this.roundSummarySent) {
			this.doRoundSummary();
		}

		setTimeout(() => {
			if (!this.finalSummarySent) {
				this.doSummary();
			}
			HELPERS.EMITTER.emit("delete-channel", this.channel.id);
		}, 1000);
	}
}

module.exports = RoundGuess;
