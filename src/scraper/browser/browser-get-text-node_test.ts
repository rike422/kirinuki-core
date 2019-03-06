import test from 'ava';
import { linkTextNews } from '../../fixtures/fixture_test';
import { setupWindow } from '../../test_helper';
import { browser } from '../../kirinuki';

setupWindow(linkTextNews);

test('when second element is "text" return text node, convenient for A tag', t => {
  const value = browser(
    {
      topics: {
        _unfold: true,
        title: ['.sub-news-list a', 'text'],
        link: '.sub-news-list a',
      },
    },

    document
  );

  t.deepEqual(value, {
    topics: [
      {
        title: 'close in on the "truth" of Stark industries.',
        link: 'https://example.com/stark.png',
      },
      {
        title: 'MVP of the month.',
        link: 'https://example.com/mvp.png',
      },
    ],
  });
});
