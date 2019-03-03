import { env as browserEnv } from './env/browser'
import { env as nodeEnv } from './env/node'
import { traversal } from './traversal'
import { IResult, ISchema } from './types'

export function node(schema: ISchema, html: string): IResult {
  const nodeParser = traversal(nodeEnv)
  return nodeParser(schema, html)
}

export function browser(schema: ISchema): IResult
export function browser(schema: ISchema, node: Document): IResult
export function browser(schema: ISchema, node: HTMLElement): IResult
export function browser(schema: ISchema, node: string): IResult
export function browser(
  schema: ISchema,
  node?: string | Document | HTMLElement
): IResult {
  const browserParser = traversal(browserEnv)
  return browserParser(schema, node || window.document)
}
