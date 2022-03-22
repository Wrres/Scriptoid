const { exec } = require("child_process");

const RESTART = {
	init: () => {
		exec("kill 1 && node_modules/.bin/node src/main.js", (error, stdout, stderr) => {});
	}
}

module.exports = RESTART;

