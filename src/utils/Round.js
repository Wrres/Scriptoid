const { MessageEmbed } = require("discord.js");

const HELPERS = require("./Helpers");

class Round {
  	constructor(msg, language) {
		this.channel = msg.channel;
		this.language = JSON.parse(JSON.stringify(language));
		this.rounds = this.getNumberOfRounds(msg);
		this.active = true;
		this.currentSet = {};
		this.users = [];
		this.inactivityTimeout;
		this.nextRoundTimeout;

		this.sendRandomCharacter(msg);
	}

	
	/**
	 * Sends a random character as an embed in chat
	 */
	sendRandomCharacter(msg){
		// This will trigger to reveal if nobody got it correct after the given time
		this.inactivityTimeout = setTimeout(() => {
			msg.channel.send(`The answer for \`${this.currentSet.letter}\` was ${this.currentSet.answers.join(", ")}.`);
			this.resetRound(msg);
		}, HELPERS.SECONDS_BEFORE_REVEAL * 1000);

		// Decrement rounds left
		this.rounds--;

		// Set a current round
		this.currentSet = this.getRandomSet();

		let footer = this.language.footer;
		if(this.rounds == 1){
			footer += `\n${this.rounds} round left.`;
		}
		if(this.rounds > 1){
			footer += `\n${this.rounds} rounds left.`;
		}

		const messageEmbed = new MessageEmbed()
			.setColor("#0099ff")
			.setTitle(`${this.currentSet.letter}`)
			.setFooter(footer);
		msg.reply(messageEmbed);
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
		if(this.currentSet.answers){
			
			let match = this.currentSet.answers.filter((answer) => answer.toLowerCase() === msg.content.toLowerCase());

			if(match.length){
				this.addCorrect(msg);
				msg.react("✅");
				// Chinese round
				if(this.language.footer.includes("Chinese character")){
					let set = this.currentSet;
					setTimeout(() => {
						msg.channel.send(`Correct! \`${set.letter}\` is ${set.answers.join(", ")}.`);
					}, 1000);
				}
				this.resetRound(msg);
			}
			else{
				this.addIncorrect(msg);
				msg.react("❌");
			}
		}
	}

	answer(msg){
		if(this.currentSet.answers){
			clearTimeout(this.inactivityTimeout);
			msg.channel.send(`The answer for \`${this.currentSet.letter}\` was ${this.currentSet.answers.join(", ")}.`);
			this.resetRound(msg);
		}
	}

	/**
	 * Add correct answer
	 */
	addCorrect(msg){
		let user = this.users.find((user) => user.id === msg.author.id);
		if(user){
			user.correct = user.correct + 1;
		}
		else{
			this.users.push({
				"id":  msg.author.id,
				"username":  msg.author.username,
				"discriminator":  msg.author.discriminator,
				"correct": 1,
				"incorrect": 0
			});
		}
	}

	/**
	 * Add incorrect answer
	 */
	addIncorrect(msg){
		let user = this.users.find((user) => user.id === msg.author.id);
		if(user){
			user.incorrect = user.incorrect + 1;
		}
		else{
			this.users.push({
				"id":  msg.author.id,
				"username":  msg.author.username,
				"discriminator":  msg.author.discriminator,
				"correct": 0,
				"incorrect": 1
			});
		}
	}

	/**
	 * Resets a round if there are no rounds left
	 * otherway it triggers a new one
	 */
	resetRound(msg){
		clearTimeout(this.inactivityTimeout);
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
			if(((userA.correct * 3) - userA.incorrect) > ((userB.correct * 3) - userB.incorrect)){
				return -1;
			}
			else if(((userA.correct * 3 ) - userA.incorrect) < ((userB.correct * 3) - userB.incorrect)){
				return 1;
			}
			else{
				return 0;
			}
		});

		this.users.forEach((user) => {
			let media = user.correct * 3 - user.incorrect;
			summary += `✅ ${user.correct} · ❌ ${user.incorrect} · ⚖️ ${media} · ${user.username}\n`;
		});
		if(summary != ""){
			const messageEmbed = new MessageEmbed()
				.setColor("#0099ff")
				.setTitle("Scores")
				.setDescription(summary);
			msg.channel.send(messageEmbed);
		}
		HELPERS.EMITTER.emit("delete-channel", this.channel.id);
	}

	end(msg){
		clearTimeout(this.inactivityTimeout);
		clearTimeout(this.nextRoundTimeout);
		if(this.currentSet.letter && this.currentSet.answers){
			msg.channel.send(`The answer for \`${this.currentSet.letter}\` was ${this.currentSet.answers.join(", ")}.`);
		}
		this.doSummary(msg);
		HELPERS.EMITTER.emit("delete-channel", this.channel.id);
	}
}

module.exports = Round;