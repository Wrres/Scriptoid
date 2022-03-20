const winston = require("winston");
const { createLogger, format, transports } = require("winston");

const config = {
	levels: {
		ERROR: 0,
		INFO: 1,
		WARN: 2,
		DEBUG: 3
	},
	colors: {
		ERROR: "red",
		INFO: "blue",
		WARN: "yellow",
		DEBUG: "green"
	}
};

winston.addColors(config.colors);

const myFormat = format.printf(data => `${data.timestamp} > ${data.level} > ${data.message} ${data.meta ? '>' : ''} ${data.meta ? JSON.stringify(data.meta) : ''}`);

const DEBUGGER = createLogger({
	levels: config.levels,
	level: "INFO",
	format: format.combine(
		format.timestamp({
			format: "DD-MM-YYYY HH:mm:ss"
		}),
		format.errors({ stack: true }),
		format.splat(),
		myFormat
	),
	transports: [
		new transports.File({
			maxsize: 1048576,
			maxFiles: 5,
			filename: `${__dirname}/../logs/discorddebug.log`,
			level: "DEBUG"
		})
	]
});

if (process.env.NODE_ENV !== "production") {
	DEBUGGER.add(new transports.Console({}));
}

DEBUGGER.error = (value) => DEBUGGER.ERROR(value);
DEBUGGER.info = (value) => DEBUGGER.INFO(value);
DEBUGGER.warn = (value) => DEBUGGER.WARN(value);
DEBUGGER.debug = (value) => DEBUGGER.DEBUG(value);

module.exports = DEBUGGER;

