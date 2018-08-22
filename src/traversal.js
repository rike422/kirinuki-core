import { unfold } from "./unfold";
import { isPlural, isString } from "./util";

export function traversal(context) {
  const bindConvert = convert.bind(context);

  function convert(baseSchema, node: any) {
    const schema = Object.assign({}, baseSchema);
    const root = schema._root;
    const isUnfoldMode = schema._unfold;
    delete schema._root;
    delete schema._unfold;
    const rootElement =
      root == null ? this.createDom(node) : this.createDom(node, root);

    const scrapper = this.getScrapper(rootElement);

    const convertedObject = Object.keys(schema).reduce((converted, key) => {
      const selector = schema[key];
      const scrap =
        isUnfoldMode || isPlural(key) ? scrapper.scrapElements : scrapper.scrap;

      if (isString(selector)) {
        converted[key] = scrap(selector);
      } else if (Array.isArray(selector)) {
        converted[key] = scrap.apply(null, selector);
      } else if (selector != null && typeof selector === "object") {
        const data = bindConvert(selector, rootElement);
        converted[key] = Array.isArray(data) && !isPlural(key) ? data[0] : data;
      }
      return converted;
    }, {});
    return isUnfoldMode ? unfold(convertedObject) : convertedObject;
  }

  return (schema: Object, html: any) => {
    return bindConvert(schema, html);
  };
}
