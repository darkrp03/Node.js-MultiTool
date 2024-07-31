import fs from "node:fs";
import { spawn } from "node:child_process";
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';
import { consoleLogger } from "../loggers/console.logger";
import { fileLogger } from "../loggers/file.logger";

const streamPipeline = promisify(pipeline);

async function downloadPdf(pdfUrl: string): Promise<string> {
    const response = await fetch(pdfUrl);

    if (!response.body) {
        throw new Error('Response body is empty');
    }

    const filePath = './downloadedPdf.pdf';
    await streamPipeline(response.body, fs.createWriteStream(filePath));

    return filePath;
}

export async function pdf2txt(pdfUrl: string): Promise<void> {
    consoleLogger.log('info', 'Starting the pdf2txt()');

    const path = await downloadPdf(pdfUrl);
    const pdf2txtProcess = spawn(`pdftotext`, [path, './textFromPdf.txt']);

    pdf2txtProcess.on('exit', () => {
        consoleLogger.log('info', 'Finished the pdf2txt()');
    })

    pdf2txtProcess.on('error', (err) => {
        fileLogger.log('error', err);
        consoleLogger.log('error', `${err}. See details in error.log`);
    })
}