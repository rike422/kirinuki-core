export interface IResult {
  [key: string]:
    | string
    | Array<string | undefined | IResult>
    | undefined
    | IResult
}

export interface ISchema {
  _root?: string
  _unfold?: boolean

  [key: string]: string | [string, string?] | boolean | undefined | ISchema
}
