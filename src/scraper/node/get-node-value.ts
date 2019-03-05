import { TransformContext } from "../../types";
import { isString } from "../../util";
import $ from "cheerio";
import { resolveURL } from "../util";

export function getNodeValue(node: string, context: TransformContext): string;
export function getNodeValue(node: Cheerio, context: TransformContext): string;
export function getNodeValue(
  node: CheerioElement | Cheerio | string | undefined,
  context: TransformContext
): string | undefined {
  if (node === undefined) {
    return void 0;
  }
  if (isString(node) || !("attribs" in node)) {
    return $(node)
      .text()
      .trim();
  }

  const type = node.name;
  if (type === "img") {
    return resolveURL(node.attribs.src, context);
  } else if (type === "a" || type === "link") {
    return resolveURL(node.attribs.href, context);
  } else {
    return $(node)
      .text()
      .trim();
  }
}
