import { JSDOM } from "jsdom";

global.setupWindow = function (html) {
  global.window = new JSDOM(html).window;
  global.document = window.document
  global.HTMLElement = global.window.HTMLElement;
  global.HTMLImageElement = global.window.HTMLImageElement;
  global.HTMLLinkElement = global.window.HTMLLinkElement;
  global.HTMLAnchorElement = global.window.HTMLAnchorElement;
  global.DOMParser = global.window.DOMParser;
}

