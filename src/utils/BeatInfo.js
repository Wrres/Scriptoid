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

const BEATINFO = createLogger({
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
			filename: `${__dirname}/../logs/beats.log`,
			level: "INFO"
		})
	]
});

if (process.env.NODE_ENV !== "production") {
	//BEATINFO.add(new transports.Console({}));
}

BEATINFO.error = (value) => BEATINFO.ERROR(value);
BEATINFO.info = (value) => BEATINFO.INFO(value);
BEATINFO.warn = (value) => BEATINFO.WARN(value);
BEATINFO.debug = (value) => BEATINFO.DEBUG(value);

module.exports = BEATINFO;

