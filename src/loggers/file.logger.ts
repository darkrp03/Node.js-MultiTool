import { createLogger, format, transports } from "winston";

const { combine, timestamp } = format;

export const fileLogger = createLogger({
    format: combine(
        timestamp({ format: 'DD.MM.YYYY HH:mm:ss' }),
        format.json()
    ),
    defaultMeta: { service: 'Multi-Tool' },
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' })
    ],
});