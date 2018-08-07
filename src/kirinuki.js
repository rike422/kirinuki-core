import $ from "cheerio";
import pluralize from "pluralize";
import unfold from "./unfold";
import getNodeValue from "./get-node-value";

function isString(str) {
  return typeof str === "string" || str instanceof String;
}

function isPlural(str) {
  return pluralize(str) == str;
}

function convertObject(object, _$) {
  const schema = Object.assign({}, object);
  const root = schema._root;
  const isUnfoldMode = schema._unfold;
  delete schema._root;
  delete schema._unfold;

  const rootElement = root != null ? $.load(_$(root).html()) : _$;

  const scrap = function(selector, attr) {
    const node = rootElement(selector).get(0);
    if (node === undefined || node === null) {
      return void 0;
    }
    if (attr === undefined) {
      return getNodeValue(node);
    } else {
      return node.attribs[attr];
    }
  };

  const scrapElements = function(selector, attr) {
    if (attr === undefined) {
      return rootElement(selector)
        .toArray()
        .map((tag, i) => {
          return getNodeValue(tag);
        });
    } else {
      return rootElement(selector)
        .toArray()
        .map((tag, i) => {
          return tag.attribs[attr];
        });
    }
  };

  const convertedObject = Object.keys(schema).reduce((converted, key) => {
    const selector = schema[key];
    const scrapper = isUnfoldMode || isPlural(key) ? scrapElements : scrap;

    if (isString(selector)) {
      converted[key] = scrapper(selector);
    } else if (Array.isArray(selector)) {
      converted[key] = scrapper.apply(null, selector);
    } else if (selector != null && typeof selector === "object") {
      const data = convertObject(selector, rootElement);
      converted[key] = Array.isArray(data) && !isPlural(key) ? data[0] : data;
    }
    return converted;
  }, {});
  return isUnfoldMode ? unfold(convertedObject) : convertedObject;
}

function convert(schema, html) {
  return convertObject(schema, $.load(html));
}

module.exports = convert;
