import { TransformContext } from "../../types";
import { resolveURL } from "../util";

export function getNodeValue(
  node: Element,
  context: TransformContext
): string | undefined {
  if (node instanceof HTMLImageElement) {
    return resolveURL(node.src, context)
  } else if (
    node instanceof HTMLAnchorElement ||
    node instanceof HTMLLinkElement
  ) {
    return resolveURL(node.href, context)
  }
  return node.textContent || undefined
}
