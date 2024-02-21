import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import url from 'url';
import fs from 'fs';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Since logger.mjs is inside metatrader/src, we navigate two levels up and then to wyxos/metatrader-logs
const logDirectory = path.resolve(__dirname, '../../wyxos/metatrader-logs');

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} - ${info.level.toUpperCase()}: ${info.message}`)
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: path.join(logDirectory, '%DATE%-message.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '14d'
        }),
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

export default logger;
