import test from "ava";
import { heroNews } from "./fixtures/fixture_test";
import kirinuki from "./kirinuki";

test("should return single value when attribute key is single", t => {
  const value = kirinuki(
    {
      title: "title",
      topic: ".news-list .content"
    },
    heroNews
  );

  t.deepEqual(value, {
    title: "Hero News!",
    topic: "Batman come back in Gossam City!"
  });
});

test("should return Array when attribute key is plural", t => {
  const value = kirinuki(
    {
      title: "title",
      topic: {
        _root: ".news-list",
        contents: ".content",
        images: "img"
      },
      subTopic: {
        _root: ".sub-news-list",
        contents: ".content",
        images: "img"
      }
    },
    heroNews
  );

  t.deepEqual(value, {
    title: "Hero News!",
    topic: {
      contents: [
        "Batman come back in Gossam City!",
        "Dr. Strange got into a traffic accident."
      ],
      images: [
        "https://exmaple.com/batman.png",
        "https://exmaple.com/strange.png"
      ]
    },
    subTopic: {
      contents: [
        'close in on the "truth" of Stark industries.',
        "MVP of the month."
      ],
      images: ["https://exmaple.com/stark.png", "https://exmaple.com/mvp.png"]
    }
  });
});
