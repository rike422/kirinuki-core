import { IExecutionEnv, IScrappers } from '../types'
import { generateConverter } from '../converter'
import { TransformContext } from '../../types'
import { getNodeValue } from "./get-node-value";
import { createDom } from "./create-dom";

export const env: IExecutionEnv = {
  convert: generateConverter(createDom, createScrapper)
}

function createScrapper(
  rootElement: CheerioStatic,
  context: TransformContext
): IScrappers {
  const scrap = function(selector: string, attr?: string): string | undefined {
    const node: any = rootElement(selector).get(0)
    if (attr == undefined) {
      return getNodeValue(node, context)
    } else {
      return node.attribs[attr]
    }
  }

  const scrapElements = function(
    selector: string,
    attr?: string
  ): string | Array<string | undefined> {
    if (attr == undefined) {
      return rootElement(selector)
        .toArray()
        .map((tag: any) => {
          return getNodeValue(tag, context)
        })
    } else {
      return rootElement(selector)
        .toArray()
        .map(tag => {
          return tag.attribs[attr]
        })
    }
  }

  return { scrap, scrapElements }
}

