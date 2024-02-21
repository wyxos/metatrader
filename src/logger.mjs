import winston from 'winston';
import 'winston-daily-rotate-file'; // For daily log rotation

// Configure winston to log to a file with daily rotation
const logger = winston.createLogger({
    level: 'info', // or whatever level you need
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} - ${info.level.toUpperCase()}: ${info.message}`)
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'logs/%DATE%-message.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

export default logger
