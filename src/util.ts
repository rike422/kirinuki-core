// @flow
import pluralize from 'pluralize';

export function isString(str: any): str is string {
  return typeof str === 'string' || str instanceof String;
}

export function isPlural(str: string): boolean {
  return pluralize(str) === str;
}

export function isAbsoluteUrl(url: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/.test(url);
}
