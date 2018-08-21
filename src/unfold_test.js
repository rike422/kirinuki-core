import test from "ava";
import { unfold } from "./unfold";

test("should return ", t => {
  const value = unfold({
    news: ["item1", "item2", "item3"],
    image: ["image1", "image2"],
    content: ["content1"],
    text: "hogehoge"
  });

  t.deepEqual(value, [
    {
      news: "item1",
      image: "image1",
      content: "content1",
      text: "hogehoge"
    },
    {
      news: "item2",
      image: "image2",
      content: undefined,
      text: "hogehoge"
    },
    {
      news: "item3",
      image: undefined,
      content: undefined,
      text: "hogehoge"
    }
  ]);
});
