import winston from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';
import url from 'url';
import * as fs from "fs"; // For daily log rotation

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Correctly construct the absolute path for the log directory
const logDirectory = path.resolve(__dirname, '../wyxos/metatrader-logs');

// Ensure the log directory exists
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Configure winston to log to a file with daily rotation
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(info => `${info.timestamp} - ${info.level.toUpperCase()}: ${info.message}`)
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            // Use the absolute path for the filename
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

export default logger
