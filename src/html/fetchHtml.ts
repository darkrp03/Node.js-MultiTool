import fs from 'node:fs';
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';
import { FetchOptions } from '../models/fetch';
import { fileLogger } from '../loggers/file.logger';
import { consoleLogger } from '../loggers/console.logger';

const streamPipeline = promisify(pipeline);

export async function fetchHtml(url: string, options: FetchOptions): Promise<string | undefined> {
    consoleLogger.log('info', 'Starting the fetchHtml()');

    try {
        let response: Response;

        if (options) {
            const headersInstance = getHeadersInstance(options);

            response = await fetch(url, {
                headers: headersInstance,
                method: options.requestType,
                body: options.body
            });

            if (options.saveToFile) {
                await saveHtml(response);
                consoleLogger.log('info', 'Finished the fetchHtml()');

                return;
            }
        }
        else {
            response = await fetch(url);
        }
        
        consoleLogger.log('info', 'Finished the fetchHtml()');

        return response.text();
    } catch (err) {
        fileLogger.log('error', err);
        consoleLogger.log('error', `${err}. See details in error.log`);
    }
}

function getHeadersInstance(options: FetchOptions): Headers | undefined {
    if (!options.headers) {
        return;
    }

    const headersInstance = new Headers();

    for (const key in options.headers) {
        if (options.headers[key]) {
            headersInstance.append(key, options.headers[key]!);
        }
    }

    return headersInstance;
}

async function saveHtml(response: Response): Promise<void> {
    if (!response.body) {
        throw new Error('Response body is empty');
    }

    await streamPipeline(response.body, fs.createWriteStream('./page.html'));
}