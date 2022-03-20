const { exec } = require("child_process");
const DEBUGGER = require("./Debugger");

const RESTART = {
	init: () => {
		exec("kill 1 && node_modules/.bin/node src/main.js", (error, stdout, stderr) => {
			if (error) {
				DEBUGGER.debug("FAILED TO RESTART AFTER ERROR");
				DEBUGGER.debug(`ERROR: ${error.message}`);
				return;
			}
			if (stderr) {
				DEBUGGER.debug("STDERR - TRYING TO RESTART");
				DEBUGGER.debug(`STDERR: ${stderr}`);
				return;
			}
			DEBUGGER.debug("STDOUT - RESTART SUCCESS ??");
			DEBUGGER.debug(`STDOUT: ${stdout}`);
		});
	}
}

module.exports = RESTART;

