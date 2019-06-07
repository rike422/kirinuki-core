import test from 'ava';
import { linkTextNews } from '../../fixtures/test_fixture';
import { browser } from '../../kirinuki';
import { setupWindow } from '../../test_helper';

setupWindow(linkTextNews);

test("Shuld notice error message when element didn't exist", t => {
  const error = t.throws(() => {
    browser(
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
