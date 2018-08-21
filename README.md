# kirinuki-core [![npm version](https://badge.fury.io/js/kirinuki-core.svg)](https://badge.fury.io/js/kirinuki-core)

Kirinuki is a library that convert any html to JSON using CSS selectors.

## [Demo](https://rike422.github.io/kirinuki-core)

https://rike422.github.io/kirinuki-core


## Usage

### Node.js

Parse string and build DOM by [cheerio](https://github.com/cheeriojs/cheerio) and extract JSON from that.

- browser(schema: Object, node: string)

```javascript

import { node as kirinuki } from 'kirinuki';
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

### browser

scrape to Doucment or HTMLElement by [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

- browser(schema: Object, node: Document)
- browser(schema: Object, node: HTMLElement)
- browser(schema: Object, node: string)
- browser(schema: Object) // auto assign to window.document to node variable

```javascript
import { browser as kirinuki } from 'kirinuki';


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

