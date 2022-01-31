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

const LOGGER = createLogger({
	levels: config.levels,
	level: "DEBUG",
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
			filename: `${__dirname}/../logs/discordbot.log`,
			level: "WARN"
		})
	]
});

if (process.env.NODE_ENV !== "production") {
	LOGGER.add(new transports.Console({}));
}

LOGGER.error = (value) => LOGGER.ERROR(value);
LOGGER.info = (value) => LOGGER.INFO(value);
LOGGER.warn = (value) => LOGGER.WARN(value);
LOGGER.debug = (value) => LOGGER.DEBUG(value);

module.exports = LOGGER;

