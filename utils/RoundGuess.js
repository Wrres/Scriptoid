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
		this.medals = [ "🥇", "🥈", "🥉" ];
		this.randoms = HELPERS.generateRandoms(this.totalRounds, this.language.sets.length);
		this.sets = [];
		this.randoms.forEach((rand) => {
			this.sets.push(this.language.sets[rand]);
		});
		this.language.sets = null;
		this.sendRandomCharacter(msg);
	}

	/**
	 * Sends a random character as an embed in chat
	 */
	sendRandomCharacter(msg){
		this.inactivityTimeout = setTimeout(() => {
			setTimeout(() => {
	      		this.doRoundSummary(msg);
				this.resetRound(msg);
			}, 500);
		}, HELPERS.SECONDS_BEFORE_REVEAL_GUESS * 1000);
		// This will send a message 15 seconds prior to the round ending
		this.roundLeftTimeout = setTimeout(() => {
			msg.channel.send(`⏰ **15 seconds remaining.**`);
		}, (HELPERS.SECONDS_BEFORE_REVEAL_GUESS * 1000) - 15000);

		// Decrement rounds left
		this.rounds--;
		// Increment current round
		this.currentRound++;

		// Set a current round
		this.currentSet = this.getSet();

		let footer = this.language.footer;
		if(this.rounds == 1){
			footer += `\n${this.rounds} round left.`;
		}
		if(this.rounds > 1){
			footer += `\n${this.rounds} rounds left.`;
		}

		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle(`${this.currentSet.city}`)
			.setFooter(`[${this.currentSet.pop}]\n${footer}`);
		msg.reply(messageEmbed);
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
	getNumberOfRounds(msg){
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

  check(msg){
      if(msg.content.startsWith('/w cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess_cityguess !g') && this.currentSet.lat && this.currentSet.lon){

        let cont = msg.content;
        let mspl = cont.split(" ");

        let lat2 = mspl[3].slice(0, -1);
        let lon2 = mspl[4];
        let lat1 = this.currentSet.lat;
        let lon1 = this.currentSet.lon;

    	msg.delete();

        let distance = HELPERS.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);

		let user = this.users.find((user) => user.id === msg.author.id);
		if(user){
			if(user.lastRound < this.currentRound){
					msg.channel.send(`*\`${msg.author.username}\` has guessed.*`);
					this.addCorrect(msg, distance);
			}
		}
		else{
				msg.channel.send(`*\`${msg.author.username}\` has guessed.*`);
				this.addCorrect(msg, distance);
		}
        }
      }
      
	answer(msg){
	}

	/**
	 * Add correct answer
	 */
	addCorrect(msg, distance){

		let user = this.users.find((user) => user.id === msg.author.id);
		// User Exists
		if(user){
			user.distance += distance;
		    user.roundDistance = distance;
			user.rounds += 1;
			user.lastRound = this.currentRound;
		}
		// Adding new user
		else{
			this.users.push({
				"id":  msg.author.id,
				"username":  msg.author.username,
				"discriminator":  msg.author.discriminator,
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
	resetRound(msg){
		clearTimeout(this.inactivityTimeout);
		clearTimeout(this.roundLeftTimeout);
		if(this.rounds > 0){
			this.currentSet = {};
			this.nextRoundTimeout = setTimeout(() => {
				this.sendRandomCharacter(msg);
			}, HELPERS.SECONDS_AFTER_ANSWER * 1000);
		}
		else{
			this.currentSet = {};
			this.nextRoundTimeout = setTimeout(() => {
				this.doSummary(msg);
			}, HELPERS.SECONDS_AFTER_ANSWER * 1000);
		}
	}

	/**
	 * Do summary
	 */
	doSummary(msg){
		let summary = "";

		this.users.sort((userA, userB) => {
			if(userA.distance < userB.distance){
				return -1;
			}
			else if(userA.distance > userB.distance){
				return 1;
			}
			else{
				return 0;
			}
		});

		this.users.sort((userA, userB) => {
			if(userA.rounds > userB.rounds){
				return -1;
			}
			else if(userA.rounds < userB.rounds){
				return 1;
			}
			else{
				return 0;
			}
		});

		let roundsPadding = this.totalRounds > 9 ? 2 : 1;
		let distancesPadding = 0;

		this.users.forEach((user) => {
			distancesPadding = distancesPadding < user.distance.toFixed(2).toString().length ? user.distance.toFixed(2).toString().length : distancesPadding;
		});

		this.users.forEach((user, index) => {
			let medal = this.medals[index] ? this.medals[index] : "";
			summary += `📏 \`${user.distance.toFixed(2).toString().padStart(distancesPadding, " ")} km\` · 📍 \`${user.rounds.toString().padStart(roundsPadding, " ")}\` · ${user.username} ${medal}\n`;
		});
		if(summary != ""){
			const messageEmbed = new MessageEmbed()
				.setColor("#0099ff")
				.setTitle("Final scores 🏁")
				.setDescription(summary);
			msg.channel.send(messageEmbed);
		}
		HELPERS.EMITTER.emit("delete-channel", this.channel.id);
	}

	doRoundSummary(msg){
		let roundSummary = "";

		this.users.sort((userA, userB) => {
			if(userA.roundDistance < userB.roundDistance){
				return -1;
			}
			else if(userA.roundDistance > userB.roundDistance){
				return 1;
			}
			else{
				return 0;
			}
		});

		let distancesPadding = 0;

		this.users.forEach((user) => {
			if(user.roundDistance){
				distancesPadding = distancesPadding < user.roundDistance.toFixed(2).toString().length ? user.roundDistance.toFixed(2).toString().length : distancesPadding;
			}
		});

		this.users.forEach((user) => {
			if(user.roundDistance){
				roundSummary += `📏 \`${user.roundDistance.toFixed(2).toString().padStart(distancesPadding, " ")} km\` · ${user.username}\n`;
				user.roundDistance = null;
			}
		});

		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setAuthor("Google Maps 🔗", "https://i.imgur.com/3p5i1wt.png", `https://www.google.com/maps/@${this.currentSet.lat},${this.currentSet.lon},14z`)
			.addField(this.currentSet.country[0], this.currentSet.city, true);
		if(roundSummary){
			messageEmbed.setTitle("Round scores");
			messageEmbed.setDescription(roundSummary);
		}
		msg.channel.send(messageEmbed);
	}

	end(msg){
		clearTimeout(this.inactivityTimeout);
		clearTimeout(this.nextRoundTimeout);
		clearTimeout(this.roundLeftTimeout);

	    this.doRoundSummary(msg);

		setTimeout(() => {
			this.doSummary(msg);
			HELPERS.EMITTER.emit("delete-channel", this.channel.id);
		}, 1000);
	}
}

module.exports = RoundGuess;