import { ISchema } from '../types'
import { isPlural } from '../util'
import { ICreateDom, ICreateScrappers, IScrapper } from './types'
import { unfold } from '../unfold'

export function generateConverter(
  createDom: ICreateDom,
  createScrapper: ICreateScrappers
) {
  return function runConvert(
    schema: ISchema,
    node: any,
    travasal: (
      converted: object,
      key: string,
      selector: any,
      scrap: IScrapper,
      rootElement: any
    ) => object
  ) {
    const root = schema._root
    const isUnfoldMode = schema._unfold
    delete schema._root
    delete schema._unfold

    const rootElement = root === null ? createDom(node) : createDom(node, root)

    const scrapper = createScrapper(rootElement)

    const convertedObject = Object.keys(schema).reduce(
      (
        converted: {
          [key: string]: any
        },
        key: string
      ) => {
        const selector = schema[key]
        const scrap: any =
          isUnfoldMode || isPlural(key)
            ? scrapper.scrapElements
            : scrapper.scrap

        return travasal(converted, key, selector, scrap, rootElement)
      },
      {}
    )

    return isUnfoldMode ? unfold(convertedObject) : convertedObject
  }
}
