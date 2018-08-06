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
        summary: ".topic",
        summaries: ".topic"
      }
    },
    heroNews
  );

  t.deepEqual(value, {
    title: "Hero News!",
    topic: {
      summary: "Amalgam",
      summaries: ["Amalgam"]
    }
  });
});

test("should return Array when attribute key is plural", t => {
  const value = kirinuki(
    {
      title: "title",
      topic: {
        contents: ".news-list .content",
        images: ".news-list img"
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
    }
  });
});

test("should return value in appropriate type, dependent on attributes key form", t => {
  const value = kirinuki(
    {
      title: "title",
      topic: {
        summary: ".topic",
        summaries: ".topic"
      },
      image: ".news-list img",
      images: ".news-list img"
    },
    heroNews
  );

  t.deepEqual(value, {
    title: "Hero News!",
    topic: {
      summary: "Amalgam",
      summaries: ["Amalgam"]
    },
    image: "https://exmaple.com/batman.png",
    images: [
      "https://exmaple.com/batman.png",
      "https://exmaple.com/strange.png"
    ]
  });
});
