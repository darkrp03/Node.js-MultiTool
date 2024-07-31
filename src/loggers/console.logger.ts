import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

export const consoleLogger = createLogger({
    format: combine(
        timestamp({ format: 'DD.MM.YYYY HH:mm:ss' }),
        colorize(),
        customFormat
    ),
    transports: [
        new transports.Console()
    ]
});