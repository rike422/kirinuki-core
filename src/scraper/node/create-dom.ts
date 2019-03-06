import { isString } from "../../util";
import $ from "cheerio";

export function createDom(node: any, root?: string): CheerioStatic | undefined {
  const cheerioNode: CheerioStatic = isString(node) ? $.load(node) : node;
  if (root !== undefined) {
    const html: string | null = cheerioNode(root).html();
    if (html === null) {
      return cheerioNode;
    }
    return $.load(html);
  }
  return cheerioNode;
}
