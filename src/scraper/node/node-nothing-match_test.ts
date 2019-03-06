import test from 'ava';
import { linkTextNews } from '../../fixtures/fixture_test';
import { node } from '../../kirinuki';

test("Shuld notice error message when element didn't exist", t => {
  const error = t.throws(() => {
    node(
      {
        topics: {
          title: ['sub-news-list a', 'text'],
          link: '.sub-news-list a',
        },
      },
      linkTextNews
    ),
      Error;
  });
  t.is(error.message, 'Nothing matched sub-news-list a');
});
