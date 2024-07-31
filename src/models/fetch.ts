import { RequestType } from "../types/request";

interface FetchHeaders {
    'Accept'?: string;
    'Accept-Charset'?: string;
    'Accept-Encoding'?: string;
    'Accept-Language'?: string;
    'Authorization'?: string;
    'Cache-Control'?: string;
    'Connection'?: string;
    'Content-Length'?: string;
    'Content-Type'?: string;
    'Cookie'?: string;
    'Date'?: string;
    'Expect'?: string;
    'Forwarded'?: string;
    'From'?: string;
    'Host'?: string;
    'If-Match'?: string;
    'If-Modified-Since'?: string;
    'If-None-Match'?: string;
    'If-Range'?: string;
    'If-Unmodified-Since'?: string;
    'Max-Forwards'?: string;
    'Origin'?: string;
    'Pragma'?: string;
    'Proxy-Authorization'?: string;
    'Range'?: string;
    'Referer'?: string;
    'TE'?: string;
    'Trailer'?: string;
    'Transfer-Encoding'?: string;
    'Upgrade'?: string;
    'User-Agent'?: string;
    'Via'?: string;
    'Warning'?: string;
    [key: string]: string | undefined;
}

export interface FetchOptions {
    requestType?: RequestType;
    headers?: FetchHeaders;
    body?: BodyInit | null | undefined;
    saveToFile?: boolean
}