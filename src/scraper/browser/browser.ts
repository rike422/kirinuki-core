import { IExecutionEnv, IScrappers } from '../types'
import { generateConverter } from '../converter'
import { TransformContext } from '../../types'
import { getNodeValue } from "./get-node-value";
import { createDom } from "./create-dom";

export const env: IExecutionEnv = {
  convert: generateConverter(createDom, createScrapper)
}

function createScrapper(
  rootNode: HTMLElement | Document | Element,
  context: TransformContext
): IScrappers {
  const scrap = function(selector: string, attr?: string): string | undefined {
    const node: Element = rootNode.querySelectorAll(selector)[0]
    if (attr === undefined) {
      return getNodeValue(node, context)
    } else {
      return node.getAttribute(attr) || undefined
    }
  }

  const scrapElements = function(
    selector: string,
    attr: string | undefined
  ): string | Array<string | undefined> {
    const list = Array.from(rootNode.querySelectorAll(selector))
    if (attr == undefined) {
      return list.map((tag: Element) => {
        return getNodeValue(tag, context)
      })
    }
    return list.map((tag: Element) => {
      return tag.getAttribute(attr) || undefined
    })
  }

  return { scrap, scrapElements }
}

