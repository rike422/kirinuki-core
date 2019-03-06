const heroNews = `
<html>
  <head>
    <title>Hero News!</title>
  </head>
  <body>
    <div class="main">
        <h3 class="topic">Amalgam</h3>
        <ul class="news-list">
            <li>
              <span class="content" data-hero="Batman"}>Batman come back in Gossam City!</span>
              <img class="thumbnail" src="https://example.com/batman.png"></img>
            </li>
            <li>
              <span class="content" data-hero="Dr. Strange"}>Dr. Strange got into a traffic accident.</span>
              <img  class="thumbnail" src="https://example.com/strange.png"></img>
            </li>
        </ul>
    </div>
    <div class="sub">
        <ul class="sub-news-list">
            <li>
              <span class="content" data-hero="IronMan">close in on the "truth" of Stark industries.</span>
              <img class="thumbnail" src="https://example.com/stark.png"></img>
            </li>
            <li>
              <span class="content">MVP of the month.</span>
              <img  class="thumbnail" src="https://example.com/mvp.png"></img>
            </li>
        </ul>
    </div>
  </body>
</html>
`;

const relativeHeroNews = `
<html>
  <head>
    <title>Hero News!</title>
  </head>
  <body>
    <div class="main">
        <h3 class="topic">Amalgam</h3>
        <ul class="news-list">
            <li>
              <a href="/batman/news?date=doday"> <<span class="content" data-hero="Batman"}>Batman come back in Gossam City!</span>
              <img class="thumbnail" src="/assets/batman.png"></img>
            </li>
            <li>
              <a href="/strange/news?date=doday"> <span class="content" data-hero="Dr. Strange"}>Dr. Strange got into a traffic accident.</span></a>
              <img  class="thumbnail" src="/assets/strange.png"></img>
            </li>
        </ul>
    </div>
    <div class="sub">
        <ul class="sub-news-list">
            <li>
              <a href="/ironman/news?date=doday"><span class="content" data-hero="IronMan">close in on the "truth" of Stark industries.</span></a>
              <img class="thumbnail" src="/assets/stark.png"></img>
            </li>
            <li>
               <a href="/ironman/news?date=doday"><span class="content">MVP of the month.</span></a>
              <img  class="thumbnail" src="/assets/mvp.png"></img>
            </li>
        </ul>
    </div>
  </body>
</html>
`;
const linkTextNews = `
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
`;
const table = `
<table>
    <tr>
        <td></td>
        <td></td>
        <td></td>
    </tr>
</table>
`;

export { heroNews, table, relativeHeroNews, linkTextNews };
