import { env as browserEnv } from "./scraper/browser/browser";
import { env as nodeEnv } from "./scraper/node/node";
import { traversal } from "./traversal";
import { IResult, ISchema, TransformContext } from "./types";

export function node(
  schema: ISchema,
  html: string,
  context?: TransformContext
): IResult {
  const nodeParser = traversal(nodeEnv, context);
  return nodeParser(schema, html);
}

export function browser(schema: ISchema, context?: TransformContext): IResult;
export function browser(
  schema: ISchema,
  node: Document,
  context?: TransformContext
): IResult;
export function browser(
  schema: ISchema,
  node: HTMLElement,
  context?: TransformContext
): IResult;
export function browser(
  schema: ISchema,
  node: string,
  context?: TransformContext
): IResult;
export function browser(
  schema: ISchema,
  node?: string | Document | HTMLElement | undefined | TransformContext,
  context?: TransformContext
): IResult {
  let target, applyContext;
  if (node == undefined || isTransformContext(node)) {
    target = window.document;
  } else {
    target = node;
  }
  const defaultContext = {
    origin: document.location.origin
  };
  applyContext = Object.assign({}, defaultContext, context || {});
  const browserParser = traversal(browserEnv, applyContext);
  return browserParser(schema, target);
}

function isTransformContext(v: any): v is TransformContext {
  return v.hasOwnProperty("origin");
}
