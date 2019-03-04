import { isPlural, isString } from './util'
import { IResult, ISchema } from './types'
import { IExecutionEnvDriver, IScrapper } from './env/types'

export function traversal(
  context: IExecutionEnvDriver
): (schema: ISchema, html: any) => IResult {
  const bindConvert = convert.bind(context)

  function convert(
    this: IExecutionEnvDriver,
    baseSchema: ISchema,
    node: any
  ): IResult {
    const schema: ISchema = { ...baseSchema }
    return this.runConvert(
      schema,
      node,
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
          converted[key] = scrap.apply(this, selector)
        } else if (selector !== null && typeof selector === 'object') {
          const data = bindConvert(selector, rootElement)
          converted[key] =
            Array.isArray(data) && !isPlural(key) ? data[0] : data
        }
        return converted
      }
    )
  }

  return (schema: ISchema, html: any) => {
    return bindConvert(schema, html)
  }
}
