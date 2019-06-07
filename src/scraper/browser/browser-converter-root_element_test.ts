import test from 'ava';
import { heroNews } from '../../fixtures/test_fixture';
import { browser } from '../../kirinuki';
import { setupWindow } from '../../test_helper';

setupWindow(heroNews);

test('should return single value when attribute key is single on browser', t => {
  const value = browser(
    {
      title: 'title',
      topic: '.news-list .content',
    },

    document
  );

  t.deepEqual(value, {
    title: 'Hero News!',
    topic: 'Batman come back in Gossam City!',
  });
});

test('should return Array when attribute key is plural on browser(image)', t => {
  const value = browser(
    {
      title: 'title',
      topic: {
        _root: '.news-list',
        contents: '.content',
        images: 'img',
      },

      subTopic: {
        _root: '.sub-news-list',
        contents: '.content',
        images: 'img',
      },
    },

    document
  );

  t.deepEqual(value, {
    title: 'Hero News!',
    topic: {
      contents: [
        'Batman come back in Gossam City!',
        'Dr. Strange got into a traffic accident.',
      ],

      images: [
        'https://example.com/batman.png',
        'https://example.com/strange.png',
      ],
    },

    subTopic: {
      contents: [
        'close in on the "truth" of Stark industries.',
        'MVP of the month.',
      ],

      images: ['https://example.com/stark.png', 'https://example.com/mvp.png'],
    },
  });
});
