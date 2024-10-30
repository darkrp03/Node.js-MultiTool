
import fs from "node:fs";
import axios from "axios";
import { logger } from '../loggers/logger';

const filesDir = './MultiTool_files/html';

export async function saveHtml(url: string): Promise<void> {
    try {
        logger.log('info', 'Starting the saveHtml()');

        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        const outputPath = `${filesDir}/page.html`;
        const buffer = Buffer.from(response.data);

        fs.writeFileSync(outputPath, buffer);

        logger.log('info', 'Finished the saveHtml()');
    } catch (err) {
        const castedErr = err as Error;
        logger.error('An error occurred', { stack: castedErr.stack });
    }
}