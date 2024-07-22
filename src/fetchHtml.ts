import fs from 'node:fs';
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';

export async function fetchAndSaveHtml(url: string): Promise<void> {
    const streamPipeline = promisify(pipeline);
    const response = await fetch(url);

    if (!response.body) {
        throw new Error('Response body is empty');
    }

    await streamPipeline(response.body, fs.createWriteStream('./page.html'));
}

export async function fetchHtml(url: string): Promise<string> {
    const response = await fetch(url);

    return response.text();
}