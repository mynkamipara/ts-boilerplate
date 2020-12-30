import winston from 'winston';
import config from '../config';

const transports = [];
if (process.env.ENV == 'PROD') {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.colorize(),
				winston.format.timestamp(),
				winston.format.printf(
					info => `${info.timestamp} ${info.level}: ${info.message}`
				)
			)
		}),
		new winston.transports.File({
			filename: config.logs.path + 'combined.log',
			maxsize: 2048,
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(
					info => `${info.timestamp} ${info.level}: ${info.message}`
				)
			)
		}),
		new winston.transports.File({
			filename: config.logs.path + 'error.log',
			maxsize: 2048,
			level: 'error',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(
					info => `${info.timestamp}: ${info.message}`
				)
			)
		})
	);
} else {
	transports.push(
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.cli(),
				winston.format.splat()
			)
		})
	);
}

const LoggerInstance = <any>winston.createLogger({
	level: config.logs.level,
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss'
		}),
		winston.format.errors({ stack: true }),
		winston.format.splat(),
		winston.format.json()
	),
	transports
});

export default LoggerInstance;
