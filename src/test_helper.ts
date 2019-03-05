import { JSDOM } from "jsdom";

const globalAny: any = global;

export function setupWindow(html: string) {
  const windowInfo = {
    url: "https://example.com/"
  };
  globalAny.window = new JSDOM(html, windowInfo).window;
  globalAny.document = window.document;
  globalAny.HTMLElement = globalAny.window.HTMLElement;
  globalAny.HTMLImageElement = globalAny.window.HTMLImageElement;
  globalAny.HTMLLinkElement = globalAny.window.HTMLLinkElement;
  globalAny.HTMLAnchorElement = globalAny.window.HTMLAnchorElement;
  globalAny.DOMParser = globalAny.window.DOMParser;
}
