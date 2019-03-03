import { isString } from '../util'
import { IExecutionEnvDriver, IScrappers } from './types'
import { generateConverter } from './base'

function createDom(
  node: string | HTMLElement,
  root?: string
): HTMLElement | Document | Element {
  const target: HTMLElement | Document = isString(node) ? parseDom(node) : node
  if (root == undefined) {
    return target
  }

  const selectRoot = target.querySelector(root)
  if (selectRoot === null) {
    throw `Can't match root selector ${root}`
  }
  return selectRoot
}

function createScrapper(
  rootNode: HTMLElement | Document | Element
): IScrappers {
  const scrap = function(selector: string, attr?: string): string | undefined {
    const node: Element = rootNode.querySelectorAll(selector)[0]
    if (attr === undefined) {
      return getNodeValue(node)
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
        return getNodeValue(tag)
      })
    }
    return list.map((tag: Element) => {
      return tag.getAttribute(attr) || undefined
    })
  }

  return { scrap, scrapElements }
}

export const env: IExecutionEnvDriver = {
  runConvert: generateConverter(createDom, createScrapper)
}

export function getNodeValue(node: Element): string | undefined {
  if (node instanceof HTMLImageElement) {
    return node.src
  } else if (
    node instanceof HTMLAnchorElement ||
    node instanceof HTMLLinkElement
  ) {
    return node.href
  }
  return node.textContent || undefined
}

function parseDom(html: string): Document {
  const parser = new DOMParser()
  return parser.parseFromString(html, 'text/html')
}
