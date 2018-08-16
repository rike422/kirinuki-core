// @flow

import pluralize from "pluralize";

export function isString(str: any): boolean {
  return typeof str === "string" || str instanceof String;
}

export function isPlural(str: string): boolean {
  return pluralize(str) == str;
}
