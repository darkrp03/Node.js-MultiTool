import { XMLParser } from "fast-xml-parser";
import { fetchHtml } from "../../html/fetchHtml";
import { logger } from "../../loggers/logger";

export async function fastXmlparse(xmlUrl: string): Promise<any> {
    try {
        logger.log('info', 'Starting the parse()');

        const data = await fetchHtml(xmlUrl);

        if (!data) {
            return {};
        }

        const parsers = new XMLParser();
        const parsedObject = parsers.parse(data);

        logger.log('info', 'Finished the parse()');

        return parsedObject;
    }
    catch (err) {
        const castedErr = err as Error;
        logger.error('An error occurred', { stack: castedErr.stack });
    }
}