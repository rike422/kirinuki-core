import { isString } from "../../util";

export function createDom(
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

function parseDom(html: string): Document {
  const parser = new DOMParser()
  return parser.parseFromString(html, 'text/html')
}
