import $ from 'cheerio';

export default function getNodeValue(node) {
  const type = node.name;
  if (type === 'img') {
    return node.attribs.src;
  } else if (type === 'a' || type === 'link') {
    return node.attribs.href;
  }
  return $(node).text().trim();
}
