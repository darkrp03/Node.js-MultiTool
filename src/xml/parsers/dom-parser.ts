import { DOMParser } from "@xmldom/xmldom";
import { logger } from "../../loggers/logger";
import { fetchHtml } from "../../html/fetchHtml";

interface XmlObject {
    [key: string]: string | XmlObject | XmlObject[] | undefined;
    text?: string;
}

function elementToObject(element: Element): XmlObject {
    const obj: XmlObject = {};

    if (element.attributes) {
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            obj[attr.name] = attr.value;
        }
    }

    for (let i = 0; i < element.childNodes.length; i++) {
        const child = element.childNodes[i];

        if (child.nodeType === 1) {
            const childElement = child as Element;
            const childObj = elementToObject(childElement);
            const nodeName = childElement.nodeName;

            if (obj[nodeName]) {
                if (!Array.isArray(obj[nodeName])) {
                    obj[nodeName] = [obj[nodeName] as XmlObject];
                }
                (obj[nodeName] as XmlObject[]).push(childObj);
            } else {
                obj[nodeName] = childObj;
            }
        } else if (child.nodeType === 3) {
            const textContent = child.nodeValue?.trim();
            if (textContent) {
                obj['text'] = textContent;
            }
        }
    }

    return obj;
}

export async function domParse(xmlUrl: string): Promise<any> {
    try {
        logger.log('info', 'Starting the domParse()');

        const data = await fetchHtml(xmlUrl);

        if (!data) {
            return {};
        }

        const doc = new DOMParser().parseFromString(data, 'text/xml');
        const parsedObject = elementToObject(doc.documentElement);

        logger.log('info', 'Finished the domParse()');

        return parsedObject;
    }
    catch (err) {
        const castedErr = err as Error;
        logger.error('An error occurred', { stack: castedErr.stack });
    }
}