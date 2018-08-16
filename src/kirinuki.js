// @flow

import { scrapper as nodeScrapper } from './env/node';
import { unfold } from './unfold';
import { isPlural, isString } from './util';

function kirinuki(scrapContext) {

  function convertObject(baseSchema, node: string) {
    const schema = Object.assign({}, baseSchema);
    const root = schema._root;
    const isUnfoldMode = schema._unfold;
    delete schema._root;
    delete schema._unfold;
    const rootElement = root == null ? scrapContext.createDom(node) : scrapContext.createDom(node, root);

    const scrapper = scrapContext.getScrapper(rootElement);

    const convertedObject = Object.keys(schema).reduce((converted, key) => {
      const selector = schema[key];
      const scrap =
        isUnfoldMode || isPlural(key) ? scrapper.scrapElements : scrapper.scrap;

      if (isString(selector)) {
        converted[key] = scrap(selector);
      } else if (Array.isArray(selector)) {
        converted[key] = scrap.apply(null, selector);
      } else if (selector != null && typeof selector === 'object') {
        const data = convertObject(selector, rootElement.html());
        converted[key] = Array.isArray(data) && !isPlural(key) ? data[0] : data;
      }
      return converted;
    }, {});
    return isUnfoldMode ? unfold(convertedObject) : convertedObject;
  }

  return (schema: Object, html: string) => {
    return convertObject(schema, html);
  };
}

export const node = kirinuki(nodeScrapper);
