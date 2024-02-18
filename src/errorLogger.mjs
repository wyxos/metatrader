import { createLogger, format, transports } from 'winston';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find the project root by navigating up until you find package.json or another marker
const findRoot = (dir) => {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
        return dir;
    } else {
        const parentDir = path.resolve(dir, '..');
        return findRoot(parentDir); // Recursively look up the directory tree
    }
};

const projectRoot = findRoot(__dirname);

// Set the log directory to be in the project root
const logDirectory = path.join(projectRoot, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

function getLoggerWithDate() {
    const filename = path.join(logDirectory, `${new Date().toISOString().split('T')[0]}-errors.log`);

    const logger = createLogger({
        level: 'error',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: [new transports.File({ filename })]
    });

    return logger;
}

export function logError(message) {
    const logger = getLoggerWithDate();
    logger.error(message);
}
