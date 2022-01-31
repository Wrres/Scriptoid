const { MessageEmbed } = require("discord.js");
const StaticMaps = require("staticmaps");
const FS = require("fs");

const HELPERS = require("./Helpers");

const URL = "https://scriptoid.alokk.repl.co/";

class RoundMap {
	constructor(msg, language) {
		this.channel = msg.channel;
		this.language = JSON.parse(JSON.stringify(language));
		this.rounds = this.getNumberOfRounds(msg);
		this.active = true;
		this.currentSet = {};
		this.users = [];
		this.inactivityTimeout;
		this.nextRoundTimeout;
		this.imagePosted = false;
		this.sendRandomCharacter(msg);
	}


	/**
	 * Sends a random character as an embed in chat
	 */
	sendRandomCharacter(msg) {
		this.channel.sendTyping();

		// This will trigger to reveal if nobody got it correct after the given time
		this.inactivityTimeout = setTimeout(() => {
			this.channel.send(`The answer was \`${this.currentSet.city}\`.`);
			this.resetRound(msg);
		}, HELPERS.SECONDS_BEFORE_REVEAL_MAP * 1000);

		// Decrement rounds left
		this.rounds--;

		// Set a current round
		this.currentSet = this.getRandomSet();

		let footer = this.language.footer;
		if (this.rounds == 1) {
			footer += `\n${this.rounds} round left.`;
		}
		if (this.rounds > 1) {
			footer += `\n${this.rounds} rounds left.`;
		}
		// https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png
		// https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}
		// https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}
		// https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png
		const OPTIONS = {
			width: 960,
			height: 520,
			subdomains: ["mt0", "mt1", "mt2", "mt3"],
			tileUrl: "https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
		};
		
		const MAP = new StaticMaps(OPTIONS);
				
		async function doRender(lat, lon, id){
			let dir = `./src/public/citymap`;
			if (!FS.existsSync(dir)) {
				FS.mkdirSync(dir);
			}

			dir = `./src/public/citymap/${id}`;
			if (!FS.existsSync(dir)) {
				FS.mkdirSync(dir);
			}
			
			const MARKER = {
				img: `https://ggutils.vercel.app/images/01.png`,
				offsetX: 25,
				offsetY: 40,
				width: 50,
				height: 50,
				coord : [lon, lat]
			};
			MAP.addMarker(MARKER);

			let code = HELPERS.generateCode(16);

			await MAP.render([lon, lat], 6);
			await MAP.image.save(`./src/public/citymap/${id}/${code}.png`);

			return `citymap/${id}/${code}.png`;
		}

		this.imagePosted = false;

		doRender(this.currentSet.lat, this.currentSet.lon, this.channel.id)
			.then((path) => {
				const messageEmbed = new MessageEmbed()
				.setColor("#0099ff")
				.setImage(URL + path)
				.setFooter(footer);
			this.channel.send({"embeds": [messageEmbed]});
			this.imagePosted = true;
			})
			.catch((error) => {
				console.log(error);
			});
	}

	/**
	 * Gets a random set of letter/answer
	 */
	getRandomSet() {
		let randIndex = Math.floor(Math.random() * this.language.sets.length);
		let set = this.language.sets[randIndex];
		this.language.sets.splice(randIndex, 1);
		return set;
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
		if (this.currentSet.city && this.imagePosted) {
			// TODO: Enhance this for different answers lengths?
			let distance = HELPERS.getEditDistance(this.currentSet.city.toLowerCase(), msg.content.toLowerCase());
			if (distance <= 2) {
				this.addCorrect(msg);
				this.resetRound(msg);
				msg.react("✅");
				this.imagePosted = false;
			}
			else {
				this.addIncorrect(msg);
				msg.react("❌");
			}
		}
	}

	answer(msg) {
		if (this.currentSet.city) {
			clearTimeout(this.inactivityTimeout);
			this.channel.send(`The answer was \`${this.currentSet.city}\`.`);
			this.resetRound(msg);
		}
	}

	/**
	 * Add correct answer
	 */
	addCorrect(msg) {
		let user = this.users.find((user) => user.id === msg.author.id);
		if (user) {
			user.correct = user.correct + 1;
		}
		else {
			this.users.push({
				"id": msg.author.id,
				"username": msg.author.username,
				"discriminator": msg.author.discriminator,
				"correct": 1,
				"incorrect": 0
			});
		}
	}

	/**
	 * Add incorrect answer
	 */
	addIncorrect(msg) {
		let user = this.users.find((user) => user.id === msg.author.id);
		if (user) {
			user.incorrect = user.incorrect + 1;
		}
		else {
			this.users.push({
				"id": msg.author.id,
				"username": msg.author.username,
				"discriminator": msg.author.discriminator,
				"correct": 0,
				"incorrect": 1
			});
		}
	}

	/**
	 * Resets a round if there are no rounds left
	 * otherway it triggers a new one
	 */
	resetRound(msg) {
		clearTimeout(this.inactivityTimeout);
		if (this.rounds > 0) {
			this.currentSet = {};
			this.nextRoundTimeout = setTimeout(() => {
				this.sendRandomCharacter(msg);
			}, HELPERS.SECONDS_AFTER_ANSWER * 1000);
		}
		else {
			this.currentSet = {};
			this.nextRoundTimeout = setTimeout(() => {
				this.doSummary();
			}, HELPERS.SECONDS_AFTER_ANSWER * 1000);
		}
	}

	/**
	 * Do summary
	 */
	doSummary() {
		let summary = "";

		this.users.sort((userA, userB) => {
			if (((userA.correct * 3) - userA.incorrect) > ((userB.correct * 3) - userB.incorrect)) {
				return -1;
			}
			else if (((userA.correct * 3) - userA.incorrect) < ((userB.correct * 3) - userB.incorrect)) {
				return 1;
			}
			else {
				return 0;
			}
		});

		this.users.forEach((user) => {
			let media = user.correct * 5 - user.incorrect;
			summary += `✅ ${user.correct} · ❌ ${user.incorrect} · ⚖️ ${media} · ${user.username}\n`;
		});
		if (summary != "") {
			const messageEmbed = new MessageEmbed()
				.setColor("#0099ff")
				.setTitle("Scores")
				.setDescription(summary);
			this.channel.send({"embeds": [messageEmbed]});
		}		
		this.deleteDirectory(this.channel.id);
		HELPERS.EMITTER.emit("delete-channel", this.channel.id);
	}

	end() {
		this.deleteDirectory(this.channel.id);
		clearTimeout(this.inactivityTimeout);
		clearTimeout(this.nextRoundTimeout);
		if(this.currentSet.city){
			this.channel.send(`The answer was \`${this.currentSet.city}\`.`);
		}
		this.doSummary();
		HELPERS.EMITTER.emit("delete-channel", this.channel.id);
	}

	deleteDirectory(id) {
		//FS.rmSync(`./src/public/citymap/${id}`, { recursive: true, force: true });
	}
}

module.exports = RoundMap;