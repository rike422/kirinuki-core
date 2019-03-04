// @flow
import { env as browserEnv } from './env/browser'
import { traversal } from './traversal'
import { IResult, ISchema } from './types'

export function browser(schema: ISchema): IResult
export function browser(schema: ISchema, node: Document): IResult
export function browser(schema: ISchema, node: HTMLElement): IResult
export function browser(schema: ISchema, node: string): IResult

export default function browser(
  schema: ISchema,
  node?: string | Document | HTMLElement
): IResult {
  const browserParser = traversal(browserEnv)
  return browserParser(schema, node || window.document)
}
