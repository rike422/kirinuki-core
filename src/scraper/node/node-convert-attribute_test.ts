import test from 'ava';
import { heroNews } from '../../fixtures/fixture_test';
import { node } from '../../kirinuki';

test('should return single html attribute when selector is Array and selector key is single', t => {
  const value = node(
    {
      hero: ['.news-list .content', 'data-hero'],
    },

    heroNews
  );

  t.deepEqual(value, {
    hero: 'Batman',
  });
});

test('should return Array html attributes when selector is Array and selector key is plural', t => {
  const value = node(
    {
      heroes: ['.news-list .content', 'data-hero'],
    },

    heroNews
  );

  t.deepEqual(value, {
    heroes: ['Batman', 'Dr. Strange'],
  });
});
