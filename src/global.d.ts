import type * as streamWeb from 'node:stream/web';

declare global {
  interface Response {
    readonly body: streamWeb.ReadableStream<Uint8Array> | null;
  }
}