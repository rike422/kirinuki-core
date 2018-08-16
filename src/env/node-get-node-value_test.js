import sinon from "sinon";
import test from "ava";
import { heroNews, table } from "../fixtures/fixture_test";
import cheerio from "cheerio";
import { getNodeValue } from "./node";

test("should return href attribute when <a>", t => {
  const url = "https://google.com";
  const value = getNodeValue(
    cheerio
      .load(`<a href="${url}"></a>`)("a")
      .get(0)
  );
  t.is(value, url);
});

test("should return href attribute when <link>", t => {
  const url = "https://google.com";
  const value = getNodeValue(
    cheerio
      .load(`<link href="${url}"></link>`)("link")
      .get(0)
  );
  t.is(value, url);
});

test("should return src attribute when <img>", t => {
  const url = "https://google.eom";
  const value = getNodeValue(
    cheerio
      .load(`<img src="${url}"></img>`)("img")
      .get(0)
  );
  t.is(value, url);
});

test("should return text node when block tag", t => {
  const text = "test-text";
  const value = getNodeValue(
    cheerio.load(`<div class="text-div">${text}</div>`)(".text-div")
  );
  t.is(value, text);
});
