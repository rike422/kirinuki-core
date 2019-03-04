import { TransformContext } from '../types'
import { resolve as urlResolve } from 'url'
import { isAbsoluteUrl, isString } from '../util'

export function resolveURL(path: string, context: TransformContext): string {
  if (isString(context.origin) && !isAbsoluteUrl(path)) {
    return urlResolve(context.origin, path)
  } else {
    return path
  }
}
