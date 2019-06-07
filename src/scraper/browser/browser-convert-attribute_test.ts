import test from 'ava';
import { heroNews } from '../../fixtures/test_fixture';
import { browser } from '../../kirinuki';
import { setupWindow } from '../../test_helper';

setupWindow(heroNews);

test('should return single html attribute when selector is Array and selector key is single on browser', t => {
  const value = browser(
    {
      hero: ['.news-list .content', 'data-hero'],
    },

    document
  );

  t.deepEqual(value, {
    hero: 'Batman',
  });
});

test('should return Array html attributes when selector is Array and selector key is plural on browser', t => {
  const value = browser(
    {
      heroes: ['.news-list .content', 'data-hero'],
    },

    document
  );

  t.deepEqual(value, {
    heroes: ['Batman', 'Dr. Strange'],
  });
});
