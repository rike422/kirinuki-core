import { IExecutionEnv, IScrappers } from '../types';
import { generateConverter } from '../converter';
import { TransformContext } from '../../types';
import { getNodeValue } from './get-node-value';
import { createDom } from './create-dom';

export const env: IExecutionEnv = {
  convert: generateConverter(createDom, createScrapper),
};

function createScrapper(
  rootElement: CheerioStatic,
  context: TransformContext
): IScrappers {
  const scrap = function(selector: string, attr?: string): string | undefined {
    const node: any = rootElement(selector).get(0);
    if (node == undefined) {
      throw new Error(`Nothing matched ${selector}`);
    }
    if (attr == undefined) {
      return getNodeValue(node, context);
    } else if (attr === 'text') {
      return getChildText(node);
    } else {
      return node.attribs[attr];
    }
  };

  const scrapElements = function(
    selector: string,
    attr?: string
  ): string | Array<string | undefined> {
    const elements = rootElement(selector).toArray();
    let apply;
    if (attr == undefined) {
      apply = (node: any): string => {
        return getNodeValue(node, context);
      };
    } else if (attr === 'text') {
      apply = (node: any): string => {
        return getChildText(node);
      };
    } else {
      apply = (node: any): string => {
        return node.attribs[attr];
      };
    }
    return elements.map(apply);
  };

  return { scrap, scrapElements };
}

function getChildText(element: CheerioElement) {
  return element.children.reduce((memo: string, child: CheerioElement) => {
    return child.type === 'text' ? memo + child.data : memo;
  }, '');
}
