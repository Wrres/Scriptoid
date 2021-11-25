const { MessageEmbed } = require("discord.js");
const CHEERIO = require("cheerio");
const FETCH = require("node-fetch");

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
	}

	/**
	 * Sends a random character as an embed in chat
	 */
	sendRandomCharacter(msg) {
		this.channel.sendTyping();
		this.inactivityTimeout = setTimeout(() => {
			setTimeout(() => {
				this.doRoundSummary(msg);
				this.resetRound(msg);
			}, 500);
		}, HELPERS.SECONDS_BEFORE_REVEAL_GUESS * 1000);
		// This will send a message 15 seconds prior to the round ending
		this.roundLeftTimeout = setTimeout(() => {
			this.channel.send(`⏰ **15 seconds remaining.**`);
		}, (HELPERS.SECONDS_BEFORE_REVEAL_GUESS * 1000) - 15000);

		// Decrement rounds left
		this.rounds--;
		// Increment current round
		this.currentRound++;

		// Set a current round
		this.currentSet = this.getSet();

		let footer = this.language.footer1;
		if (this.rounds == 1) {
			footer += `\n${this.rounds} round left.`;
		}
		if (this.rounds > 1) {
			footer += `\n${this.rounds} rounds left.`;
		}

		let elevation = "";

		HELPERS.getElevation(this.currentSet.lat, this.currentSet.lon)
			.then((data) => {
				if (data) {
					elevation = ` · Alt: ${data.meters} m · ${data.feet} ft`;
				}

				// this.currentSet.city = "Dandenong";
				// this.currentSet.country[0] = "AU";
				// this.currentSet.country[1] = "Australia";
				// this.currentSet.sub = "Victoria";
				
				const messageEmbed = new MessageEmbed();
				messageEmbed.setColor("#0099ff");
				messageEmbed.setTitle(`${this.currentSet.city}`);
				messageEmbed.setFooter(`Pop: ${HELPERS.numberWithCommas(this.currentSet.pop)}${elevation}\n${footer}`);

				// console.log("City", this.currentSet.city);

				let cityClean = HELPERS.cleanCityName(this.currentSet);

				let cityURI = encodeURI(cityClean);
				let pageCity = HELPERS.BASE_URL + cityURI;
				
				// console.log("PageCity", pageCity);

				// setTimeout(() => {
				// 	this.channel.send(pageCity);
				// }, 1000);
				
				let pageSub = pageCity + ',_' + encodeURI(this.currentSet.sub);
				// console.log("PageSub", pageSub);
				// setTimeout(() => {
				// 	this.channel.send(pageSub);
				// }, 2000);
				this.getCityImage(pageSub, true)
					.then((response) => {
						if(response == "SEND"){
							this.channel.send({"embeds": [messageEmbed]});
						}
						else if(response){
							messageEmbed.setImage(response);
							this.channel.send({"embeds": [messageEmbed]});
						}
						else {
						let pageCountry = pageCity + ',_' + encodeURI(this.currentSet.country[1]);
						// console.log("PageCountry", pageCountry);
						// setTimeout(() => {
						// 	this.channel.send(pageCountry);
						// }, 2000);
						this.getCityImage(pageCountry, true)
							.then((response) => {
								if(response == "SEND"){
									this.channel.send({"embeds": [messageEmbed]});
								}
								else if(response){
									messageEmbed.setImage(response);
									this.channel.send({"embeds": [messageEmbed]});
								}
								else{
									this.getCityImage(pageCity, false)
										.then((response) => {
											if(response == "SEND"){
												this.channel.send({"embeds": [messageEmbed]});
											}
											else if(response){
												messageEmbed.setImage(response);
												this.channel.send({"embeds": [messageEmbed]});
											}
											else{
												this.channel.send({"embeds": [messageEmbed]});
											}
										})
								}
							})
						}
					});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	getCityImage(page, continueOnError){
		return new Promise((resolve, reject) => {
			FETCH(page)
			.then((response) => {
				if(response.status === 200){
					return response.text();
				}
				else{
					return null;
				}
			})
			.then((data) => {
				if(data){
					const $ = CHEERIO.load(data);
					let image = $("meta[property='og:image']").attr("content") || null;

					// console.log("Image", image);

					if(image){
						if( image.toLowerCase().endsWith(".jpg")
							|| image.toLowerCase().endsWith(".gif")
							|| image.toLowerCase().includes("collage")
							|| image.toLowerCase().includes("montage")
							|| image.toLowerCase().includes("collection")
						){
							resolve(image);
						}
						else{
							HELPERS.getImageFromPage(page)
							.then((response) => {
								if(response){
									resolve(response);
								}
								else{
									resolve(null);
								}
							})
							.catch((error) => {
								console.log(error);
								resolve(null);
							});
						}
					}
					else{
						HELPERS.getImageFromPage(page)
							.then((response) => {
								if(response){
									resolve(response);
								}
								else{
									resolve(null);
								}
							})
							.catch((error) => {
								console.log(error);
								resolve(null);
							});
					}
				}
				else{
					if(continueOnError){
						resolve(null);
					}
					else{
						resolve("SEND");
					}
				}
			})
			.catch((error) => {
				console.log(error);
			});
		});
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
				if (user){
					// User exists and his lastRound is lower than currentRound
					// We can tell him to try again
					if (user.lastRound < this.currentRound) {
						msg.reply(`your guess is not a coordinate. Check it and post again.`);
					}
				}
				// User doesn't exist
				else{
					msg.reply(`your guess is not a coordinate. Check it and post again.`);
				}
			}
		}
	}

	answer(msg) {
		if(this.currentSet.country){
			clearTimeout(this.inactivityTimeout);
			clearTimeout(this.roundLeftTimeout);
			if(!this.roundSummarySent){
				this.doRoundSummary(msg);
			}
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
			if(this.users.length){
				this.channel.sendTyping();
			}
			this.nextRoundTimeout = setTimeout(() => {
				this.doSummary(msg);
			}, HELPERS.SECONDS_AFTER_ANSWER * 1000);
		}
	}

	/**
	 * Do summary
	 */
	doSummary(msg) {
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
				this.channel.send({"embeds": [messageEmbed]});
		}
		HELPERS.EMITTER.emit("delete-channel", this.channel.id);
	}

	doRoundSummary(msg) {
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

		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setAuthor("Google Maps 🔗", "https://i.imgur.com/3p5i1wt.png", `https://www.google.com/maps/@${this.currentSet.lat},${this.currentSet.lon},14z`)
			.addField(':flag_' + this.currentSet.country[0].toLowerCase() + ': ' + this.currentSet.country[1] + ', ' + this.currentSet.sub, this.currentSet.city, true);
		if (roundSummary) {
			messageEmbed.setTitle("Round scores");
			messageEmbed.setDescription(roundSummary);
		}
		this.channel.send({"embeds": [messageEmbed]});
	}

	end(msg) {
		clearTimeout(this.inactivityTimeout);
		clearTimeout(this.nextRoundTimeout);
		clearTimeout(this.roundLeftTimeout);

		if(!this.roundSummarySent){
			this.doRoundSummary(msg);
		}

		setTimeout(() => {
			if(!this.finalSummarySent){
				this.doSummary(msg);
			}
			HELPERS.EMITTER.emit("delete-channel", this.channel.id);
		}, 1000);
	}
}

module.exports = RoundGuess;
