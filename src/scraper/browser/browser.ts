import { IExecutionEnv, IScrappers } from "../types";
import { generateConverter } from "../converter";
import { TransformContext } from "../../types";
import { getNodeValue } from "./get-node-value";
import { createDom } from "./create-dom";

export const env: IExecutionEnv = {
  convert: generateConverter(createDom, createScrapper)
};

function createScrapper(
  rootNode: HTMLElement | Document | Element,
  context: TransformContext
): IScrappers {
  const scrap = function(selector: string, attr?: string): string | undefined {
    const node: Element = rootNode.querySelectorAll(selector)[0];
    if(node == undefined) {
      throw new Error(`Nothing matched ${selector}`)
    }
    if (attr === undefined) {
      return getNodeValue(node, context);
    } else if (attr === "text") {
      return node.textContent || undefined;
    } else {
      return node.getAttribute(attr) || undefined;
    }
  };

  const scrapElements = function(
    selector: string,
    attr: string | undefined
  ): string | Array<string | undefined> {
    const elements = Array.from(rootNode.querySelectorAll(selector));
    let apply;

    if(attr == undefined) {
      apply = (node: any): string | undefined => { return getNodeValue(node, context); }
    } else if(attr === 'text') {
      apply = (node: any): string => { return node.textContent }
    } else {
      apply = (node: any): string => { return node.getAttribute(attr) }
    }
    return elements.map(apply)
  };

  return { scrap, scrapElements };
}
