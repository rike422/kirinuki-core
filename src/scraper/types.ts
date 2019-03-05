import { IResult, ISchema, TransformContext } from '../types'

export interface ICreateDom {
  (node: any, root?: string):
    | CheerioStatic
    | undefined
    | HTMLElement
    | Document
    | Element
}

export interface IScrappers {
  scrap(selector: string, attr?: string): string | undefined

  scrapElements(
    selector: string,
    attr: string | undefined
  ): string | Array<string | undefined>
}

export interface ICreateScrappers {
  (rootElement: any, context: TransformContext): IScrappers
}

export interface IScrapper {
  (selector: string, attr?: string | undefined):
    | string
    | Array<string | undefined>
    | undefined
}

export interface IExecutionEnv {
  convert(
    schema: ISchema,
    node: any,
    context: TransformContext,
    travasal: (
      converted: { [key: string]: any },
      key: string,
      selector: any,
      scrap: IScrapper,
      rootElement: any
    ) => object
  ): IResult
}
