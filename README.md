# kirinuki-core [![npm version](https://badge.fury.io/js/kirinuki-core.svg)](https://badge.fury.io/js/kirinuki-core) [![Build Status](https://travis-ci.org/rike422/kirinuki-core.svg?branch=master)](https://travis-ci.org/rike422/kirinuki-core)  [![codecov](https://codecov.io/gh/rike422/kirinuki-core/branch/master/graph/badge.svg)](https://codecov.io/gh/rike422/kirinuki-core)

Kirinuki is a library that convert any html to JSON using CSS selectors.

## [Demo](https://rike422.github.io/kirinuki-core)

https://rike422.github.io/kirinuki-core


## Usage

### Node.js

Parse string and build DOM by [cheerio](https://github.com/cheeriojs/cheerio) and extract JSON from that.

- browser(schema: Object, node: string)


- browser(schema: Object, node: string, context: object)

```javascript

import { node as kirinuki } from 'kirinuki-core';
const html = `
<html>
  <head>
    <title>Hero News!</title>
  </head>
  <body>
    <div class="main">
        <h3 class="topic">Amalgam</h3>
        <ul class="news-list">
            <li>
              <span class="content">Batman come back in Gossam City!</span>
              <img class="thumbnail" src="https://exmaple.com/batman.png"></img>
            </li>
            <li>
              <span class="content">Dr. Strange got into a traffic accident.</span>
              <img  class="thumbnail" src="https://exmaple.com/strange.png"></img>
            </li>
        </ul>
    </div>
  </body>
</html>
`;
const schema = {
  topic: {
    content: ".content",
    contents: ".content"
  }
}

kirinuki(schema, html)
// > { topic: { 
// content: 'Batman come back in Gossam City!' 
// contents: [
//  'Batman come back in Gossam City!',
//  'Dr. Strange got into a traffic accident.',
// ]
// } }
```

#### Text Node

If you want to scrape text node in A tag, you can do it in follow code

```javascript

const html = `

<div class="sub">
  <ul class="sub-news-list">
    <li>
      <a href="https://example.com/stark.png">close in on the "truth" of Stark industries.</a>
    </li>
    <li>
      <a href="https://example.com/mvp.png">MVP of the month.</a>
    </li>
  </ul>
</div>
`
const schema = 
  { 
    topics: { 
      _unfold: true,
      title: [".sub-news-list a", "text"],
      link: ".sub-news-list a"
   } 
}

kirinuki(schema, html)
```

#### Auto complete 

If url is a relative path and you want to change from that to absolute path, pass context object. 
Relative paths are convert by `origin` property


```javascript
const html = `
<div class="main">
  <h3 class="topic">Amalgam</h3>
  <ul class="news-list">
    <li>
      <a href="/batman/news/1">
        <span class="content">Batman come back in Gossam City!</span>
      </a>
      <img class="thumbnail" src="/assets/batman.png"/>
    </li>
    <li>
      <a href="/dr_strage/news/1">
        <span class="content">Dr. Strange got into a traffic accident.</span>
      </a>
      <img class="thumbnail" src="/assets/strange.png"/>
    </li>
  </ul>
</div>
`

const context = {
  origin: 'https://example.com'
}

const schema = {
   unfoldTopics: {
        _unfold: true,
        content: ".news-list .content",
        image: ".news-list img",
         link: ".news-list a"
    },
    topics: {
        contents: ".news-list .content",
        images: ".news-list img",
        links: ".news-list a"
    }
}

kirinuki(schema, html, context)

// { unfoldTopics:
//    [ { content: 'Batman come back in Gossam City!',
//        image: 'https://example.com/assets/batman.png',
//        link: 'https://example.com/batman/news/1' },
//      { content: 'Dr. Strange got into a traffic accident.',
//        image: 'https://example.com/assets/strange.png',
//        link: 'https://example.com/dr_strage/news/1' } ],
//   topics:
//    { contents:
//       [ 'Batman come back in Gossam City!',
//         'Dr. Strange got into a traffic accident.' ],
//      images:
//       [ 'https://example.com/assets/batman.png',
//         'https://example.com/assets/strange.png' ],
//      links:
//       [ 'https://example.com/batman/news/1',
//         'https://example.com/dr_strage/news/1' ] } }```

```

### browser

scrape to Doucment or HTMLElement by [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

- browser(schema: Object, node: Document)
- browser(schema: Object, node: HTMLElement)
- browser(schema: Object, node: string)
- browser(schema: Object) // auto assign to window.document to node variable

```javascript
import { browser as kirinuki } from 'kirinuki-core';


const schema = {
  topic: {
    content: ".content",
    contents: ".content"
  }
}

kirinuki(schema)

// > { topic: { 
// content: 'Batman come back in Gossam City!' 
// contents: [
//  'Batman come back in Gossam City!',
//  'Dr. Strange got into a traffic accident.',
// ]
// } }

```

#### Standalone js file

`kirinuki.standalone.js` is builded at umd style, that is Included only libraries for browser javascript engien
