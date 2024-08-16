import fs from 'node:fs';
import axios from "axios";
import { pipeline } from 'node:stream/promises';
import { logger } from '../loggers/logger';
import { Readable } from 'node:stream';

const filesDir = './MultiTool_files/html';

export async function fetchHtml(url: string, saveToFile?: boolean): Promise<string | undefined> {
    try {
        logger.log('info', 'Starting the fetchHtml()');

        const response = await axios.get(url, {
            responseType: 'text'
        });

        if (saveToFile) {
            await saveHtml(response.data);
        }

        logger.log('info', 'Finished the fetchHtml()');

        return response.data as string;
    } catch (err) {
        const castedErr = err as Error;
        logger.error('An error occurred', { stack: castedErr.stack });
    }
}

async function saveHtml(data: string): Promise<void> {
    if (!data) {
        throw new Error('Response stream is empty');
    }

    const outputPath = `${filesDir}/page.html`;
    const readableStream = new Readable({
        read() {
            this.push(data);
            this.push(null);
        }
    });

    await pipeline(readableStream, fs.createWriteStream(outputPath));
}