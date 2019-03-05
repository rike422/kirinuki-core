import test from "ava";
import { heroNews } from "../../fixtures/fixture_test";
import { browser } from "../../kirinuki";
import { setupWindow } from "../../test_helper";

setupWindow(heroNews);

test("should return single value when attribute key is single", t => {
  const value = browser({
    title: "title",
    topic: ".news-list .content"
  });

  t.deepEqual(value, {
    title: "Hero News!",
    topic: "Batman come back in Gossam City!"
  });
});

test("should return Array when attribute key is plural from document", t => {
  const value = browser({
    title: "title",
    topic: {
      summary: ".topic",
      summaries: ".topic"
    }
  });

  t.deepEqual(value, {
    title: "Hero News!",
    topic: {
      summary: "Amalgam",
      summaries: ["Amalgam"]
    }
  });
});

test("should return Array when attribute key is plural", t => {
  const value = browser({
    title: "title",
    topic: {
      contents: ".news-list .content",
      images: ".news-list img"
    }
  });

  t.deepEqual(value, {
    title: "Hero News!",
    topic: {
      contents: [
        "Batman come back in Gossam City!",
        "Dr. Strange got into a traffic accident."
      ],

      images: [
        "https://example.com/batman.png",
        "https://example.com/strange.png"
      ]
    }
  });
});

test("should return value in appropriate type, dependent on attributes key form", t => {
  const value = browser({
    title: "title",
    topic: {
      summary: ".topic",
      summaries: ".topic"
    },

    image: ".news-list img",
    images: ".news-list img"
  });

  t.deepEqual(value, {
    title: "Hero News!",
    topic: {
      summary: "Amalgam",
      summaries: ["Amalgam"]
    },

    image: "https://example.com/batman.png",
    images: [
      "https://example.com/batman.png",
      "https://example.com/strange.png"
    ]
  });
});
