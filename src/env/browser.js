// @flow

import type { CheerioAPI, CheerioElement, CheerioStatic } from "cheerio";
import $ from "cheerio";

function createDom(node, root: ?string): CheerioStatic {
  const cheerioNode = $.load(node)
  if(root) {
    return $.load(cheerioNode(root).html());
  }
  return cheerioNode;
}

function getScrapper(rootElement: CheerioStatic) {

  const scrap = function(selector: string, attr: ?string) {
    const node: CheerioElement = rootElement(selector).get(0);
    if (node == null) {
      return void 0;
    }
    if (attr == undefined) {
      return getNodeValue(node);
    } else {
      return node.attribs[attr];
    }
  };

  const scrapElements = function(selector: string, attr: ?string): string | string[] {
    if (attr == undefined) {
      return rootElement(selector)
        .toArray()
        .map((tag, i) => {
          return getNodeValue(tag);
        });
    } else {
      return rootElement(selector)
        .toArray()
        .map((tag, i) => {
          return tag.attribs[attr];
        });
    }
  };

  return {
    scrap: scrap,
    scrapElements: scrapElements
  };
}

export const scrapper = {
  createDom,
  getScrapper
}

export function getNodeValue(node: CheerioElement): string {
  const type = node.name;
  if (type === "img") {
    return node.attribs.src;
  } else if (type === "a" || type === "link") {
    return node.attribs.href;
  }
  return $(node)
    .text()
    .trim();
}
