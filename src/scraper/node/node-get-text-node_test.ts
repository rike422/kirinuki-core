import test from 'ava';
import { linkTextNews } from '../../fixtures/test_fixture';
import { node } from '../../kirinuki';

test('when second element is "text" return text node, convenient for A tag', t => {
  const value = node(
    {
      topics: {
        _unfold: true,
        title: ['.sub-news-list a', 'text'],
        link: '.sub-news-list a',
      },
    },
    linkTextNews
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
