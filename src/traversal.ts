import { isPlural, isString } from './util'
import { IResult, ISchema, TransformContext } from './types'
import { IExecutionEnv, IScrapper } from './scraper/types'

export function traversal(
  env: IExecutionEnv,
  context: TransformContext = {}
): (schema: ISchema, html: any) => IResult {
  const convert = function(baseSchema: ISchema, node: any): IResult {
    const schema: ISchema = { ...baseSchema }

    return env.convert(
      schema,
      node,
      context,
      (
        converted: IResult,
        key: string,
        selector: string | [string, string?] | boolean | undefined | ISchema,
        scrap: IScrapper,
        rootElement
      ) => {
        if (isString(selector)) {
          converted[key] = scrap(selector)
        } else if (Array.isArray(selector)) {
          converted[key] = scrap.apply(null, selector)
        } else if (selector !== null && typeof selector === 'object') {
          const data = convert(selector, rootElement)
          converted[key] =
            Array.isArray(data) && !isPlural(key) ? data[0] : data
        }
        return converted
      }
    )
  }

  return (schema: ISchema, html: any) => {
    return convert(schema, html)
  }
}
