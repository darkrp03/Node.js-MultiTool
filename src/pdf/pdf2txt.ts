import fs from "node:fs";
import axios from "axios";
import { spawnSync } from "node:child_process";
import { pipeline } from 'node:stream/promises';
import { logger } from "../loggers/logger";

const filesDir = './MultiTool_files/pdf';

async function downloadPdf(pdfUrl: string): Promise<string> {
    const response = await axios.get(pdfUrl, {
        responseType: 'stream'
    });

    if (!response.data) {
        throw new Error('Response stream is empty!');
    }

    const filePath = `${filesDir}/downloadedPdf.pdf`;
    await pipeline(response.data, fs.createWriteStream(filePath));

    return filePath;
}

export async function pdf2txt(pdfUrl: string, saveToFile?: boolean): Promise<string> {
    let text: string = '';

    try {
        logger.log('info', 'Starting the pdf2txt()');

        const path = await downloadPdf(pdfUrl);
        const outputPath = `${filesDir}/textFromPdf.txt`;

        spawnSync(`pdftotext`, [path, outputPath]);

        const textBuffer = fs.readFileSync(outputPath);
        text = textBuffer.toString();

        if (!saveToFile) {
            fs.unlinkSync(outputPath);
        }
    }
    catch (err) {
        const castedErr = err as Error;
        logger.error('An error occurred', { stack: castedErr.stack });
    }
    finally {
        return text;
    }
}