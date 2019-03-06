import test from "ava";
import { relativeHeroNews } from "../../fixtures/fixture_test";
import { browser } from "../../kirinuki";
import { setupWindow } from "../../test_helper";

setupWindow(relativeHeroNews);

test("should unfold query object attributes when which has the _unfold property in browser", t => {
  const value = browser(
    {
      title: "title",
      topics: {
        _unfold: true,
        content: ".news-list .content",
        image: ".news-list img"
      }
    },
    document
  );

  t.deepEqual(value, {
    title: "Hero News!",
    topics: [
      {
        content: "Batman come back in Gossam City!",
        image: "https://example.com/assets/batman.png"
      },

      {
        content: "Dr. Strange got into a traffic accident.",
        image: "https://example.com/assets/strange.png"
      }
    ]
  });
});

test("should pick first object when property key is single", t => {
  const value = browser(
    {
      title: "title",
      topic: {
        _unfold: true,
        content: ".news-list .content",
        image: ".news-list img"
      }
    },

    document
  );

  t.deepEqual(value, {
    title: "Hero News!",
    topic: {
      content: "Batman come back in Gossam City!",
      image: "https://example.com/assets/batman.png"
    }
  });
});

test("should unfold query object attributes when which has the _unfold property in browser(image)", t => {
  const value = browser(
    {
      title: "title",
      topic: {
        nestTopics: {
          _unfold: true,
          content: ".news-list .content",
          image: ".news-list img"
        }
      }
    },

    document
  );

  t.deepEqual(value, {
    title: "Hero News!",
    topic: {
      nestTopics: [
        {
          content: "Batman come back in Gossam City!",
          image: "https://example.com/assets/batman.png"
        },

        {
          content: "Dr. Strange got into a traffic accident.",
          image: "https://example.com/assets/strange.png"
        }
      ]
    }
  });
});
