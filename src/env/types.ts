import { IResult, ISchema } from '../types'

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
  (rootElement: any): IScrappers
}

export interface IScrapper {
  (selector: string, attr?: string | undefined):
    | string
    | Array<string | undefined>
    | undefined
}

export interface IExecutionEnvDriver {
  runConvert(
    schema: ISchema,
    node: any,
    travasal: (
      converted: { [key: string]: any },
      key: string,
      selector: any,
      scrap: IScrapper,
      rootElement: any
    ) => object
  ): IResult
}
