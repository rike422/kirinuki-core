// @flow

import { isString } from "../util";

type Scrapper = {
  scrap: (selector: string, attr: ?string) => string | void,
  scrapElements: (selector: string, attr: ?string) => string | Array<string>
};

function createDom(
  node: string | HTMLElement = document,
  root: ?string
): HTMLElement {
  const target = isString(node) ? parseDom(node) : node;

  if (root != null) {
    return target.querySelector(root);
  }
  return target;
}

function getScrapper(rootNode: HTMLElement): Scrapper {
  const scrap = function(selector: string, attr: ?string) {
    const node: ?HTMLElement = rootNode.querySelectorAll(selector)[0];
    if (node == null) {
      return void 0;
    }
    if (attr == undefined) {
      return getNodeValue(node);
    } else {
      return node.getAttribute(attr);
    }
  };

  const scrapElements = function(
    selector: string,
    attr: ?string
  ): string | Array<string> {
    const list = Array.from(rootNode.querySelectorAll(selector));
    if (attr == undefined) {
      return list.map((tag, i) => {
        return getNodeValue(tag);
      });
    }
    return list.map((tag: HTMLElement, i) => {
      return tag.getAttribute(attr);
    });
  };

  return { scrap: scrap, scrapElements: scrapElements };
}

export const context = {
  createDom,
  getScrapper
};

export function getNodeValue(node: HTMLElement): string {
  if (node instanceof HTMLImageElement) {
    return node.src;
  } else if (
    node instanceof HTMLAnchorElement ||
    node instanceof HTMLLinkElement
  ) {
    return node.href;
  }
  return node.textContent;
}

function parseDom(html) {
  const parser = new DOMParser();
  return parser.parseFromString(html, "text/html");
}
