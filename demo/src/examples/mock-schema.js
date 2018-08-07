const attributeRuleSchema = {
  hero: [".content[data-hero]", "data-hero"],
  heroes: [".content[data-hero]", "data-hero"]
};

const defaultSchema = {
  topic: {
    content: ".content"
  }
};

const nameRuleSchema = {
  topic: {
    content: ".content",
    contents: ".content"
  }
};

const unfoldRuleSchema = {
  unfoldTopics: {
    _unfold: true,
    content: ".news-list .content",
    image: ".news-list img"
  },
  topics: {
    contents: ".news-list .content",
    images: ".news-list img"
  }
};

const rootRuleSchema = {
  topic: {
    contents: ".content",
    images: "img"
  },
  mainTopic: {
    _root: ".news-list",
    contents: ".content",
    images: "img"
  },
  subTopic: {
    _root: ".sub-news-list",
    contents: ".content",
    images: "img"
  }
};
export {
  attributeRuleSchema,
  defaultSchema,
  nameRuleSchema,
  unfoldRuleSchema,
  rootRuleSchema
};
