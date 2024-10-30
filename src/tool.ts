import fs from "node:fs";
import { saveHtml } from "./html/fetchHtml";
import { pdf2txt } from "./pdf/pdf2txt";

export class MultiTool {
    private readonly filesDir: string = 'MultiTool_files';

    constructor() {
        this.createFolder();
    }

    createFolder(): void {
        if (!fs.existsSync(this.filesDir)) {
            fs.mkdirSync(this.filesDir);
            fs.mkdirSync(`${this.filesDir}/pdf`);
            fs.mkdirSync(`${this.filesDir}/html`);
        }
    }

    async saveHtmlContent(url: string): Promise<void> {
        await saveHtml(url);
    }

    async pdf2txt(pdf: string, saveToFile?: boolean): Promise<string> {
        return await pdf2txt(pdf, saveToFile);
    }
}