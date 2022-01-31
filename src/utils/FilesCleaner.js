const FRS = require("find-remove");
const HELPERS = require("./Helpers");
const LOGGER = require("./Logger");
const CronJob = require("cron").CronJob;

const FC = {
	startCleaner: () => {
		const JOB = new CronJob(
			"0 0,30 * * * *",
			() => {
				LOGGER.info(`${HELPERS.formatDate(new Date())} · Doing cleanup`);
				const result = FRS("./src/public/citymap/", { maxLevel: 2, extensions: [".png", ".jpg"], age: {seconds: 3600} });
			},
			null,
			false,
			"America/Los_Angeles");

		JOB.start();
	}
}

module.exports = FC;

