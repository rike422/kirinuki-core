import $ from 'cheerio'
import { IExecutionEnvDriver, IScrappers } from './types'
import { isString } from '../util'
import { generateConverter } from './base'

function createDom(node: any, root?: string): CheerioStatic | undefined {
  const cheerioNode: CheerioStatic = isString(node) ? $.load(node) : node
  if (root !== undefined) {
    const html: string | null = cheerioNode(root).html()
    if (html === null) {
      return cheerioNode
    }
    return $.load(html)
  }
  return cheerioNode
}

function createScrapper(rootElement: CheerioStatic): IScrappers {
  const scrap = function(selector: string, attr?: string): string | undefined {
    const node: any = rootElement(selector).get(0)
    if (attr == undefined) {
      return getNodeValue(node)
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
          return getNodeValue(tag)
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

export const env: IExecutionEnvDriver = {
  runConvert: generateConverter(createDom, createScrapper)
}

export function getNodeValue(node: string): string
export function getNodeValue(node: Cheerio): string
export function getNodeValue(
  node: CheerioElement | Cheerio | string | undefined
): string | undefined {
  if (node === undefined) {
    return void 0
  }
  if (isString(node) || !('attribs' in node)) {
    return $(node)
      .text()
      .trim()
  }

  const type = node.name
  if (type === 'img') {
    return node.attribs.src
  } else if (type === 'a' || type === 'link') {
    return node.attribs.href
  } else {
    return $(node)
      .text()
      .trim()
  }
}
